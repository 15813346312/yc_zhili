<template>
  <PageWrapper title="角色管理">
    <BasicTable @register="registerTable">
      <template #form-custom> custom-slot </template>

      <template #toolbar>
        <a-button type="primary" v-auth="'AbpIdentity.Roles.Create'" @click="openCreateAbpRoleModal"
          >新增</a-button
        >
      </template>
      <template #isDefault="{ record }">
        <a-tag color="green" v-if="record.isDefault"> 是 </a-tag>
        <a-tag color="red" v-else> 否 </a-tag>
      </template>
      <template #isPublic="{ record }">
        <a-tag color="green" v-if="record.isPublic"> 是 </a-tag>
        <a-tag color="red" v-else> 否 </a-tag>
      </template>

      <!-- <template #isDefault="{ record }">
        <a-tag :color="!record.isDefault ? 'green' : 'red'">
          {{ !record.isDefault  ? t('common.enable') : t('common.disable')  }}
        </a-tag>
      </template>

       -->
      <template #action="{ record }">
        <!-- <Button icon="note-edit-line"
                @click="handleEdit(record)">

        </Button>

        <a-button type="link"
                  size="small"
                  @click="handleDelete(record)">
          删除
        </a-button> -->
        <TableAction
          :actions="[
            {
              label: '编辑',
              auth: ['AbpIdentity.Roles.Update'],
              onClick: handleEdit.bind(null, record),
            },
            {
              label: '权限',
              auth: ['AbpIdentity.Roles.ManagePermissions'],
              onClick: openPermissions.bind(null, record),
            },
            {
              label: '管理声明',
              auth: ['AbpIdentity.Roles.ManageClaims'],
              onClick: manageClaims.bind(null, record),
            },
            {
              label: '删除',
              color: 'error',
              auth: ['AbpIdentity.Roles.Delete'],
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <CreateAbpRole
      @register="registerCreateAbpRoleModal"
      @reload="reload"
      :bodyStyle="{ 'padding-top': '0' }"
    />
    <EditAbpRole
      @register="registerEditAbpRoleModal"
      @reload="reload"
      :bodyStyle="{ 'padding-top': '0' }"
    />
    <Permissions @register="registerPermissionsModal" @reload="reload" />
    <ManageClaims
      @register="registerManageClaimsModal"
      @reload="reload"
      :bodyStyle="{ 'padding-top': '0' }"
    />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { tableColumns, getTableListAsync, deleteRoleAsync, searchFormSchema } from './index';
  import { useModal } from '/@/components/Modal';
  import CreateAbpRole from './createAbpRole.vue';
  import EditAbpRole from './editAbpRole.vue';
  import ManageClaims from './manageClaims.vue';
  import { PageWrapper } from '/@/components/Page';
  import Permissions from '/@/views/sys/permissions/index.vue';
  import { message } from 'ant-design-vue';
  import { useDrawer } from '/@/components/Drawer';
  export default defineComponent({
    components: {
      PageWrapper,
      BasicTable,
      TableAction,
      CreateAbpRole,
      EditAbpRole,
      Permissions,
      ManageClaims,
    },
    setup() {
      const [registerCreateAbpRoleModal, { openModal: openCreateAbpRoleModal }] = useModal();
      const [registerEditAbpRoleModal, { openModal: openEditAbpRoleModal }] = useModal();
      const [registerManageClaimsModal, { openDrawer: openManageClaimsModal }] = useDrawer();
      const [registerPermissionsModal, { openDrawer: openPermissionsModal }] = useDrawer();
      const [registerTable, { reload }] = useTable({
        title: '',
        api: getTableListAsync,
        columns: tableColumns,
        useSearchForm: true,
        formConfig: {
          labelWidth: 100,
          schemas: searchFormSchema,
        },
        showTableSetting: true,
        rowSelection: { type: 'checkbox' },
        actionColumn: {
          width: 230,
          title: '操作',
          dataIndex: 'action',
          slots: {
            customRender: 'action',
          },
          fixed: 'right',
        },
      });
      // 编辑用户
      const handleEdit = (record: Recordable) => {
        console.log('编辑', record);
        openEditAbpRoleModal(true, {
          record: record,
        });
      };
      const openPermissions = (record: Recordable) => {
        openPermissionsModal(true, {
          name: 'R',
          key: record.name,
        });
      };
      // 删除用户
      const handleDelete = async (record: Recordable) => {
        if (record.name == 'admin') {
          message.error('admin not delete');
          return;
        }
        await deleteRoleAsync({ id: record.id, reload });
      };

      const manageClaims = async (record: Recordable) => {
        openManageClaimsModal(true, {
          record: record,
        });
      };

      // function getFormValues() {
      //   console.log(reload ().getFieldsValue());
      // }
      return {
        registerTable,
        registerCreateAbpRoleModal,
        openCreateAbpRoleModal,
        registerEditAbpRoleModal,
        handleEdit,
        registerPermissionsModal,
        handleDelete,
        manageClaims,
        reload,
        openPermissions,
        registerManageClaimsModal,
      };
    },
  });
</script>

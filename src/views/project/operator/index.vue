<template>
  <div>
    <PageWrapper title="业务员管理">
      <BasicTable @register="registerTable">
        <template #form-custom> custom-slot </template>

        <template #toolbar>
          <a-button type="primary" @click="handleActivate">审核</a-button>
        </template>
        <template #isActivate="{ record }">
          <a-tag color="green" v-if="record.isActivate"> 是 </a-tag>
          <a-tag color="red" v-else> 否 </a-tag>
        </template>
        <template #cityType="{ record }">
          <a-tag v-if="record.cityType"> 广州 </a-tag>
          <a-tag v-else> 非广州 </a-tag>
        </template>
        <template #action="{ record }">
          <TableAction
            :actions="[
              {
                label: '编辑',
                onClick: handleEdit.bind(null, record),
              },
              {
                label: '权限',
                auth: ['AbpIdentity.Users.ManagePermissions'],
                onClick: openPermissions.bind(null, record),
              },
              {
                label: '删除',
                color: 'error',
                popConfirm: {
                  title: '是否确认删除',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </BasicTable>
    </PageWrapper>

    <editModal @register="registerModal" @reload="reload" />
    <Permissions @register="registerPermissionsModal" @reload="reload" />

  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';

  import {
    tableColumns,
    getPagedAsync,
    searchFormSchema,
    removeAsync,
    activateAsync,
  } from './service';

  import { useModal } from '/@/components/Modal';
  import { useDrawer } from '/@/components/Drawer';
  import { PageWrapper } from '/@/components/Page';

  import editModal from './edit.vue';
  import Permissions from '/@/views/sys/permissions/index.vue';

  export default defineComponent({
    name: 'operator',
    components: {
      PageWrapper,
      BasicTable,
      TableAction,
      editModal,
      Permissions
    },
    setup() {
      const [registerPermissionsModal, { openDrawer: openPermissionsModal }] = useDrawer();
      const [registerModal, { openModal: openModal }] = useModal();
      const [registerTable, { reload, getSelectRows, getSelectRowKeys }] = useTable({
        title: '',
        api: getPagedAsync,
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

      const handleCreate = () => {
        openModal(true, {});
      };

      // 编辑
      const handleEdit = (record) => {
        openModal(true, record);
      };

      // 删除
      const handleDelete = async (record) => {
        await removeAsync({ id: record.id, reload });
      };

      // 激活业务员
      const handleActivate = function () {
        var result = getSelectRows().map((i) => i.id);

        activateAsync(result, reload);
      };

      //授权
      const openPermissions = async (record) => {
          openPermissionsModal(true, {
            name: 'U',
            key: record.id,
          });
        };

      return {
        registerTable,
        reload,

        handleCreate,
        handleEdit,
        handleDelete,
        handleActivate,

        registerPermissionsModal,
        registerModal,

        openPermissions
      };
    },
  });
</script>

<template>
  <PageWrapper title="声明类型">
    <BasicTable @register="registerTable">
      <template #form-custom> custom-slot </template>

      <template #toolbar>
        <a-button type="primary"
                  v-auth="'AbpIdentity.Users.ManageClaims'"
                  @click="openCreateIdentityClaimTypesModal">新增</a-button>
      </template>
      <template #required="{ record }">
        <a-tag color="green"
               v-if="record.required">
          是
        </a-tag>
        <a-tag color="red"
               v-else>
          否
        </a-tag>
      </template>
      <template #valueType="{ record }">
        <span v-if="record.valueType==0">String</span>
        <span v-else-if="record.valueType==1">Int</span>
        <span v-else-if="record.valueType==2">Boolean</span>
        <span v-else-if="record.valueType==3">DateTime</span>
      </template>
      <template #isStatic="{ record }">
        <a-tag color="green"
               v-if="record.isStatic">
          是
        </a-tag>
        <a-tag color="red"
               v-else>
          否
        </a-tag>
      </template>
      <template #action="{ record }">

        <TableAction :actions="[
            {
              label:'编辑',
              auth:['AbpIdentity.Users.ManageClaims'],
              onClick: handleEdit.bind(null, record),

            },

            {
             label:'删除',
              color: 'error',
              auth:['AbpIdentity.Users.ManageClaims'],

              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },

            },
          ]" />
      </template>
    </BasicTable>
    <CreateIdentityClaimTypes @register="registerCreateIdentityClaimTypesModal"
                              @reload="reload"
                              :bodyStyle="{ 'padding-top': '0' }" />
    <EditIdentityClaimTypes @register="registerEditIdentityClaimTypesModal"
                            @reload="reload"
                            :bodyStyle="{ 'padding-top': '0' }" />
    <!-- <Permissions @register="registerPermissionsModal"
                 @reload="reload" /> -->
  </PageWrapper>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { BasicTable, useTable, TableAction } from '/@/components/Table';
import {
  tableColumns,
  getTableListAsync,
  deleteClaimTypesAsync,
  searchFormSchema,
} from './index.ts';
import { useModal } from '/@/components/Modal';
import CreateIdentityClaimTypes from './createIdentityClaimTypes.vue';
import EditIdentityClaimTypes from './editIdentityClaimTypes.vue';
// import Permissions from '/@/views/sys/permissions/index.vue';
import { PageWrapper } from '/@/components/Page';
import { message } from 'ant-design-vue';
export default defineComponent({
  components: {
    BasicTable,
    TableAction,
    CreateIdentityClaimTypes,
    EditIdentityClaimTypes,
    PageWrapper,
    // Permissions,
  },
  setup() {
    const [
      registerCreateIdentityClaimTypesModal,
      { openModal: openCreateIdentityClaimTypesModal },
    ] = useModal();
    const [registerEditIdentityClaimTypesModal, { openModal: openEditIdentityClaimTypesModal }] =
      useModal();

    // const [registerPermissionsModal, { openDrawer: openPermissionsModal }] = useDrawer();
    const [registerTable, { reload }] = useTable({
      title: '',
      api: getTableListAsync,
      columns: tableColumns,
      useSearchForm: true,
      formConfig: {
        labelWidth: 120,
        schemas: searchFormSchema,
      },
      showTableSetting: true,
      rowSelection: { type: 'checkbox' },
      actionColumn: {
        width: 200,
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
      openEditIdentityClaimTypesModal(true, {
        record: record,
      });
    };
    const openPermissions = (record: recordable) => {
      // openPermissionsModal(true, {
      //   name: 'R',
      //   key: record.name,
      // });
    };
    // 删除用户
    const handleDelete = async (record: Recordable) => {
      await deleteClaimTypesAsync({ id: record.id, reload });
    };

    // function getFormValues() {
    //   console.log(reload ().getFieldsValue());
    // }
    return {
      registerTable,
      registerCreateIdentityClaimTypesModal,
      openCreateIdentityClaimTypesModal,
      registerEditIdentityClaimTypesModal,
      handleEdit,
      // registerPermissionsModal,
      handleDelete,
      reload,
      openPermissions,
    };
  },
});
</script>

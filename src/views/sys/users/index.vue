<template>
  <div>
    <BasicTable @register="registerTable">
      <template #form-custom> custom-slot </template>

      <template #toolbar>
        <a-button type="primary"
                  v-auth="'AbpIdentity.Users.Create'"
                  @click="openCreateAbpUserModal">新增</a-button>
      </template>
      <template #action="{ record }">
        <!-- <Button icon="note-edit-line"
                @click="handleEdit(record)">

        </Button>

        <a-button type="link"
                  size="small"
                  @click="handleDelete(record)">
          删除
        </a-button> -->
        <TableAction :actions="[
            {
              icon: 'clarity:note-edit-line',
              auth:['AbpIdentity.Users.Update'],
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              auth:['AbpIdentity.Users.Delete'],
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]" />
      </template>
    </BasicTable>
    <CreateAbpUser @register="registerCreateAbpUserModal"
                   @reload="reload"
                   :bodyStyle="{ 'padding-top': '0' }" />
    <EditAbpUser @register="registerEditAbpUserModal"
                 @reload="reload"
                 :bodyStyle="{ 'padding-top': '0' }" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { BasicTable, useTable, TableAction } from '/@/components/Table';
import { tableColumns, getTableListAsync, deleteUserAsync, searchFormSchema } from './index.ts';
import { useModal } from '/@/components/Modal';
import CreateAbpUser from './createAbpUser.vue';
import EditAbpUser from './editAbpUser.vue';
import { message } from 'ant-design-vue';

export default defineComponent({
  components: {
    BasicTable,
    TableAction,
    CreateAbpUser,
    EditAbpUser,
  },
  setup() {
    const [registerCreateAbpUserModal, { openModal: openCreateAbpUserModal }] = useModal();
    const [registerEditAbpUserModal, { openModal: openEditAbpUserModal }] = useModal();
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
        width: 120,
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
      openEditAbpUserModal(true, {
        record: record,
      });
    };
    // 删除用户
    const handleDelete = async (record: Recordable) => {
      if (record.name == 'admin') {
        message.error('admin not delete');
        return;
      }
      await deleteUserAsync({ userId: record.id, reload });
    };

    // function getFormValues() {
    //   console.log(reload ().getFieldsValue());
    // }
    return {
      registerTable,
      registerCreateAbpUserModal,
      openCreateAbpUserModal,
      registerEditAbpUserModal,
      handleEdit,
      handleDelete,
    };
  },
});
</script>

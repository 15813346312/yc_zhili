<template>
  <div>
    <BasicTable @register="registerTable">
      <template #form-custom> custom-slot </template>

      <template #toolbar>
        <a-button type="primary"
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
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
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
// import { getBasicColumns, getFormConfig } from './tableData';
// import { demoListApi } from '/@/api/demo/table';
import { FormSchema } from '/@/components/Table';
// import { BasicColumn } from '/@/components/Table';
import { tableColumns, getTableListAsync, deleteUserAsync } from './index.ts';
import { useModal } from '/@/components/Modal';
import CreateAbpUser from './CreateAbpUser.vue';
import EditAbpUser from './EditAbpUser.vue';
import { message } from 'ant-design-vue';
// import { useI18n } from '/@/hooks/web/useI18n';
import { Tag, Switch, Button } from 'ant-design-vue';
export const searchFormSchema: FormSchema[] = [
  {
    field: 'filter',
    label: '关键词',
    component: 'Input',
    colProps: { span: 6 },
  },
];

export default defineComponent({
  components: {
    BasicTable,
    TableAction,
    CreateAbpUser,
    EditAbpUser,
    Tag,
    Switch,
    Button,
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

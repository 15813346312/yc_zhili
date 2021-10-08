<template>
  <div>
    <PageWrapper title="订单管理">
      <BasicTable @register="registerTable">
        <template #form-custom> custom-slot </template>

        <template #action="{ record }">
          <TableAction  :actions="[]" />
        </template>
      </BasicTable>
    </PageWrapper>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';

  import { tableColumns, getPagedAsync, searchFormSchema, removeAsync } from './service';

  import { useModal } from '/@/components/Modal';
  import { PageWrapper } from '/@/components/Page';

  export default defineComponent({
    name: 'CollectingVessel',
    components: {
      PageWrapper,
      BasicTable,
      TableAction,
    },
    setup() {
      const [registerModal, { openModal: openModal }] = useModal();
      const [registerTable, { reload }] = useTable({
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

      // 编辑用户
      const handleEdit = (record) => {
        openModal(true, record);
      };

      // 删除用户
      const handleDelete = async (record) => {
        await removeAsync({ id: record.id, reload });
      };

      return {
        registerTable,
        reload,
        handleCreate,
        handleEdit,
        handleDelete,
        registerModal,
        openModal,
      };
    },
  });
</script>

<template>
  <div>
    <PageWrapper title="套餐管理">
      <BasicTable @register="registerTable">
        <template #form-custom> custom-slot </template>

        <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增</a-button>
        </template>

        <template #action="{ record }">
          <TableAction
            :actions="[
              {
                label: '删除',
                color: 'error',
                popConfirm: {
                  title: '是否确认删除',
                  confirm: handleDelete.bind(null, record)
                },
              },
            ]"
          />
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
  import { useGo } from '/@/hooks/web/usePage';

  export default defineComponent({
    name: 'plan',
    components: {
      PageWrapper,
      BasicTable,
      TableAction
    },
    setup() {
      const go=useGo();
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
        go('/project/planAdd')
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

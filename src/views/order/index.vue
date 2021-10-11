<template>
  <div>
    <PageWrapper title="订单管理">
      <BasicTable @register="registerTable">
        <template #form-custom> custom-slot </template>

        <template #action="{ record }">
          <TableAction
            :actions="[
              {
                label: '详情',
                onClick: handleInfo.bind(null, record),
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
      <editDrawer @register="register"></editDrawer>
    </PageWrapper>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';

  import { tableColumns, getPagedAsync, searchFormSchema, removeAsync } from './service';

  import { PageWrapper } from '/@/components/Page';
  import { useDrawer } from '/@/components/Drawer';

  import editDrawer from './info.vue';

  export default defineComponent({
    name: 'CollectingVessel',
    components: {
      PageWrapper,
      BasicTable,
      TableAction,
      editDrawer,
    },
    setup() {
      const [register, { openDrawer: openDrawer }] = useDrawer();
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
        /*  rowSelection: { type: 'checkbox' }, */
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

      const handleCreate = () => {};

      const handleInfo = (record) => {
        openDrawer(true, record);
      };

      const handleDelete = async (record) => {
        await removeAsync({ id: record.id, reload });
      };

      return {
        register,
        registerTable,
        reload,
        handleCreate,
        handleDelete,
        handleInfo
      };
    },
  });
</script>

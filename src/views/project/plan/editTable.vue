<template>
  <div>
    <BasicTable @register="registerTable" @edit-change="handleEditChange">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">添加项目</a-button>
      </template>
      <template #action="{ record, column }">
        <TableAction
          title="关联项目"
          :actions="[
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
    <editModel @register="registerModal" @reload="reloadModal" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useModal } from '/@/components/Modal';

  import editModel from './editModal.vue';

  import {
    BasicTable,
    useTable,
    TableAction,
    BasicColumn,
    ActionItem,
    EditRecordRow,
  } from '/@/components/Table';

  const columns: BasicColumn[] = [
    {
      title: '项目名称',
      dataIndex: 'name',
    },
    {
      title: '简称',
      dataIndex: 'projectCode',
    },
    {
      title: '价格',
      dataIndex: 'price',
    },
  ];

  export default defineComponent({
    components: { BasicTable, TableAction, editModel },
    setup() {
      let data: any[] = [];
      const [registerTable, { getDataSource, setTableData,reload }] = useTable({
        columns: columns,
        showIndexColumn: false,
        dataSource: data,
        actionColumn: {
          width: 160,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
        pagination: false,
      });
      const [registerModal, { openModal: openModal }] = useModal();

      const handleCreate = () => {
        openModal(true, {});
      };

      function handleDelete(record) {
        const index = data.findIndex((item) => item.id === record.id);
        data.splice(index, 1);
        setTableData(data);
        reload();
      }

      function reloadModal(rows) {
        debugger;
        rows.forEach((i) => {
          const index = data.findIndex((item) => item.id === i.id);

          if (index < 0) {
            data.push(i);
          }
        });
        setTableData(data);
        reload();
      }

      return {
        registerTable,
        getDataSource,
        handleCreate,
        registerModal,
        reloadModal,
        handleDelete,
      };
    },
  });
</script>

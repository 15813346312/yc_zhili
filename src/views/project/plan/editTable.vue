<template>
  <div>
    <BasicTable title="关联项目" @register="registerTable" @edit-change="handleEditChange">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">添加项目</a-button>
      </template>
      <template #action="{ record, column }">
        <TableAction
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
      const [registerTable, { getDataSource, setTableData }] = useTable({
        columns: columns,
        showIndexColumn: false,
        dataSource: [],
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
        let data = getDataSource();

        const index = data.findIndex((item) => item.id === record.id);
        data.splice(index, 1);
        setTableData(data);
      }

      function reloadModal(rows) {
        let data = getDataSource();
        rows.forEach((i) => {
          const index = data.findIndex((item) => item.id === i.id);

          if (index < 0) {
            data.push(i);
          }
        });
        setTableData(data);
      }

      return {
        registerTable,
        getDataSource,
        handleCreate,
        registerModal,
        reloadModal,
        handleDelete,
        setTableData
      };
    },
  });
</script>

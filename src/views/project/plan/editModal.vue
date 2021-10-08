<template>
  <div>
    <BasicModal
      title="项目列表"
      @ok="submit"
      @register="registerModal"
      width="800px"
      useWrapper="false"
      :bodyStyle="{ 'padding-top': '0' }"
    >
      <BasicTable @register="registerTable" maxHeight="300"> </BasicTable>
    </BasicModal>
  </div>
</template>

<script lang="ts">
  import { defineComponent, useContext, defineEmit } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicTable, useTable } from '/@/components/Table';

  import { tableColumns, getPagedAsync } from '/@/views/project/project/service';

  export default defineComponent({
    name: 'projectModal',
    components: {
      BasicModal,
      BasicTable,
    },
    setup() {
      // 加载父组件方法
      //defineEmit(['reload']);
      const ctx = useContext();

      let editModel = {};
      const [registerTable, { getSelectRows,clearSelectedRowKeys }] = useTable({
        api: getPagedAsync,
        columns: tableColumns,
        rowSelection: { type: 'checkbox' },
      });
      //加载数据
      const [registerModal, { changeOkLoading, closeModal }] = useModalInner((data) => {});

      // 保存
      const submit = async () => {
        var result = getSelectRows().map(function (i) {
          return { id: i.id, name: i.name, price: i.price, projectCode: i.projectCode };
        });
        ctx.emit('reload', result);
        clearSelectedRowKeys();
        closeModal();
      };

      return {
        registerModal,
        registerTable,
        submit,
      };
    },
  });
</script>

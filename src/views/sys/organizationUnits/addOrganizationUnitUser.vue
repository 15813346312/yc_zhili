<template>
  <BasicModal title="添加成员" :width="1000" :min-height="350" :canFullscreen="false" @ok="submit" @register="registerModal" :bodyStyle="{ 'padding-top': '0' }">
    <BasicTable @register="registerTable">
    </BasicTable>
  </BasicModal>
</template>

<script lang="ts">
import { defineComponent, useContext, defineEmit } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { BasicTable, useTable } from '/@/components/Table';
import { getTableListAsync, tableColumns, searchFormSchema } from './index.ts';
import { message } from 'ant-design-vue';
import { createOrganizationUnitUserAsync } from '/@/api/sys/organizationUnits';
export default defineComponent({
  name: 'addOrganizationUnitUser',
  components: {
    BasicModal,
    BasicTable,
  },
  setup() {
    // 加载父组件方法
    defineEmit(['reloadUser']);
    const ctx = useContext();
    let record;
    const [registerModal, { changeOkLoading, closeModal }] = useModalInner((data) => {
      record = data;
    });
    const [registerTable, { getSelectRows, clearSelectedRowKeys }] = useTable({
      api: getTableListAsync,
      columns: tableColumns,
      useSearchForm: true,
      formConfig: {
        labelWidth: 120,
        schemas: searchFormSchema,
      },
      showTableSetting: false,
      rowSelection: { type: 'checkbox' },
    });

    // 保存
    const submit = async () => {
      try {
        var rows = await getSelectRows();
        if (rows.length <= 0) {
          message.warning('请选择数据');
          return;
        }
        var ids = rows.map((r) => r.id);
        changeOkLoading(true);
        createOrganizationUnitUserAsync(record.id, { userIds: ids })
          .then(() => {
            ctx.emit('reloadUser');
            clearSelectedRowKeys();
            changeOkLoading(false);
            message.success('添加成功');
            closeModal();
          })
          .catch(() => {
            changeOkLoading(false);
          });
      } catch (error) {
        changeOkLoading(false);
      }
    };
    return {
      registerModal,
      submit,
      registerTable,
    };
  },
});
</script>
<style lang="less" scoped>
.ant-checkbox-wrapper + .ant-checkbox-wrapper {
  margin-left: 0px;
}
</style>
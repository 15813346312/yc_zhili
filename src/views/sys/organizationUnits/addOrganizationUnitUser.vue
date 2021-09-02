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
import { getTableListAsync, tableColumns, searchFormSchema } from './index';
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
    // 获取上下文
    const ctx = useContext();
    let record;
    const [registerModal, { changeOkLoading, closeModal }] = useModalInner((data) => {
      record = data;
      console.log('表格', data);
    });

    const [registerTable, { getSelectRows, clearSelectedRowKeys }] = useTable({
      api: getTableListAsync,
      columns: tableColumns, // 表头
      useSearchForm: true, // 是否打开搜索栏
      formConfig: { // 搜索form配置
        labelWidth: 80, // label宽度
        schemas: searchFormSchema, // 搜索form配置
      },
      // showIndexColumn: false, // 是否显示序号
      showTableSetting: false, // 是否打开表格设置
      rowSelection: { type: 'checkbox' }, // 表格每行可以多选
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
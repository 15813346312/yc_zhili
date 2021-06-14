<template>
  <BasicTable @register="registerTable">
    <template #form-custom> custom-slot </template>

    <template #toolbar>
      <a-button type="primary" @click="getFormValues">获取表单数据</a-button>
    </template>
  </BasicTable>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable } from '/@/components/Table';
  // import { getBasicColumns, getFormConfig } from './tableData';
  // import { demoListApi } from '/@/api/demo/table';
  import { FormSchema } from '/@/components/Table';
  import { BasicColumn } from '/@/components/Table';
  export const searchFormSchema: FormSchema[] = [
    {
      field: 'filter',
      label: '关键词',
      component: 'Input',
      colProps: { span: 6 },
    },
  ];
  export const tableColumns: BasicColumn[] = [
    {
      title: '名称',
      dataIndex: 'name',
    },
  ];
  export default defineComponent({
    components: { BasicTable },
    setup() {
      const [registerTable, { getForm }] = useTable({
        title: '',
        api: '',
        columns: tableColumns,
        useSearchForm: true,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        showTableSetting: true,
        rowSelection: { type: 'checkbox' },
      });
      function getFormValues() {
        console.log(getForm().getFieldsValue());
      }
      return {
        registerTable,
        getFormValues,
      };
    },
  });
</script>

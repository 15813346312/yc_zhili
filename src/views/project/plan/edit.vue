<template>
  <PageWrapper title="套餐管理" contentBackground contentClass="p-4">
    <BasicForm @register="registerTask" />
    <PersonTable ref="tableRef" />

    <template #rightFooter>
      <a-button type="primary" @click="submitAll"> 提交 </a-button>
    </template>
  </PageWrapper>
</template>
<script lang="ts">
  import { BasicForm, useForm } from '/@/components/Form';
  import { defineComponent, ref } from 'vue';
  import PersonTable from './editTable.vue';
  import { PageWrapper } from '/@/components/Page';
  import { editSchema } from './service';
  import { Card } from 'ant-design-vue';

  export default defineComponent({
    name: 'planEdit',
    components: { BasicForm, PersonTable, PageWrapper, [Card.name]: Card },
    setup() {
      const tableRef = ref<{ getDataSource: () => any } | null>(null);

      const [registerTask, { validate: validateTaskForm }] = useForm({
        baseColProps: {
          span: 6,
        },
        schemas: editSchema,
        showActionButtonGroup: false,
      });

      async function submitAll() {
        try {
          if (tableRef.value) {
            console.log('table data:', tableRef.value.getDataSource());
          }

          const [values, taskValues] = await Promise.all([validate(), validateTaskForm()]);
          console.log('form data:', values, taskValues);
        } catch (error) {}
      }

      return { registerTask, submitAll, tableRef };
    },
  });
</script>
<style lang="less" scoped>
  .high-form {
    padding-bottom: 48px;
  }
</style>

<template>
  <PageWrapper title="套餐管理" contentBackground contentClass="p-4">
    <BasicForm @register="registerTask" />
    <PersonTable ref="tableRef" @chang="onProjectChang" />

    <template #rightFooter>
      <a-button type="primary" @click="submitAll"> 提交 </a-button>
    </template>
  </PageWrapper>
</template>
<script lang="ts">
  import { BasicForm, useForm } from '/@/components/Form';
  import { defineComponent, ref, toRaw, onMounted } from 'vue';
  import PersonTable from './editTable.vue';
  import { PageWrapper } from '/@/components/Page';
  import { editSchema, createAsync, getAsync, updateAsync } from './service';
  import { Card } from 'ant-design-vue';
  import { useGo } from '/@/hooks/web/usePage';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { useRoute } from 'vue-router';
  import { trigger } from './event';

  export default defineComponent({
    name: 'planEdit',
    components: { BasicForm, PersonTable, PageWrapper, [Card.name]: Card },
    setup(props) {
      const tableRef = ref<{ getDataSource: () => any } | null>(null);
      const go = useGo();
      const route = useRoute();
      const { closeAll, closeLeft, closeRight, closeOther, closeCurrent, refreshPage, setTitle } =
        useTabs();
      const [registerTask, { getFieldsValue, setFieldsValue, validate, resetFields }] = useForm({
        baseColProps: {
          span: 6,
        },
        schemas: editSchema,
        showActionButtonGroup: false,
      });

      const id = route.query.id;

      async function goBack() {
        trigger('reload');
        closeCurrent();

        go('/project/plan');
      }

      async function loadPage() {
        const result = await getAsync(id);
        setFieldsValue(result);

        var projects = result.projects.map(function (i) {
          return {
            id: i.id,
            name: i.name,
            price: i.price,
            projectCode: i.projectCode,
            reportDate: i.reportDate,
            reportDateExtend: i.reportDateExtend,
            key: `${Date.now()}`,
          };
        });

        tableRef.value.setTableData(projects);
      }

      function onProjectChang(changData) {
        setFieldsValue(changData);
      }

      onMounted(async () => {
        id && (await loadPage());
      });

      async function submitAll() {
        const projects = tableRef.value.getDataSource();
        let request = getFieldsValue();

        request.id = id;
        request.projects = projects.filter(function (i) {
          return { id: i.id };
        });
        await validate();

        if (id) {
          await updateAsync(request, goBack);
        } else {
          await createAsync(request, goBack);
        }
      }

      return { registerTask, submitAll, tableRef, onProjectChang };
    },
  });
</script>
<style lang="less" scoped>
  .high-form {
    padding-bottom: 48px;
  }
</style>

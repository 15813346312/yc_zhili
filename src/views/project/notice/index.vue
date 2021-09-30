<template>
  <PageWrapper title="公告配置" contentBackground contentClass="p-4">
    <BasicForm @register="register" />
  </PageWrapper>
</template>
<script lang="ts">
  import { BasicForm, useForm } from '/@/components/Form';
  import { defineComponent } from 'vue';
  import { schemas } from './service';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { PageWrapper } from '/@/components/Page';

  import { get, save } from '/@/api/project/notice';

  export default defineComponent({
    name: 'FormBasicPage',
    components: { BasicForm, PageWrapper },
    setup() {
      const { createMessage } = useMessage();
      const [register, { validate, setProps, getFieldsValue, setFieldsValue }] = useForm({
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 10,
        },
        schemas: schemas,
        actionColOptions: {
          offset: 8,
          span: 12,
        },
        submitButtonOptions: {
          text: '保存',
        },
        submitFunc: customSubmitFunc,
      });

      get().then(function (result) {
        setFieldsValue(result);
      });

      async function customSubmitFunc() {
        try {
          await validate();
          setProps({
            submitButtonOptions: {
              loading: true,
            },
          });

          let model = getFieldsValue();
          await save(model);

          setProps({
            submitButtonOptions: {
              loading: false,
            },
          });
          createMessage.success('提交成功！');
        } catch (error) {}
      }

      return { register };
    },
  });
</script>

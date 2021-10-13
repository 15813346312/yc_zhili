<template>
  <PageWrapper title="注册协议配置" contentBackground contentClass="p-4">
    <BasicForm @register="register" />
  </PageWrapper>
</template>
<script lang="ts">
  import { BasicForm, useForm } from '/@/components/Form';
  import { defineComponent } from 'vue';
  import { schemas } from './service';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { PageWrapper } from '/@/components/Page';

  import { get, save } from '/@/api/mallconfig/mallconfig';

  export default defineComponent({
    name: 'FormBasicPage',
    components: { BasicForm, PageWrapper },
    setup() {
      const { createMessage } = useMessage();
      const key = 'PrivacyAgreementConfig';
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

      get(key).then(function (result) {
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
          await save(key, model);

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

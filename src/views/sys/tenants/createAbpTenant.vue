<template>
  <BasicModal title="新增角色"
              :canFullscreen="false"
              @ok="submit"
              @register="registerModal"

              :bodyStyle="{ 'padding-top': '0' }">

      <BasicForm @register="registerUserForm" />

  </BasicModal>
</template>

<script lang="ts">
import { defineComponent, reactive, useContext, defineEmit } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { BasicForm, useForm } from '/@/components/Form/index';
import { createFormSchema, createTenantAsync } from './index.ts';
import { useI18n } from '/@/hooks/web/useI18n';
export default defineComponent({
  name: 'CreateAbpTenant',
  components: {
    BasicModal,
    BasicForm,
  },
  setup() {
    // 加载父组件方法
    defineEmit(['reload']);
    const ctx = useContext();
    const { t } = useI18n();
    const [registerModal, { changeOkLoading, closeModal }] = useModalInner();
    const [registerUserForm, { getFieldsValue, validate, resetFields }] = useForm({
      labelWidth: 120,
      schemas: createFormSchema,
      showActionButtonGroup: false,
    });


    // 保存
    const submit = async () => {
      try {
        let request = getFieldsValue(); //as IdentityUserCreateDto;
        console.log(request)
        await createTenantAsync({
          request,
          changeOkLoading,
          validate,
          closeModal,
          resetFields,
        });
        ctx.emit('reload');
      } catch (error) {
        changeOkLoading(false);
      }
    };
    return {
      registerModal,
      registerUserForm,
      submit,

    };
  },
});
</script>
<style lang="less" scoped>
.ant-checkbox-wrapper + .ant-checkbox-wrapper {
  margin-left: 0px;
}
</style>
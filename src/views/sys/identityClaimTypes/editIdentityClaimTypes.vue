<template>
  <BasicModal title="编辑角色"
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
import { editFormSchema, updateClaimTypesAsync } from './index.ts';
export default defineComponent({
  name: 'EditIdentityClaimTypes',
  components: {
    BasicModal,
    BasicForm,
  },
  setup() {
    // 加载父组件方法
    defineEmit(['reload']);
    const ctx = useContext();
    const [registerUserForm, { getFieldsValue, validate, setFieldsValue }] = useForm({
      labelWidth: 100,
      schemas: editFormSchema,
      showActionButtonGroup: false,
    });
    let currentUserInfo;
    const [registerModal, { changeOkLoading, closeModal }] = useModalInner((data) => {
      currentUserInfo = data.record;

      setFieldsValue({
        name: data.record.name,
        id: data.record.id,
        required: data.record.required,
        valueType: data.record.valueType,
        regex: data.record.regex,
        regexDescription: data.record.regexDescription,
        description: data.record.description,
        isStatic: data.record.isStatic,
      });
    });

    const submit = async () => {
      try {
        let request = getFieldsValue();
        console.log(request);
        request.id = currentUserInfo.id;
        await updateClaimTypesAsync({ request, changeOkLoading, validate, closeModal });
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
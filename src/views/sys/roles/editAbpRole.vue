<template>
  <BasicModal title="编辑角色" :canFullscreen="false" @ok="submit" @register="registerModal"  :bodyStyle="{ 'padding-top': '0' }">
      <BasicForm @register="registerUserForm" />
  </BasicModal>
</template>

<script lang="ts">
import { defineComponent, reactive, useContext, defineEmit } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { BasicForm, useForm } from '/@/components/Form/index';
import { Tabs, Checkbox } from 'ant-design-vue';
import {
  editFormSchema,
  updateRoleAsync
} from './index.ts';
export default defineComponent({
  name: 'EditAbpRole',
  components: {
    BasicModal,
    BasicForm,
    Tabs,
    Checkbox,
    TabPane: Tabs.TabPane,
  },
  setup() {
    // 加载父组件方法
    defineEmit(['reload']);
    const ctx = useContext();
    const [registerUserForm, { getFieldsValue, validate, setFieldsValue }] = useForm({
      labelWidth: 120,
      schemas: editFormSchema,
      showActionButtonGroup: false,
    });
    let currentUserInfo;
    const [registerModal, { changeOkLoading, closeModal }] = useModalInner((data) => {
      currentUserInfo = data.record;

      setFieldsValue({
        name: data.record.name,
        id: data.record.id,
        isDefault: data.record.isDefault,
        isPublic: data.record.isPublic
      });
    });



    const submit = async () => {
      try {
        let request = getFieldsValue();
        console.log(request)
        request.id = currentUserInfo.id;
        request.concurrencyStamp = currentUserInfo.concurrencyStamp;
        await updateRoleAsync({ request, changeOkLoading, validate, closeModal });
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
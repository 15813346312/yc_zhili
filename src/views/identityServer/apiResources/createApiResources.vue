<template>
  <BasicModal title="新增角色"
              :canFullscreen="false"
              @ok="submit"
              :width="680"
              @visible-change="visibleChange"
              @register="registerModal"
              :bodyStyle="{ 'padding-top': '0' }">

    <div style="padding: 0">
      <Tabs>
        <TabPane tab="信息"
                 key="1">
          <BasicForm @register="registerUserForm" />
        </TabPane>
        <TabPane tab="声明"
                 key="2">

        </TabPane>
      </Tabs>
    </div>

  </BasicModal>
</template>

<script lang="ts">
import { defineComponent, reactive, useContext, defineEmit } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { BasicForm, useForm } from '/@/components/Form/index';
import { createFormSchema, createApiResourcesAsync } from './index.ts';
import { getApiResourcesList } from '/@/api/identityServer/apiResources';
import { Tabs } from 'ant-design-vue';
export default defineComponent({
  name: 'CreateApiResources',
  components: {
    BasicModal,
    BasicForm,
    Tabs,
    TabPane: Tabs.TabPane,
  },
  setup() {
    // 加载父组件方法
    defineEmit(['reload']);
    const ctx = useContext();
    const [registerModal, { changeOkLoading, closeModal }] = useModalInner();
    const [registerUserForm, { getFieldsValue, validate, resetFields }] = useForm({
      labelWidth: 120,
      schemas: createFormSchema,
      showActionButtonGroup: false,
    });
    const visibleChange = async (visible: boolean) => {
      if (visible) {
        console.log('1111');
        getApiResourcesList().then((res) => {
          console.log(res);
        });
      } else {
        resetFields();
      }
    };
    // 保存
    const submit = async () => {
      try {
        let request = getFieldsValue();
        await createApiResourcesAsync({
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
      visibleChange,
    };
  },
});
</script>
<style lang="less" scoped>
.ant-checkbox-wrapper + .ant-checkbox-wrapper {
  margin-left: 0px;
}
</style>
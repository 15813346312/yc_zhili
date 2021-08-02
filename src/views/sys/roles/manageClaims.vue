<template>
  <BasicModal title="编辑用户"
              :canFullscreen="false"
              @ok="submit"
              :width="680"
              @register="registerModal"
              @visible-change="visibleChange"
              :bodyStyle="{ 'padding-top': '0' }">
    <div>
      <BasicForm @register="registerUserForm"
                 @submit="handleSubmit">
        <template #add="{ field }">
          <a-button>添加</a-button>
        </template>
      </BasicForm>
      <div>
        {{state.dataList.length}}
      </div>
    </div>
  </BasicModal>
</template>

<script lang="ts">
import { defineComponent, reactive, useContext, defineEmit } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { BasicForm, useForm } from '/@/components/Form/index';
import { Tabs, Checkbox } from 'ant-design-vue';
import { getRoleClaimsAsync } from './index.ts';
export default defineComponent({
  name: 'EditAbpUser',
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
    const state: any = reactive({
      dataList: [],
      currentUserInfo: null,
    });
    const [registerUserForm, { getFieldsValue, validate, setFieldsValue }] = useForm({
      schemas: [
        {
          field: 'claimType',
          component: 'Input',
          label: '名称',
          colProps: {
            span: 8,
          },
          required: true,
        },
        {
          field: 'claimValue',
          component: 'Input',
          label: '值',
          colProps: {
            span: 8,
          },
          required: true,
        },
        {
          field: '0',
          component: 'Input',
          label: ' ',
          colProps: {
            span: 8,
          },
          slot: 'add',
        },
      ],
      labelWidth: 100,
      showResetButton: false,
      showSubmitButton: false,
      actionColOptions: { span: 24 },
    });

    const [registerModal, { changeOkLoading, closeModal }] = useModalInner((data) => {
      state.currentUserInfo = data.record;
      console.log(data.record.id);

      getRoleClaimsAsync(data.record.id).then((res) => {
        state.dataList = res.items;
        console.log(state.dataList);
      });

      // dataList = res.items;
    });

    const visibleChange = async (visible: boolean) => {
      if (visible) {
      } else {
      }
    };

    const submit = async () => {
      try {
        let request = getFieldsValue();
        console.log('111');

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
<template>
  <BasicModal title="编辑用户" :showCancelBtn="false" :showOkBtn="false" :canFullscreen="false" @ok="submit" :width="680" @register="registerModal" @visible-change="visibleChange" :bodyStyle="{ 'padding-top': '0' }">
    <div>
      <BasicForm @register="registerUserForm" @submit="handleSubmit">
        <template #add="{ field }">
          <a-button @click="handleCreate">添加</a-button>
        </template>
      </BasicForm>
      <div>
        <a-row v-for="item in state.dataList" :key="item.id" style="text-align:right;margin-top:5px;">
          <a-col :span="8">
            <a-input style="width:80%" v-model:value="item.claimType" />
          </a-col>
          <a-col :span="8">
            <a-input style="width:80%" v-model:value="item.claimValue" />
          </a-col>
          <a-col :span="8"  >

            <TableAction  style="margin-left:30px;" :actions="[
            {
              label:'修改',
              onClick: handleEdit.bind(null, item),
            },
            {
             label:'删除',
              color: 'error',

              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, item),
              },

            },
          ]" />
          </a-col>
        </a-row>
      </div>
    </div>
  </BasicModal>
</template>

<script lang="ts">
import { defineComponent, reactive, useContext, defineEmit } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { TableAction } from '/@/components/Table';
import { BasicForm, useForm } from '/@/components/Form/index';
import { getRoleClaimsAsync,createRoleClaimsAsync,deleteRoleClaimsAsync } from './index.ts';
export default defineComponent({
  name: 'EditAbpUser',
  components: {
    BasicModal,
    BasicForm,
TableAction
  },
  setup() {
    // 加载父组件方法
    defineEmit(['reload']);
    const ctx = useContext();
    const state: any = reactive({
      dataList: [],
      record: null,
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
      state.record = data.record;

      getRoleClaimsAsync(data.record.id).then((res) => {
        state.dataList = res.items;
      });
    });

    const visibleChange = async (visible: boolean) => {
      if (visible) {
      } else {
      }
    };
    // 编辑用户
    const handleEdit = async (record: Recordable) => {
      console.log(record);
      console.log(state.record.id);

    };
    const handleDelete = async (record: Recordable) => {
      await  deleteRoleClaimsAsync(state.record.id,record)

    };
    const handleCreate =async()=>{
        var  request = await getFieldsValue();

        createRoleClaimsAsync(state.record.id,request);

    };
    const submit = async () => {
      try {
        closeModal()

      } catch (error) {
        changeOkLoading(false);
      }
    };
    return {
      registerModal,
      registerUserForm,
      submit,
      state,
      visibleChange,
      handleEdit,
      handleDelete,
      handleCreate
    };
  },
});
</script>
<style lang="less" scoped>
.ant-checkbox-wrapper + .ant-checkbox-wrapper {
  margin-left: 0px;
}
</style>
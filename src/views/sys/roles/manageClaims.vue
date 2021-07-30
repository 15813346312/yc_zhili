<template>
  <BasicModal title="管理声明"
              :canFullscreen="false"
              @ok="submit"
              @register="registerModal"
              :bodyStyle="{ 'padding-top': '0' }">
    <BasicForm @register="register"
               @submit="handleSubmit">
      <template #add="{ field }">
        <a-button>添加</a-button>
      </template>
    </BasicForm>
    <div>
      111
    </div>
  </BasicModal>
</template>
<script>
import { defineComponent, reactive, useContext, defineEmit } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { BasicForm, useForm } from '/@/components/Form/index';
import {
  getRoleClaimsAsync,
} from './index.ts';

export default defineComponent({
  components: { BasicModal, BasicForm },
  setup () {

    defineEmit(['reload']);
    let row;
    const [registerModal, { changeOkLoading, closeModal }] = useModalInner((data) => {
      row = data.record
      console.log(row.id)
      console.log('-----------')
      // (await getRoleClaimsAsync(row.id)).then(res => {
      //   console.log(res)
      // })

    });
    const [register, { validate }] = useForm({
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

    // const visibleChange = async (visible) => {
    //   if (visible) {
    //     console.log('--222222222--')
    //     console.log(row.id)

    //     var res = await getRoleClaimsAsync(row.id);
    //     console.log(res)
    //   }
    // };
    const submit = async () => {
      closeModal();
    };
    const handleSubmit = async () => {
      try {
        const data = await validate();
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    };

    return {
      registerModal,
      register,
      submit,
      row,
      // visibleChange,

    }
  },
})
</script>

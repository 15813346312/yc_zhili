<template>
  <div>
    <BasicModal
      title="编辑医院"

      :canFullscreen="false"
      @ok="submit"
      @register="registerModal"
      :bodyStyle="{ 'padding-top': '0' }"
    >
      <BasicForm @register="registerUserForm" />
    </BasicModal>
  </div>
</template>

<script lang="ts">
  import { defineComponent, useContext, defineEmit } from 'vue';

  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';

  import { createFormSchema, createAsync, updateAsync } from './service';

  export default defineComponent({
    name: 'editHospitalModel',
    components: {
      BasicModal,
      BasicForm,
    },
    setup() {
      // 加载父组件方法
      //defineEmit(['reload']);
      const ctx = useContext();

      const [registerUserForm, { getFieldsValue, setFieldsValue, validate, resetFields }] = useForm(
        {
          labelWidth: 100,
          schemas: createFormSchema,
          showActionButtonGroup: false,
        }
      );
      let editModel = {};
      //加载数据
      const [registerModal, { changeOkLoading, closeModal }] = useModalInner((data) => {
        debugger;
        if (!data.id) {
          resetFields();
          editModel = {};
          return;
        }
        editModel = data;
        setFieldsValue({
          name: data.name,
          id: data.id,
        });
      });

      // 保存
      const submit = async () => {
        try {
          let request = getFieldsValue(); //as IdentityUserCreateDto;
          console.log(editModel);

          if (!editModel.id) {
            await createAsync({
              request,
              changeOkLoading,
              validate,
              closeModal,
              resetFields,
            });
          } else {
            request.id = editModel.id;
            request.concurrencyStamp = editModel.concurrencyStamp;

            await updateAsync({ request, changeOkLoading, validate, closeModal });
          }

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

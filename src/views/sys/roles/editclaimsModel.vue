<template>
  <BasicModal title="新增/编辑"
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
import { createRoleClaimsAsync, updateRoleClaimsAsync } from './index.ts';
// import { IdentityRoleDto, IdentityUserCreateDto } from '/@/services/ServiceProxies';
import { useI18n } from '/@/hooks/web/useI18n';
import { Row } from 'ant-design-vue';
export default defineComponent({
  name: 'CreateAbpRole',
  components: {
    BasicModal,
    BasicForm,
  },
  setup() {
    // 加载父组件方法
    defineEmit(['reloadTable']);
    const ctx = useContext();
    const { t } = useI18n();
    let id;
    let row;
    const [registerModal, { changeOkLoading, closeModal }] = useModalInner((data) => {
      id = data.id;
      row = data.record;
      setFieldsValue({
        claimType: data.record.claimType,
        id: data.record.id,
        claimValue: data.record.claimValue,
      });
    });
    const [registerUserForm, { getFieldsValue, setFieldsValue, validate, resetFields }] = useForm({
      labelWidth: 120,
      schemas: [
        // {
        //   field: 'claimType',
        //   component: 'Input',
        //   label: '类型',
        //   required: true,
        //   labelWidth: 70,
        //   colProps: {
        //     span: 24,
        //   },
        // },
        {
          field: 'claimValue',
          component: 'Input',
          label: '值',
          componentProps: {
            placeholder: '请输入值',
          },
          required: true,
          labelWidth: 70,
          colProps: {
            span: 24,
          },
        },
      ],
      showActionButtonGroup: false,
    });

    // 保存
    const submit = async () => {
      try {
        let request = getFieldsValue(); //as IdentityUserCreateDto;
        console.log(id);
        if (validate()) {
          changeOkLoading(true);
          if (row.id) {
            updateRoleClaimsAsync(
              id,
              {
                claimType: row.claimType,
                claimValue: row.claimValue,
                newClaimValue: request.claimValue,
              },
              changeOkLoading,
              validate,
              closeModal
            );
          } else {
            createRoleClaimsAsync(id, request, changeOkLoading, validate, closeModal);
          }
          resetFields();
          changeOkLoading(false);
          closeModal();

          ctx.emit('reloadTable');
        }
      } catch (error) {
        changeOkLoading(false);
      }
    };
    return {
      t,
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
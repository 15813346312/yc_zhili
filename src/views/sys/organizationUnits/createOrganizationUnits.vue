<template>
  <BasicModal title="新增"
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
import { createOrganizationUnitAsync } from '/@/api/sys/organizationUnits';
import { message } from 'ant-design-vue';
// import { IdentityRoleDto, IdentityUserCreateDto } from '/@/services/ServiceProxies';
import { useI18n } from '/@/hooks/web/useI18n';
export default defineComponent({
  name: 'CreateAbpRole',
  components: {
    BasicModal,
    BasicForm,
  },
  setup() {
    // 加载父组件方法
    defineEmit(['reload']);
    const ctx = useContext();
    const { t } = useI18n();
    let parentId;

    const [registerModal, { changeOkLoading, closeModal, setModalProps }] = useModalInner(
      (data) => {
        parentId = data.id;
        setModalProps({ title: '新增' + (parentId == null ? '' : '-' + parentId) });
      }
    );
    const [registerUserForm, { getFieldsValue, validate, resetFields }] = useForm({
      labelWidth: 120,
      schemas: [
        {
          field: 'displayName',
          component: 'Input',
          label: '名称',
          componentProps: {
            placeholder: '请输入名称',
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
      await validate();
      let request = getFieldsValue();
      changeOkLoading(true);
      createOrganizationUnitAsync({ parentId: parentId, displayName: request.displayName })
        .then(() => {
          message.success('新增成功');
          changeOkLoading(false);
          closeModal();
          resetFields();
          ctx.emit('reload');
        })
        .catch(() => {
          changeOkLoading(false);
        });
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
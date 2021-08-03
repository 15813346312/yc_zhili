<template>
  <BasicModal title="修改密码"
              :canFullscreen="false"
              @ok="submit"
              @register="registerModal"
              @visible-change="visibleChange"
              :bodyStyle="{ 'padding-top': '0' }">
    <div>

      <BasicForm @register="registerUserForm" />

    </div>
  </BasicModal>
</template>

<script lang="ts">
import { defineComponent, reactive, useContext, defineEmit } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { BasicForm, useForm } from '/@/components/Form/index';
import { Tabs, Checkbox } from 'ant-design-vue';
import {
  reSetFormSchema,
  getAllRoleAsync,
  updateUserAsync,
  getRolesByUserIdAsync,
  getUserAsync,
} from './index.ts';
import { message } from 'ant-design-vue';
export default defineComponent({
  name: 'ReSetPassWord',
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
      schemas: reSetFormSchema,
      showActionButtonGroup: false,
    });
    let currentUserInfo;
    const [registerModal, { changeOkLoading, closeModal }] = useModalInner((data) => {
      currentUserInfo = data.record;

      setFieldsValue({
        name: data.record.name,
        userName: data.record.userName,
        email: data.record.email,
        phoneNumber: data.record.phoneNumber,
        lockoutEnabled: data.record.lockoutEnabled,
      });
    });
    let roles: any = [];
    let defaultRoles: string[] = [];
    let rolesRef = reactive(roles);
    let defaultRolesRef = reactive(defaultRoles);
    const visibleChange = async (visible: boolean) => {
      if (visible) {
        const roles = await getAllRoleAsync();
        const userRoles = await getRolesByUserIdAsync(currentUserInfo.id as string);

        currentUserInfo = await getUserAsync(currentUserInfo.id);
        userRoles.items?.forEach((e) => {
          defaultRolesRef.push(e.name as string);
        });
        roles.items?.forEach((e) => {
          rolesRef.push(e);
        });
      } else {
        rolesRef.splice(0, rolesRef.length);
        defaultRolesRef.splice(0, defaultRolesRef.length);
      }
    };
    // 选择角色
    const onRoleSelectedChange = (value: string[]) => {
      defaultRolesRef.splice(0, defaultRolesRef.length);
      value.forEach((e) => {
        defaultRolesRef.push(e);
      });
    };
    const submit = async () => {
      try {
        let request = getFieldsValue();
        request.id = currentUserInfo.id;
        request.surname = currentUserInfo.surname;
        request.concurrencyStamp = currentUserInfo.concurrencyStamp;
        (request.name = currentUserInfo.name),
          (request.userName = currentUserInfo.userName),
          (request.email = currentUserInfo.email),
          (request.phoneNumber = currentUserInfo.phoneNumber),
          (request.lockoutEnabled = currentUserInfo.lockoutEnabled),
          (request.roleNames = defaultRolesRef);
        await updateUserAsync({ request, changeOkLoading, validate, closeModal });
        ctx.emit('reload');
      } catch (error) {
        changeOkLoading(false);
      }
    };
    return {
      registerModal,
      registerUserForm,
      submit,
      rolesRef,
      onRoleSelectedChange,
      visibleChange,
      defaultRolesRef,
    };
  },
});
</script>
<style lang="less" scoped>
.ant-checkbox-wrapper + .ant-checkbox-wrapper {
  margin-left: 0px;
}
</style>
<template>
  <BasicDrawer @register="registerDrawer" title="权限" width="20%">
    <BasicTree :treeData="allPermissionsRef" v-model="totalRolePermissionsRef" :replaceFields="{children:'permissions',title:'displayName',key:'name'}" checkable ref="treeRef" />
    <div :style="{
        position: 'absolute',
        right: 0,
        bottom: '10px',
        width: '100%',
        borderTop: '1px solid #e9e9e9',
        padding: '10px 16px',
        background: '#fff',
        textAlign: 'right',
        zIndex: 1,
      }">
      <a-button :style="{ marginRight: '8px' }" @click="closeDrawer">{{ t('common.cancelText') }}
      </a-button>
      <a-button type="primary" @click="submitRolePermisstionAsync">
        {{ t('common.saveText') }}
      </a-button>
    </div>
  </BasicDrawer>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, unref, toRaw } from 'vue';
import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
// import { getRolePermissionAsync, updateRolePermissionAsync } from './AbpRole';
import { defineComponent, reactive, ref, unref, toRaw } from 'vue';
import { getPermissionsList, updatePermissions } from '/@/api/sys/permission';
import { useI18n } from '/@/hooks/web/useI18n';
import { BasicTree, TreeActionType } from '/@/components/Tree/index';
import { useUserStoreWidthOut } from '/@/store/modules/user';
import { message } from 'ant-design-vue';
import { useLoading } from '/@/components/Loading';
const [openFullLoading, closeFullLoading] = useLoading({
  tip: 'Loading...',
});

export default defineComponent({
  name: 'PermissionAbpRole',
  components: { BasicDrawer, BasicTree },
  setup() {
    var providerName: string = ''; //R or U
    var providerKey: string = '';
    // let roleName: string = '';
    const { t } = useI18n();
    const [registerDrawer, { closeDrawer, setDrawerProps }] = useDrawerInner(async (data) => {
      providerKey =data.key;
      providerName = data.name;

      await getRolePermissions (providerName, providerKey);
      //loading.value = false;
    });
    const treeRef = ref<Nullable<TreeActionType>>(null);
    const totalRolePermissionsRef = reactive([]);
    let allPermissionsRef = reactive([]);
    const getTree = () => {
      const tree = unref(treeRef);
      if (!tree) {
        throw new Error('tree is null!');
      }
      return tree;
    };
    /**
     * 获取权限信息并且构造权限树
     */
    const getRolePermissions = async (providerName: string, providerKey: string) => {
      setDrawerProps({ loading: true });
      totalRolePermissionsRef.splice(0, totalRolePermissionsRef.length);
      allPermissionsRef.splice(0, allPermissionsRef.length);
      const permissions = await getPermissionsList(providerName, providerKey);
      totalRolePermissionsRef.push(...(permissions.groups as []));
      allPermissionsRef.push(...(permissions.groups as []));
      getTree().setCheckedKeys(permissions.isGranted as []);
      setDrawerProps({ loading: false });
    };
    const submitRolePermisstionAsync = async () => {
      let request = [];

      let permisstions: any = [];

      const keys = toRaw(getTree().getCheckedKeys()) as [];
      request=keys
      console.log(request)
      // const noSelectedPermissions = totalRolePermissionsRef.filter((e) => {
      //   return !(keys.indexOf(e) > -1);
      // });
      // noSelectedPermissions.forEach((item: string) => {
      //   if (item.includes('.')) {
      //     let permisstion: any;
      //     permisstion.name = item;
      //     permisstion.isGranted = false;
      //     permisstions.push(permisstion);
      //   }
      // });
      // keys.forEach((item: string) => {
      //   if (item.includes('.')) {
      //     let permisstion: any;
      //     permisstion.name = item;
      //     permisstion.isGranted = true;
      //     permisstions.push(permisstion);
      //   }
      // });
      // request = permisstions;
      try {
        openFullLoading();
        await updatePermissions(providerName, providerKey, request);
        message.success(t('common.operationSuccess'));
        closeFullLoading();
        closeDrawer();
      } catch (error) {
        closeFullLoading();
      }
    };
    return {
      t,
      registerDrawer,
      allPermissionsRef,
      submitRolePermisstionAsync,
      closeDrawer,
      treeRef,
    };
  },
});
</script>
<style lang="less" scoped></style>
import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const system: AppRouteModule = {
  path: '/system',
  name: 'System',
  component: LAYOUT,
  redirect: '/system/users',
  meta: {
    icon: 'ant-design:user',
    title: '身份标识管理',
  },
  children: [
    {
      path: 'users',
      name: 'Users',
      component: () => import('/@/views/sys/users/index.vue'),
      meta: {
        title: '用户管理',
        // affix: true,
        roles: ['AbpIdentity.Users'],
        icon: 'ant-design:user-add',
      },
    },
    {
      path: 'roles',
      name: 'Roles',
      component: () => import('/@/views/sys/roles/index.vue'),
      meta: {
        title: '角色管理',
        // affix: true,
        roles: ['AbpIdentity.Roles'],
        icon: 'ant-design:usergroup-add',
      },
    },
    {
      path: 'organizationUnits',
      name: 'OrganizationUnits',
      component: () => import('/@/views/sys/organizationUnits/index.vue'),
      meta: {
        title: '组织机构',
        // affix: true,
        roles: ['AbpIdentity.OrganizationUnits'],
        icon: 'ant-design:gold',
      },
    },
    {
      path: 'identityClaimTypes',
      name: 'IdentityClaimTypes',
      component: () => import('/@/views/sys/identityClaimTypes/index.vue'),
      meta: {
        title: '声明类型',
        // affix: true,
        roles: ['AbpIdentity.IdentityClaimTypes'],
        icon: 'ant-design:file',
      },
    },
    // {
    //   path: 'settings',
    //   name: 'Settings',
    //   component: () => import('/@/views/sys/settings/index.vue'),
    //   meta: {
    //     title: '基础设置',
    //     // affix: true,
    //     roles: ['EasyAbp.Abp.SettingUi.ShowSettingPage'],
    //     icon: 'ant-design:home-outlined',
    //   },
    // },
  ],
};

export default system;

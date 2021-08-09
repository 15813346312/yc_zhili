import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const system: AppRouteModule = {
  path: '/identityServer',
  name: 'IdentityServer',
  component: LAYOUT,
  redirect: '/identityServer/apiResources',
  meta: {
    icon: 'ant-design:cloud-server',
    title: 'IdentityServer管理',
  },
  children: [
    {
      path: 'apiResources',
      name: 'ApiResources',
      component: () => import('/@/views/identityServer/apiResources/index.vue'),
      meta: {
        title: 'API资源',
        roles: ['AbpIdentityServer.ApiResources'],
        icon: 'ant-design:container',
      },
    },
    {
      path: 'clients',
      name: 'Clients',
      component: () => import('/@/views/identityServer/clients/index.vue'),
      meta: {
        title: '客户端',
        roles: ['AbpIdentityServer.Clients'],
        icon: 'ant-design:database',
      },
    },
    {
      path: 'identityResources',
      name: 'IdentityResources',
      component: () => import('/@/views/identityServer/identityResources/index.vue'),
      meta: {
        title: 'Identity资源',
        roles: ['AbpIdentityServer.IdentityResources'],
        icon: 'ant-design:build',
      },
    },
  ],
};

export default system;

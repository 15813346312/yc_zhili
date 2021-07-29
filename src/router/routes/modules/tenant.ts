import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const system: AppRouteModule = {
  path: '/tenant',
  name: 'Tenant',
  component: LAYOUT,
  redirect: '/system/tenants',
  meta: {
    icon: 'ant-design:cloud-server',
    title: '租户管理',
  },
  children: [
    {
      path: 'tenants',
      name: 'Tenants',
      component: () => import('/@/views/sys/tenants/index.vue'),
      meta: {
        title: '租户管理',
        // affix: true,
        roles: ['AbpTenantManagement.Tenants'],
        icon: 'ant-design:cloud-server',
      },
    },
  ],
};

export default system;

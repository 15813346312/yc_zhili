import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const system: AppRouteModule = {
  path: '/system',
  name: 'System',
  component: LAYOUT,
  redirect: '/system/users',
  meta: {
    icon: 'ant-design:home-outlined',
    title: '系统设置',
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
        icon: 'ant-design:home-outlined',
      },
    },
  ],
};

export default system;

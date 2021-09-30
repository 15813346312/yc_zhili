import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';


const dashboard: AppRouteModule = {
  path: '/setting',
  name: 'setting',
  component: LAYOUT,
  redirect: '/setting/index',
  meta: {
    icon: 'ant-design:user',
    title: '配置管理',
  },
  children: [
    {
      path: 'index',
      name: 'index',
      component: () => import('/@/views/good/products/index.vue'),
      meta: {
        title: '公告'
      },
    }
  ],
};

export default dashboard;

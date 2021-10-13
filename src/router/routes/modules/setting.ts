import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';


const dashboard: AppRouteModule = {
  path: '/setting',
  name: 'setting',
  component: LAYOUT,
  redirect: '/setting/notice',
  meta: {
    icon: 'ant-design:user',
    title: '配置管理',
  },
  children: [
    {
      path: 'notice',
      name: 'notice',
      component: () => import('/@/views/project/notice/index.vue'),
      meta: {
        title: '公告',
      },
    },
    {
      path: 'register',
      name: 'register',
      component: () => import('/@/views/config/register/index.vue'),
      meta: {
        title: '注册协议',
      },
    },
    {
      path: 'privacy',
      name: 'privacy',
      component: () => import('/@/views/config/privacy/index.vue'),
      meta: {
        title: '隐私协议',
      },
    }
  ],
};

export default dashboard;

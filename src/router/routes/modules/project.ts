import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';


const dashboard: AppRouteModule = {
  path: '/project',
  name: 'project',
  component: LAYOUT,
  redirect: '/project/hospital',
  meta: {
    icon: 'ant-design:user',
    title: '项目管理',
  },
  children: [
    {
      path: 'hospital',
      name: 'hospital',
      component: () => import('/@/views/project/hospital/index.vue'),
      meta: {
        title: '医院'
      },
    },
    {
      path: 'operator',
      name: 'operator',
      component: () => import('/@/views/project/operator/index.vue'),
      meta: {
        title: '业务员'
      },
    },
    {
      path: 'vessel',
      name: 'vessel',
      component: () => import('/@/views/project/vessel/index.vue'),
      meta: {
        title: '采血管'
      },
    },
    {
      path: 'project',
      name: 'project',
      component: () => import('/@/views/good/products/index.vue'),
      meta: {
        title: '项目'
      },
    },
    {
      path: 'plan',
      name: 'plan',
      component: () => import('/@/views/good/products/index.vue'),
      meta: {
        title: '套餐'
      },
    },
  ],
};

export default dashboard;

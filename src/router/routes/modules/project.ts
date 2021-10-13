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
        title: '医院',
      },
    },
    {
      path: 'operator',
      name: 'operator',
      component: () => import('/@/views/project/operator/index.vue'),
      meta: {
        title: '操作员',
      },
    },
    {
      path: 'vessel',
      name: 'vessel',
      component: () => import('/@/views/project/vessel/index.vue'),
      meta: {
        title: '采血管',
      },
    },
    {
      path: 'project',
      name: 'project',
      component: () => import('/@/views/project/project/index.vue'),
      meta: {
        title: '项目',
      },
    },
    {
      path: 'plan',
      name: 'plan',
      component: () => import('/@/views/project/plan/index.vue'),
      meta: {
        title: '套餐',
      },
    },
    {
      path: 'planAdd',
      name: 'planAdd',
      component: () => import('/@/views/project/plan/edit.vue'),
      meta: {
        title: '套餐编辑',
        currentActiveMenu: '/project/plan',
      },
    },
  ],
};

export default dashboard;

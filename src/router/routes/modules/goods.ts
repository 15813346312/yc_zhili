import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/good',
  name: 'Good',
  component: LAYOUT,
  redirect: '/good/product',
  meta: {
    icon: 'ant-design:home-outlined', // ion:grid-outline
    title: t('routes.dashboard.dashboard'),
  },
  children: [
    {
      path: 'product',
      name: 'Product',
      component: () => import('/@/views/good/products/index.vue'),
      meta: {
        icon: 'ant-design:appstore',
        title: '标准路由',
        // roles: ['AbpIdentity.Users'],
      },
    },
    {
      path: 'test1',
      name: 'Test1',
      component: () => import('/@/views/good/test/test1.vue'),
      meta: {
        icon: 'ant-design:appstore',
        title: '测试1',
        // roles: ['AbpIdentity.Users'],
      },
    },
    {
      path: 'test2',
      name: 'Test2',
      component: () => import('/@/views/good/test/test2.vue'),
      meta: {
        icon: 'ant-design:appstore',
        title: '测试2',
        // roles: ['AbpIdentity.Users'],
      },
    },
  ],
};

export default dashboard;

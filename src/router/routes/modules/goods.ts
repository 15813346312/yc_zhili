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
  ],
};

export default dashboard;

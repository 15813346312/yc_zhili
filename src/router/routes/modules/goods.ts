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

        title: '商品列表',
        // roles: ['AbpIdentity.Users'],
      },
    },
    {
      path: 'specs',
      name: 'Specs',
      component: () => import('/@/views/good/specs/index.vue'),
      meta: {
        icon: 'ant-design:appstore',

        title: '商品规格',
        // roles: ['AbpIdentity.Users'],
      },
    },
    {
      path: 'brand',
      name: 'Brand',
      component: () => import('/@/views/good/brands/index.vue'),
      meta: {
        icon: 'ant-design:appstore',

        title: '品牌列表',
        // roles: ['AbpIdentity.Users'],
      },
    },
    {
      path: 'productCategorie',
      name: 'ProductCategorie',
      component: () => import('/@/views/good/productCategories/index.vue'),
      meta: {
        icon: 'ant-design:appstore',

        title: '商品分类',
        // roles: ['AbpIdentity.Users'],
      },
    },
  ],
};

export default dashboard;

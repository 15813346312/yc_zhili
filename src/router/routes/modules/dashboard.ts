import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/dashboard',
  name: 'Dashboard',
  redirect: '/dashboard/workbench',
  component: LAYOUT,
  meta: {
    icon: 'ant-design:home-outlined', // ion:grid-outline
    title: t('routes.dashboard.dashboard'),
  },
  children: [
    {
      path: 'workbench',
      name: 'Workbench',
      component: () => import('/@/views/dashboard/workbench/index.vue'),
      meta: {
        icon: 'ant-design:appstore',

        title: t('routes.dashboard.workbench'),
        // roles: ['AbpIdentity.Users'],
      },
    },

  ],
};

export default dashboard;

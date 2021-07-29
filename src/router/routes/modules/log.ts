import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const system: AppRouteModule = {
  path: '/log',
  name: 'Log',
  component: LAYOUT,
  redirect: '/log/abpauditing',
  meta: {
    icon: 'ant-design:home-outlined',
    title: '系统日志',
  },
  children: [
    {
      path: 'abpauditing',
      name: 'Abpauditing',
      component: () => import('/@/views/sys/abpauditing/index.vue'),
      meta: {
        title: '审计日志',
        // affix: true,
        roles: ['AbpAuditing.AuditLog'],
        icon: 'ant-design:home-outlined',
      },
    },
    {
      path: 'securitylog',
      name: 'Securitylog',
      component: () => import('/@/views/sys/securitylog/index.vue'),
      meta: {
        title: '安全日志',
        // affix: true,
        roles: ['AbpAuditing.SecurityLog'],
        icon: 'ant-design:home-outlined',
      },
    },
  ],
};

export default system;

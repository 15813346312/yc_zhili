import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const system: AppRouteModule = {
  path: '/system',
  name: 'System',
  component: LAYOUT,
  redirect: '/system/users',
  meta: {
    icon: 'ant-design:user',
    title: '系统设置',
  },
  children: [
    {
      path: '/systemManager',
      name: 'SystemManager',
      // component: LAYOUT,
      redirect: '/system/users',
      meta: {
        icon: 'ant-design:user',
        title: '身份管理',
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
            icon: 'ant-design:user-add',
          },
        },
        {
          path: 'roles',
          name: 'Roles',
          component: () => import('/@/views/sys/roles/index.vue'),
          meta: {
            title: '角色管理',
            // affix: true,
            roles: ['AbpIdentity.Roles'],
            icon: 'ant-design:usergroup-add',
          },
        },
      ],
    },
    {
      path: '/log',
      name: 'Log',
      component: LAYOUT,
      redirect: '/log/abpauditing',
      meta: {
        icon: 'ant-design:file',
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
            icon: 'ant-design:file-text',
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
            icon: 'ant-design:file-pdf',
          },
        },
      ],
    },
  ],
};

export default system;

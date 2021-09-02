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
        title: '身份标识管理',
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
        {
          path: 'organizationUnits',
          name: 'OrganizationUnits',
          component: () => import('/@/views/sys/organizationUnits/index.vue'),
          meta: {
            title: '组织机构',
            // affix: true,
            roles: ['AbpIdentity.OrganizationUnits'],
            icon: 'ant-design:gold',
          },
        },
        {
          path: 'identityClaimTypes',
          name: 'IdentityClaimTypes',
          component: () => import('/@/views/sys/identityClaimTypes/index.vue'),
          meta: {
            title: '声明类型',
            // affix: true,
            roles: ['AbpIdentity.IdentityClaimTypes'],
            icon: 'ant-design:file',
          },
        },
      ],
    },

    {
      path: '/identityServer',
      name: 'IdentityServer',
      // component: LAYOUT,
      redirect: '/identityServer/apiResources',
      meta: {
        icon: 'ant-design:cloud-server',
        title: 'IdentityServer管理',
      },
      children: [
        {
          path: 'apiResources',
          name: 'ApiResources',
          component: () => import('/@/views/sys/identityServer/apiResources/index.vue'),
          meta: {
            title: 'API资源',
            roles: ['AbpIdentityServer.ApiResources'],
            icon: 'ant-design:container',
          },
        },
        {
          path: 'clients',
          name: 'Clients',
          component: () => import('/@/views/sys/identityServer/clients/index.vue'),
          meta: {
            title: '客户端',
            roles: ['AbpIdentityServer.Clients'],
            icon: 'ant-design:database',
          },
        },
        {
          path: 'identityResources',
          name: 'IdentityResources',
          component: () => import('/@/views/sys/identityServer/identityResources/index.vue'),
          meta: {
            title: 'Identity资源',
            roles: ['AbpIdentityServer.IdentityResources'],
            icon: 'ant-design:build',
          },
        },
      ],
    },
    {
      path: '/tenant',
      name: 'Tenant',
      // component: LAYOUT,
      redirect: '/system/tenants',
      meta: {
        icon: 'ant-design:cloud-server',
        title: '租户管理',
      },
      children: [
        {
          path: 'tenants',
          name: 'Tenants',
          component: () => import('/@/views/sys/tenants/index.vue'),
          meta: {
            title: '租户管理',
            // affix: true,
            roles: ['AbpTenantManagement.Tenants'],
            icon: 'ant-design:cloud-server',
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

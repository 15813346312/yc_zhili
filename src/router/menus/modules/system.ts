import type { MenuModule } from '/@/router/types';
const system: MenuModule = {
  // 菜单排序。越大排名越后面
  orderNo: 50,
  menu: {
    path: '/system',
    name: '系统设置',
    children: [
      {
        path: '/systemManager',
        name: '身份标识管理',
        children: [
          {
            path: 'users',
            name: '用户管理',
          },
          {
            path: 'roles',
            name: '角色管理',
          },
          {
            path: 'organizationUnits',
            name: '组织机构',
          },
          {
            path: 'identityClaimTypes',
            name: '声明类型',
          },
        ],
      },

      {
        path: '/identityServer',
        name: 'IdentityServer管理',
        children: [
          {
            path: 'apiResources',
            name: 'API资源',
          },
          {
            path: 'clients',
            name: '客户端',
          },
          {
            path: 'identityResources',
            name: 'Identity资源',
          },
        ],
      },
      {
        path: '/tenant',
        name: '租户管理',
        children: [
          {
            path: 'tenants',
            name: '租户管理',
          },
        ],
      },
      {
        path: '/log',
        name: '系统日志',
        children: [
          {
            path: 'abpauditing',
            name: '审计日志',
          },
          {
            path: 'securitylog',
            name: '安全日志',
          },
        ],
      },

      // {
      //   path: 'tenants',
      //   name: '租户管理',
      // },
      // {
      //   path: 'settings',
      //   name: '基础设置',
      // },
    ],
  },
};
export default system;

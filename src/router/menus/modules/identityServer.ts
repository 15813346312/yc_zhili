import type { MenuModule } from '/@/router/types';
const log: MenuModule = {
  // 菜单排序。越大排名越后面
  orderNo: 53,
  menu: {
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
};
export default log;

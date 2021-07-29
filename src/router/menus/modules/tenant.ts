import type { MenuModule } from '/@/router/types';
const tenant: MenuModule = {
  // 菜单排序。越大排名越后面
  orderNo: 51,
  menu: {
    path: '/tenant',
    name: '租户管理',
    children: [
      {
        path: 'tenants',
        name: '租户管理',
      },
    ],
  },
};
export default tenant;

import type { MenuModule } from '/@/router/types';
const system: MenuModule = {
  // 菜单排序。越大排名越后面
  orderNo: 50,
  menu: {
    path: '/system',
    name: '系统设置',
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
        path: 'tenants',
        name: '租户管理',
      },
      {
        path: 'settings',
        name: '基础设置',
      },
    ],
  },
};
export default system;

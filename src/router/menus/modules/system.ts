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
    ],
  },
};
export default system;

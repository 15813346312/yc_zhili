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
        name: '身份管理',
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
    ],
  },
};
export default system;

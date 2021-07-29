import type { MenuModule } from '/@/router/types';
const log: MenuModule = {
  // 菜单排序。越大排名越后面
  orderNo: 51,
  menu: {
    path: '/log',
    name: '内部审计',
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
};
export default log;

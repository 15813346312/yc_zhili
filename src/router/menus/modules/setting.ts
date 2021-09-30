import type { MenuModule } from '/@/router/types';

const menu: MenuModule = {
  orderNo: 4,
  menu: {
    name: '配置管理',
    path: '/setting',

    children: [
      {
        path: 'notice',
        name: '公告',
      }
    ],
  },
};
export default menu;

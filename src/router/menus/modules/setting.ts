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
      },
      {
        path: 'register',
        name: '注册协议',
      },
      {
        path: 'privacy',
        name: '隐私协议',
      },
    ],
  },
};
export default menu;

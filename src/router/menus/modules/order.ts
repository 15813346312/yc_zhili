import type { MenuModule } from '/@/router/types';

const menu: MenuModule = {
  orderNo: 6,
  menu: {
    name: '订单管理',
    path: '/order',

    children: [
      {
        path: 'orderlist',
        name: '订单',
      }
    ],
  },
};
export default menu;

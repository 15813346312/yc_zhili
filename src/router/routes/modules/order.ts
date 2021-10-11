import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';


const dashboard: AppRouteModule = {
  path: '/order',
  name: 'order',
  component: LAYOUT,
  redirect: '/order/orderlist',
  meta: {
    icon: 'ant-design:user',
    title: '订单管理',
  },
  children: [
    {
      path: 'orderlist',
      name: 'orderlist',
      component: () => import('/@/views/order/index.vue'),
      meta: {
        title: '订单',
      },
    }
  ],
};

export default dashboard;

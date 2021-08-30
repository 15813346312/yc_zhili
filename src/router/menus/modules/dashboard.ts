import type { MenuModule } from '/@/router/types';
import { t } from '/@/hooks/web/useI18n';

const menu: MenuModule = {
  orderNo: 10,
  menu: {
    name: '主页',
    path: '/dashboard',

    children: [
      {
        path: 'workbench',
        name: '工作台',
      },
      {
        path: 'analysis',
        name: '分析页',
      },
    ],
  },
};
export default menu;

import type { MenuModule } from '/@/router/types';
import { t } from '/@/hooks/web/useI18n';

const menu: MenuModule = {
  orderNo: 1,
  menu: {
    name: '主页',
    path: '/dashboard',

    children: [
      {
        path: 'workbench',
        name: '工作台',
      }
    ],
  },
};
export default menu;

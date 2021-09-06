import type { MenuModule } from '/@/router/types';
import { t } from '/@/hooks/web/useI18n';

const menu: MenuModule = {
  orderNo: 2,
  menu: {
    name: '标准路由',
    path: '/good',

    children: [
      {
        path: 'product',
        name: '标准路由',
      },
      {
        path: 'test1',
        name: '测试1',
      },
      {
        path: 'test2',
        name: '测试2',
      },
    ],
  },
};
export default menu;

import type { MenuModule } from '/@/router/types';
import { t } from '/@/hooks/web/useI18n';

const menu: MenuModule = {
  orderNo: 2,
  menu: {
    name: '商品管理',
    path: '/good',

    children: [
      {
        path: 'product',
        name: '商品列表',
      },
      {
        path: 'brand',
        name: '品牌列表',
      },
      {
        path: 'productCategorie',
        name: '商品分类',
      },
      {
        path: 'specs',
        name: '商品规格',
      },
    ],
  },
};
export default menu;

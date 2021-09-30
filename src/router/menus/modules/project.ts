import type { MenuModule } from '/@/router/types';

const menu: MenuModule = {
  orderNo: 2,
  menu: {
    name: '项目管理',
    path: '/project',

    children: [
      { path: 'hospital', name: '医院' },
      { path: 'operator', name: '业务员' },
      { path: 'vessel', name: '采血管' },
      { path: 'project', name: '项目' },
      { path: 'plan', name: '套餐' },
    ],
  },
};
export default menu;

// 用于配置某些组件的常规配置，而无需修改组件
import type { SorterResult } from '../components/Table';

export default {
  // 表格配置
  table: {
    // 表格接口请求通用配置，可在组件prop覆盖
    // 支持 xxx.xxx.xxx格式
    fetchSetting: {
      // 传给后台的当前页字段
      pageField: 'page',
      // 传给后台的每页显示多少条的字段
      sizeField: 'maxResultCount',
      // 接口返回表格数据的字段
      listField: 'items',
      // 接口返回表格总数的字段
      totalField: 'totalCount',
    },

    // 可选的分页选项
    pageSizeOptions: ['20', '50', '100', '200'],
    // 默认每页显示多少条
    defaultPageSize: 20,
    // 默认排序方法
    defaultSortFn: (sortInfo: SorterResult) => {
      const { field, order } = sortInfo;
      var sort = '';
      if (field != undefined) {
        sort = field;
      }
      if (field != undefined && order != undefined) {
        sort += order == 'ascend' ? '' : ' desc';
      }
      return {
        // The sort field passed to the backend you
        sorting: sort,
        // Sorting method passed to the background asc/desc
        // order,
      };
    },
    // 自定义过滤方法
    defaultFilterFn: (data: Partial<Recordable<string[]>>) => {
      return data;
    },
  },
  // 滚动组件配置
  scrollbar: {
    // 是否使用原生滚动样式
    // 开启后，菜单，弹窗，抽屉会使用原生滚动条组件
    native: true,
  },
};

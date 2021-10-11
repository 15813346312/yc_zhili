import { FormSchema } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table';

import { message } from 'ant-design-vue';
import { useLoading } from '/@/components/Loading';
// import { PagedListInput, PagedListOutput, ListOutput } from '../../../api/sys/model/basicModel';
import { pagedList, create, remove, update, get } from '/@/api/project/plan';

const [openFullLoading, closeFullLoading] = useLoading({
  tip: 'Loading...',
});

export const tableColumns: BasicColumn[] = [
  {
    title: '名称',
    dataIndex: 'name',
    sorter: true,
  },
  {
    title: '价格',
    dataIndex: 'price',
    sorter: false,
  },
  {
    title: '城市',
    dataIndex: 'city',
    sorter: false,
    customRender: ({ text }) => {
      if (text == '1') {
        return '广州';
      }
      return '非广州';
    },
  },
  {
    title: '来源',
    dataIndex: 'source',
    sorter: false,
    customRender: ({ text }) => {
      if (text == '0') {
        return '系统';
      }
      return '微信小程序';
    },
  },
  {
    title: '报告时间',
    dataIndex: 'reportDateDescription',
    sorter: false,
  },
];

const allReportDates: any[] = [
  {
    label: '24小时',
    value: 0,
    key: '24小时',
  },
  {
    label: '2个工作日',
    value: 1,
    key: '2个工作日',
  },
  {
    label: '3个工作日',
    value: 2,
    key: '3个工作日',
  },
  {
    label: '4个工作日',
    value: 3,
    key: '4个工作日',
  },
  {
    label: '5个工作日',
    value: 4,
    key: '5个工作日',
  },
  {
    label: '6个工作日',
    value: 5,
    key: '6个工作日',
  },
  {
    label: '7个工作日',
    value: 6,
    key: '7个工作日',
  },
  {
    label: '8个工作日',
    value: 7,
    key: '8个工作日',
  },
  {
    label: '1个月',
    value: 8,
    key: '1个月',
  },
  {
    label: '自定义',
    value: 9,
    key: '自定义',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'filter',
    label: '关键词',
    componentProps: {
      placeholder: '请输入关键词',
    },
    subLabel: '',
    component: 'Input',
    colProps: { span: 6 },
  },
];

export const editSchema: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '名称',
    componentProps: {
      placeholder: '请输入名称',
    },
    required: true,
    labelWidth: 70,
    colProps: {
      span: 24,
    },
  },
  {
    field: 'price',
    component: 'InputNumber',
    label: '价格',
    componentProps: {
      placeholder: '请输入价格',
    },
    required: true,
    labelWidth: 70,
    colProps: {
      span: 24,
    },
  },
  {
    field: 'city',
    component: 'Select',
    label: '城市',
    componentProps: {
      options: [
        {
          label: '广州',
          value: 1,
          key: '广州',
        },
        {
          label: '非广州',
          value: 2,
          key: '非广州',
        },
      ],
    },
    required: true,
    labelWidth: 70,
    colProps: {
      span: 24,
    },
  },

  {
    field: 'reportDate',
    component: 'Select',
    label: '报告日期',
    componentProps: () => {
      return {
        options: allReportDates,
      };
    },
    required: true,
    labelWidth: 70,
    colProps: {
      span: 24,
    },
  },
  {
    field: 'reportDateExtend',
    component: 'Input',
    label: '    ',
    componentProps: {
      placeholder: '请输入自定义日期',
    },
    show: ({ model }) => {
      return model.reportDate == 9;
    },
    labelWidth: 70,
    colProps: {
      span: 24,
    },
  },
  {
    field: 'remark',
    component: 'InputTextArea',
    label: '备注',
    componentProps: {
      placeholder: '请输入备注',
    },
    required: false,
    labelWidth: 70,
    colProps: {
      span: 24,
    },
  },
];

/**
 * 分页列表
 * @param params
 * @returns
 */
export async function getPagedAsync(params: any): Promise<any | undefined> {
  params.skipCount = (params.page - 1) * params.maxResultCount;
  const result = await pagedList(params);
  return result;
  //return GetUserListApi(params);
}

/**
 * 创建
 * @param param0
 */
export async function createAsync(request, goBack) {
  if (!request.projects.length) {
    message.error('请选择关联项目');
    return;
  }
  await create(request);
  message.success('新增成功');
  goBack();
}

/**
 * 删除
 * @param param0
 */
export async function removeAsync({ id, reload }) {
  try {
    openFullLoading();
    await remove(id);
    closeFullLoading();
    message.success('删除成功');
    reload();
  } catch (error) {
    closeFullLoading();
  }
}

/**
 * 编辑
 * @param param0
 */
export async function updateAsync(request, goBack) {
  if (!request.projects.length) {
    message.error('请选择关联项目');
    return;
  }

  await update(request.id, request);
  message.success('编辑成功');
  goBack();
}

export async function getAsync(id: string) {
  return await get(id);
}

import { FormSchema } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table';
import moment from 'moment';

import { message } from 'ant-design-vue';
import { useLoading } from '/@/components/Loading';
import { all as GetVesselAll } from '/@/api/project/vessel';
import { pagedList, create, remove, update } from '/@/api/project/project';

const [openFullLoading, closeFullLoading] = useLoading({
  tip: 'Loading...',
});

/* const allVessel: any[] = await GetVesselAll(); */
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

export const tableColumns: BasicColumn[] = [
  {
    title: '项目名称',
    dataIndex: 'name',
    sorter: true,
  },
  {
    title: '简称',
    dataIndex: 'projectCode',
    sorter: false,
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
/*   {
    title: '抽血管',
    dataIndex: 'collectingVesselId',
    sorter: false,
    customRender: ({ text }) => {
      return allVessel.filter((i) => i.id == text)[0].name;
    },
  }, */
  {
    title: '方法',
    dataIndex: 'method',
    sorter: false,
  },
  {
    title: '样本量/μl',
    dataIndex: 'sampleCapacity',
    sorter: false,
  },
  {
    title: '报告日期',
    dataIndex: 'reportDateDescription',
    sorter: false,
    customRender: ({ text }) => {
      return text;
    },
  },
  {
    title: '创建时间',
    dataIndex: 'creationTime',
    sorter: false,
    customRender: ({ text }) => {
      return moment(text).format('YYYY-MM-DD HH:mm');
    },
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

export const createFormSchema: FormSchema[] = [
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
    field: 'projectCode',
    component: 'Input',
    label: '简称',
    componentProps: {
      placeholder: '请输入项目简称',
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
    field: 'collectingVesselId',
    component: 'ApiSelect',
    label: '采血管',
    componentProps: {
      api: GetVesselAll,
      // use name as label
      labelField: 'name',
      // use id as value
      valueField: 'id',
      // not request untill to select
      immediate: false
    },
    required: true,
    labelWidth: 70,
    colProps: {
      span: 24,
    },
  },
  {
    field: 'method',
    component: 'Input',
    label: '采样方法',
    componentProps: {
      placeholder: '请输入采样方法',
    },
    required: true,
    labelWidth: 70,
    colProps: {
      span: 24,
    },
  },
  {
    field: 'sampleCapacity',
    component: 'Input',
    label: '样品量',
    componentProps: {
      placeholder: '请输入样品量',
    },
    required: true,
    labelWidth: 70,
    colProps: {
      span: 24,
    },
    renderComponentContent: () => {
      return {
        suffix: () => 'μl',
      };
    },
  },
  {
    field: 'reportRoom',
    component: 'Input',
    label: '运输条件',
    required: false,
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
    field: 'clinicalIntro',
    component: 'InputTextArea',
    label: '临床应用',
    componentProps: {
      placeholder: '请输入临床应用',
    },
    required: true,
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
export async function createAsync({ request, changeOkLoading, validate, closeModal, resetFields }) {
  changeOkLoading(true);
  await validate();
  await create(request);
  changeOkLoading(false);
  message.success('新增成功');
  resetFields();
  closeModal();
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
export async function updateAsync({ request, changeOkLoading, validate, closeModal }) {
  changeOkLoading(true);
  await validate();

  await update(request.id, request);
  changeOkLoading(false);
  message.success('编辑成功');
  closeModal();
}

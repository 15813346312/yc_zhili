import { FormSchema } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table';
import moment from 'moment';

import { message } from 'ant-design-vue';
import { useLoading } from '/@/components/Loading';
// import { PagedListInput, PagedListOutput, ListOutput } from '../../../api/sys/model/basicModel';
import { pagedList, create, remove, update } from '/@/api/order/order';

const [openFullLoading, closeFullLoading] = useLoading({
  tip: 'Loading...',
});

export const tableColumns: BasicColumn[] = [
  {
    title: '订单编号',
    dataIndex: 'orderNo',
    sorter: true,
  },
  {
    title: '价格',
    dataIndex: 'orderTotal',
    sorter: false,
  },
  {
    title: '业务员',
    dataIndex: 'operator.userName',
    sorter: false,
  },
  {
    title: '医生',
    dataIndex: 'doctor.userName',
    sorter: false,
  },
  {
    title: '患者姓名',
    dataIndex: 'patient',
    sorter: false,
  },
  {
    title: '患者手机',
    dataIndex: 'patientPhone',
    sorter: false,
  },
  {
    title: '患者性别',
    dataIndex: 'patientSex',
    sorter: false,
  },
  {
    title: '患者年龄',
    dataIndex: 'patientAge',
    sorter: false,
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

export const infoSchema: DescItem[] = [
  {
    field: 'orderNo',
    label: '订单编号',
  },
  {
    field: 'creationTime',
    label: '下单日期',
    render: (text) => {
      return moment(text).format('YYYY-MM-DD HH:mm');
    },
  },
  {
    field: 'discountPercent',
    label: '折扣',
    render: (text) => {
      return text * 100 + '%';
    },
  },
  {
    field: 'promotionAmount',
    label: '优惠',
  },
  {
    field: 'orderTotal',
    label: '订单金额',
  },
  {
    field: 'patient',
    label: '患者',
  },
  {
    field: 'patientPhone',
    label: '患者手机号',
  },
  {
    field: 'patientAge',
    label: '患者年龄',
  },
  {
    field: 'patientIdCard',
    label: '患者身份证',
  },
  {
    field: 'patientProvince',
    label: '省份',
  },
  {
    field: 'patientCity',
    label: '城市',
  },
  {
    field: 'patientDistrict',
    label: '区域',
  },
  {
    field: 'patientAddress',
    label: '详细地址',
  },
  {
    field: 'doctor',
    label: '医生',
  },
  {
    field: 'operator',
    label: '操作员',
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

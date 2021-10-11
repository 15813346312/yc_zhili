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
    title: '订单ID',
    dataIndex: 'id',
    sorter: true,
  },
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
    field: 'code',
    component: 'Input',
    label: '编码',
    componentProps: {
      placeholder: '请输入编码',
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

export const editFormSchema: FormSchema[] = [
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

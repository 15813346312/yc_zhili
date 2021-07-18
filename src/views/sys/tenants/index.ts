import { FormSchema } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table';
import moment from 'moment';

import { message } from 'ant-design-vue';
import { useLoading } from '/@/components/Loading';
// import { PagedListInput, PagedListOutput, ListOutput } from '../../../api/sys/model/basicModel';
import { deleteTenant, createTenant, updateTenant, getTenantPagedList } from '/@/api/sys/tenant';
import { useI18n } from '/@/hooks/web/useI18n';
const { t } = useI18n();
const [openFullLoading, closeFullLoading] = useLoading({
  tip: 'Loading...',
});

export const tableColumns: BasicColumn[] = [
  {
    title: 'Id',
    dataIndex: 'id',
    sorter: true,
  },
  {
    title: '名称',
    dataIndex: 'name',
    sorter: true,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'filter',
    label: '关键词',
    subLabel: '',
    component: 'Input',
    colProps: { span: 6 },
  },
];

export const createFormSchema: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '租户名称',
    required: true,
    labelWidth: 100,
    colProps: {
      span: 24,
    },
  },
  {
    field: 'adminEmailAddress',
    component: 'Input',
    label: '管理员邮箱',
    required: true,
    labelWidth: 100,
    colProps: {
      span: 24,
    },
  },
  {
    field: 'adminPassword',
    component: 'Input',
    label: '管理员密码',
    required: true,
    labelWidth: 100,
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
export async function getTableListAsync(params: any): Promise<any | undefined> {
  params.skipCount = (params.page - 1) * params.maxResultCount;
  const result = await getTenantPagedList(params);
  return result;
  //return GetUserListApi(params);
}

/**
 * 创建
 * @param param0
 */
export async function createTenantAsync({
  request,
  changeOkLoading,
  validate,
  closeModal,
  resetFields,
}) {
  changeOkLoading(true);
  await validate();
  await createTenant(request);
  changeOkLoading(false);
  message.success('新增成功');
  resetFields();
  closeModal();
}

/**
 * 删除
 * @param param0
 */
export async function deleteTenantAsync({ id, reload }) {
  try {
    openFullLoading();
    await deleteTenant(id);
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
export async function updateTenantAsync({ request, changeOkLoading, validate, closeModal }) {
  changeOkLoading(true);
  await validate();

  await updateTenant(request.id, request);
  changeOkLoading(false);
  message.success('编辑成功');
  closeModal();
}

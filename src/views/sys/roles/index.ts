import { FormSchema } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table';
import moment from 'moment';

import { message } from 'ant-design-vue';
import { useLoading } from '/@/components/Loading';
// import { PagedListInput, PagedListOutput, ListOutput } from '../../../api/sys/model/basicModel';
import { deleteRole, createRole, updateRole, getRolePagedList } from '/@/api/sys/role';
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
  {
    title: '是否默认',
    dataIndex: 'isDefault',
    slots: { customRender: 'isDefault' },
    sorter: true,
  },
  {
    title: '是否公共',
    dataIndex: 'isPublic',
    slots: { customRender: 'isPublic' },

    sorter: true,
  },
  // {
  //   title: '是否锁定',
  //   dataIndex: 'lockoutEnabled',
  //   slots: { customRender: 'lockoutEnabled' },
  // },
  // {
  //   title: '创建时间',
  //   dataIndex: 'creationTime',
  //   customRender: ({ text }) => {
  //     return moment(text).format('YYYY-MM-DD HH:mm');
  //   },
  //   sorter: true,
  // },
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
    label: '名称',
    required: true,
    labelWidth: 70,
    colProps: {
      span: 12,
    },
  },
  {
    field: 'isDefault',
    component: 'Switch',
    label: '是否默认',
    labelWidth: 70,
    colProps: {
      span: 12,
    },
  },
  {
    field: 'isPublic',
    component: 'Switch',
    label: '是否公共',
    labelWidth: 70,
    colProps: {
      span: 12,
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
      span: 12,
    },
  },
  {
    field: 'isDefault',
    component: 'Switch',
    label: '是否默认',
    labelWidth: 70,
    colProps: {
      span: 12,
    },
  },
  {
    field: 'isPublic',
    component: 'Switch',
    label: '是否公共',
    labelWidth: 70,
    colProps: {
      span: 12,
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
  const result = await getRolePagedList(params);
  return result;
  //return GetUserListApi(params);
}

/**
 * 创建
 * @param param0
 */
export async function createRoleAsync({
  request,
  changeOkLoading,
  validate,
  closeModal,
  resetFields,
}) {
  changeOkLoading(true);
  await validate();
  await createRole(request);
  changeOkLoading(false);
  message.success('新增成功');
  resetFields();
  closeModal();
}

/**
 * 删除
 * @param param0
 */
export async function deleteRoleAsync({ id, reload }) {
  try {
    openFullLoading();
    await deleteRole(id);
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
export async function updateRoleAsync({ request, changeOkLoading, validate, closeModal }) {
  changeOkLoading(true);
  await validate();

  await updateRole(request.id, request);
  changeOkLoading(false);
  message.success('编辑成功');
  closeModal();
}

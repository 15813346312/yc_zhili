import { FormSchema } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table';
import moment from 'moment';

import { message } from 'ant-design-vue';
import { useLoading } from '/@/components/Loading';
// import { PagedListInput, PagedListOutput, ListOutput } from '../../../api/sys/model/basicModel';
import { deleteClaimTypes, createClaimTypes, updateClaimTypes, getClaimTypesPagedList } from '/@/api/sys/identityClaimTypes';
import { useI18n } from '/@/hooks/web/useI18n';
const { t } = useI18n();
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
    title: '必填',
    dataIndex: 'required',
    slots: { customRender: 'required' },
    sorter: true,
  },
  {
    title: '值类型',
    dataIndex: 'valueType',
    slots: { customRender: 'valueType' },
    sorter: true,
  },
  {
    title: '正则',
    dataIndex: 'regex',
    sorter: true,
  },
  {
    title: '正则描述',
    dataIndex: 'regexDescription',
    sorter: true,
  },
  {
    title: '描述',
    dataIndex: 'description',
    sorter: true,
  },
  {
    title: '是否静态',
    dataIndex: 'isStatic',
    slots: { customRender: 'isStatic' },
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
    label: '名称',
    required: true,
    labelWidth: 100,
    colProps: {
      span: 24,
    },
  },
  {
    field: 'required',
    component: 'Checkbox',
    label: '是否必填',
    labelWidth: 100,
    colProps: {
      span: 24,
    },
  },
  {
    field: 'valueType',
    component: 'Select',
    label: '值类型',
    required: true,
    labelWidth: 100,
    componentProps: {
      options: [
        { label: 'String', value: 0 },
        { label: 'Int', value: 1 },
        { label: 'Boolean', value: 2 },
        { label: 'DateTime', value: 3 },
      ],
    },
    colProps: {
      span: 24,
    },
  },
  {
    field: 'regex',
    component: 'Input',
    label: '正则',
    labelWidth: 100,
    colProps: {
      span: 24,
    },
  },
  {
    field: 'regexDescription',
    component: 'Input',
    label: '正则描述',
    labelWidth: 100,
    colProps: {
      span: 24,
    },
  },
  {
    field: 'description',
    component: 'Input',
    label: '描述',
    labelWidth: 100,
    colProps: {
      span: 24,
    },
  },
  {
    field: 'isStatic',
    component: 'Checkbox',
    label: '是否静态',
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
    labelWidth: 100,
    colProps: {
      span: 24,
    },
  },
  {
    field: 'required',
    component: 'Checkbox',
    label: '是否必填',
    labelWidth: 100,
    colProps: {
      span: 24,
    },
  },
  {
    field: 'valueType',
    component: 'Select',
    label: '值类型',
    required: true,
    labelWidth: 100,
    componentProps: {
      options: [
        { label: 'String', value: 0 },
        { label: 'Int', value: 1 },
        { label: 'Boolean', value: 2 },
        { label: 'DateTime', value: 3 },
      ],
    },
    colProps: {
      span: 24,
    },
  },
  {
    field: 'regex',
    component: 'Input',
    label: '正则',
    labelWidth: 100,
    colProps: {
      span: 24,
    },
  },
  {
    field: 'regexDescription',
    component: 'Input',
    label: '正则描述',
    labelWidth: 100,
    colProps: {
      span: 24,
    },
  },
  {
    field: 'description',
    component: 'Input',
    label: '描述',
    labelWidth: 100,
    colProps: {
      span: 24,
    },
  },
  {
    field: 'isStatic',
    component: 'Checkbox',
    label: '是否静态',
    labelWidth: 100,
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
  const result = await getClaimTypesPagedList(params);
  return result;
  //return GetUserListApi(params);
}

/**
 * 创建
 * @param param0
 */
export async function createClaimTypesAsync({
  request,
  changeOkLoading,
  validate,
  closeModal,
  resetFields,
}) {
  changeOkLoading(true);
  await validate();
  await createClaimTypes(request);
  changeOkLoading(false);
  message.success('新增成功');
  resetFields();
  closeModal();
}

/**
 * 删除
 * @param param0
 */
export async function deleteClaimTypesAsync({ id, reload }) {
  try {
    openFullLoading();
    await deleteClaimTypes(id);
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
export async function updateClaimTypesAsync({ request, changeOkLoading, validate, closeModal }) {
  changeOkLoading(true);
  await validate();

  await updateClaimTypes(request.id, request);
  changeOkLoading(false);
  message.success('编辑成功');
  closeModal();
}

import { FormSchema } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table';
import moment from 'moment';

import { message } from 'ant-design-vue';
import { useLoading } from '/@/components/Loading';
// import { PagedListInput, PagedListOutput, ListOutput } from '../../../api/sys/model/basicModel';
import {
  deleteApiResources,
  createApiResources,
  updateApiResources,
  getApiResourcesPagedList,
} from '/@/api/sys/apiResources';
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
    title: '显示名称',
    dataIndex: 'displayName',
    sorter: true,
  },
  {
    title: '描述',
    dataIndex: 'description',
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
  const result = await getApiResourcesPagedList(params);
  return result;
  //return GetUserListApi(params);
}

/**
 * 创建
 * @param param0
 */
export async function createApiResourcesAsync({
  request,
  changeOkLoading,
  validate,
  closeModal,
  resetFields,
}) {
  changeOkLoading(true);
  await validate();
  await createApiResources(request);
  changeOkLoading(false);
  message.success('新增成功');
  resetFields();
  closeModal();
}

/**
 * 删除
 * @param param0
 */
export async function deleteApiResourcesAsync({ id, reload }) {
  try {
    openFullLoading();
    await deleteApiResources(id);
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
export async function updateApiResourcesAsync({ request, changeOkLoading, validate, closeModal }) {
  changeOkLoading(true);
  await validate();

  await updateApiResources(request.id, request);
  changeOkLoading(false);
  message.success('编辑成功');
  closeModal();
}

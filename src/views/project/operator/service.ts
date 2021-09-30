import { FormSchema } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table';
import moment from 'moment';

import { message } from 'ant-design-vue';
import { useLoading } from '/@/components/Loading';
// import { PagedListInput, PagedListOutput, ListOutput } from '../../../api/sys/model/basicModel';
import { pagedList, create, remove, update, activate } from '/@/api/project/operator';
import { all } from '/@/api/project/hospital';
import { any } from 'vue-types';

const [openFullLoading, closeFullLoading] = useLoading({
  tip: 'Loading...',
});

export const tableColumns: BasicColumn[] = [
  {
    title: '姓名',
    dataIndex: 'userName',
    sorter: true,
  },
  {
    title: '手机',
    dataIndex: 'phone',
    sorter: true,
  },
  {
    title: '医院',
    dataIndex: 'hospital',
    sorter: false,
  },
  {
    title: '部门',
    dataIndex: 'department',
    sorter: false,
  },
  {
    title: '角色',
    dataIndex: 'roleName',
    sorter: false,
  },
  {
    title: '审核',
    dataIndex: 'isActivate',
    sorter: false,
    slots: { customRender: 'isActivate' },
  },
  {
    title: '城市',
    dataIndex: 'cityType',
    sorter: false,
    slots: { customRender: 'cityType' },
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
    field: 'userName',
    component: 'Input',
    label: '姓名',
    componentProps: {
      placeholder: '请输入姓名',
    },
    required: true,
    labelWidth: 70,
    colProps: {
      span: 24,
    },
  },
  {
    field: 'phone',
    component: 'Input',
    label: '手机',
    componentProps: {
      placeholder: '请输入手机号',
    },
    required: true,
    labelWidth: 70,
    colProps: {
      span: 24,
    },
  },
  {
    field: 'discount',
    component: 'Switch',
    label: '折扣权限',
    required: false,
    labelWidth: 70,
    colProps: {
      span: 24,
    },
  },
  {
    field: 'hospital',
    component: 'Select',
    label: '医院',
    componentProps: {
      options: (await all()).map(function (i) {
        return {
          label: i.name,
          value: i.name,
          key: i.name,
        };
      }),
    },
    required: true,
    labelWidth: 70,
    colProps: {
      span: 24,
    },
  },
  {
    field: 'department',
    component: 'Input',
    label: '部门',
    componentProps: {
      placeholder: '请输入部门',
    },
    required: true,
    labelWidth: 70,
    colProps: {
      span: 24,
    },
  },
  {
    field: 'roleName',
    component: 'Select',
    label: '角色',
    componentProps: {
      options: [
        {
          label: '医生',
          value: '医生',
          key: '医生',
        },
        {
          label: '业务员',
          value: '业务员',
          key: '业务员',
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
    field: 'cityType',
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

export async function activateAsync(ids: any[], reload: Function) {
  if (!ids.length) {
    message.warn('请选中行');
    return;
  }
  await activate(ids);
  message.success('审核成功');
  reload();
}

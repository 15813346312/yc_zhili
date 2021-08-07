import { FormSchema } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table';
import {
  getUserPagedList,

} from '/@/api/sys/user';

export const tableColumns: BasicColumn[] = [
  {
    title: '姓名',
    dataIndex: 'name',
    sorter: true,
  },
  {
    title: '用户名',
    dataIndex: 'userName',
    sorter: true,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    sorter: true,
  },
  {
    title: '电话',
    dataIndex: 'phoneNumber',
    sorter: true,
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
    colProps: { span: 12 },
  },
];




/**
 * 分页列表
 * @param params
 * @returns
 */
export async function getTableListAsync(params: any): Promise<any | undefined> {
  params.skipCount = (params.page - 1) * params.maxResultCount;
  const result = await getUserPagedList(params);
  return result;
  //return GetUserListApi(params);
}

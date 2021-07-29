import { FormSchema } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table';
import moment from 'moment';

import { message } from 'ant-design-vue';
import { useLoading } from '/@/components/Loading';
// import { PagedListInput, PagedListOutput, ListOutput } from '../../../api/sys/model/basicModel';
import { deleteSecurityLog, getSecurityLog, getSecurityLogPagedList } from '/@/api/sys/securitylog';
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
    title: '服务',
    dataIndex: 'identity',
    sorter: true,
  },
  {
    title: 'ClientId',
    dataIndex: 'clientId',
    sorter: true,
  },
  {
    title: 'IP',
    dataIndex: 'clientIpAddress',
    sorter: true,
  },
  {
    title: '租户',
    dataIndex: 'tenantName',
    sorter: true,
  },
  {
    title: '用户名',
    dataIndex: 'userName',
    sorter: true,
  },
  {
    title: '操作',
    dataIndex: 'action',
    sorter: true,
  },
  {
    title: '浏览器',
    dataIndex: 'browserInfo',
    sorter: true,
  },

  {
    title: '执行时间',
    dataIndex: 'executionTime',
    customRender: ({ text }) => {
      return moment(text).format('YYYY-MM-DD HH:mm');
    },
    sorter: true,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'userName',
    label: '用户名',
    subLabel: '',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'clientId',
    label: 'ClientId',
    subLabel: '',
    component: 'Input',
    colProps: { span: 6 },
  },

  {
    field: 'ActionName',
    label: '操作',
    subLabel: '',
    component: 'Select',
    componentProps: {
      options: [
        { label: 'LoginSucceeded', value: 'LoginSucceeded' },
        { label: 'Logout', value: 'Logout' },
        { label: 'LoginFailed', value: 'LoginFailed' },
      ],
    },
    colProps: { span: 6 },
  },
];

/**
 * 分页列表
 * @param params
 * @returns
 */
export async function getTableListAsync(params: any): Promise<any | undefined> {
  params.skipCount = (params.page - 1) * params.maxResultCount;
  const result = await getSecurityLogPagedList(params);
  return result;
  //return GetUserListApi(params);
}

/**
 * 删除
 * @param param0
 */
export async function deleteSecurityLogAsync({ id, reload }) {
  try {
    openFullLoading();
    await deleteSecurityLog(id);
    closeFullLoading();
    message.success('删除成功');
    reload();
  } catch (error) {
    closeFullLoading();
  }
}

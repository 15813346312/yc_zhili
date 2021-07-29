import { FormSchema } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table';
import moment from 'moment';

import { message } from 'ant-design-vue';
import { useLoading } from '/@/components/Loading';
// import { PagedListInput, PagedListOutput, ListOutput } from '../../../api/sys/model/basicModel';
import { deleteAuditLog, getAuditLog, getAuditLogPagedList } from '/@/api/sys/auditlog';
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
    dataIndex: 'applicationName',
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
    title: '用户名',
    dataIndex: 'userName',
    sorter: true,
  },
  {
    title: '路由',
    dataIndex: 'url',
    sorter: true,
  },
  {
    title: '浏览器',
    dataIndex: 'browserInfo',
    sorter: true,
  },
  {
    title: 'httpMethod',
    dataIndex: 'httpMethod',
    sorter: true,
  },
  {
    title: '请求状态',
    dataIndex: 'httpStatusCode',
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
    field: 'applicationName',
    label: '服务',
    subLabel: '',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'httpMethod',
    label: 'HttpMethod',
    subLabel: '',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'httpStatusCode',
    label: '请求状态',
    subLabel: '',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'hasException',
    label: '包含错误',
    subLabel: '',
    component: 'Select',
    componentProps: {
      options: [
        { label: '不包含', value: 'false' },
        { label: '包含', value: 'true' },
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
  const result = await getAuditLogPagedList(params);
  return result;
  //return GetUserListApi(params);
}

/**
 * 删除
 * @param param0
 */
export async function deleteAuditLogAsync({ id, reload }) {
  try {
    openFullLoading();
    await deleteAuditLog(id);
    closeFullLoading();
    message.success('删除成功');
    reload();
  } catch (error) {
    closeFullLoading();
  }
}

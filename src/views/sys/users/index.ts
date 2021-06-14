import { FormSchema } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table';
import moment from 'moment';

import {
  UserServiceProxy,
  RoleServiceProxy,
  UserLookupServiceProxy,
  PagedResultDto_1OfOfIdentityUserDtoAndContractsAnd_0AndCulture_neutralAndPublicKeyToken_null,
  ListResultDto_1OfOfIdentityRoleDtoAndContractsAnd_0AndCulture_neutralAndPublicKeyToken_null,
} from '/@/services/IdentityServiceProxies';
import { message } from 'ant-design-vue';
import { useLoading } from '/@/components/Loading';

import { useI18n } from '/@/hooks/web/useI18n';
const { t } = useI18n();
const [openFullLoading, closeFullLoading] = useLoading({
  tip: 'Loading...',
});

export const tableColumns: BasicColumn[] = [
  {
    title: t('routes.admin.userManagement_name'),
    dataIndex: 'name',
  },
  {
    title: t('routes.admin.userManagement_userName'),
    dataIndex: 'userName',
  },
  {
    title: t('routes.admin.userManagement_email'),
    dataIndex: 'email',
  },
  {
    title: t('routes.admin.userManagement_phone'),
    dataIndex: 'phoneNumber',
  },
  {
    title: t('routes.admin.userManagement_locked'),
    dataIndex: 'lockoutEnabled',
    slots: { customRender: 'lockoutEnabled' },
  },
  {
    title: t('routes.admin.userManagement_createTime'),
    dataIndex: 'creationTime',
    customRender: ({ text }) => {
      return moment(text).format('YYYY-MM-DD HH:mm:ss');
    },
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
    label: t('routes.admin.userManagement_name'),
    required: true,
    labelWidth: 70,
    colProps: {
      span: 12,
    },
  },
  {
    field: 'userName',
    component: 'Input',
    label: t('routes.admin.userManagement_userName'),
    labelWidth: 70,
    required: true,
    colProps: {
      span: 12,
    },
  },
  {
    field: 'email',
    component: 'Input',
    label: t('routes.admin.userManagement_email'),
    required: true,
    labelWidth: 70,
    colProps: {
      span: 12,
    },
  },
  {
    field: 'password',
    component: 'InputPassword',
    label: t('routes.admin.userManagement_password'),
    required: true,
    labelWidth: 70,
    colProps: {
      span: 12,
    },
  },
  {
    field: 'phoneNumber',
    component: 'Input',
    label: '手机',
    required: true,
    labelWidth: 70,
    colProps: {
      span: 12,
    },
  },
  {
    field: 'lockoutEnabled',
    component: 'Switch',
    label: '是否锁定',
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
    label: t('routes.admin.userManagement_name'),
    required: true,
    labelWidth: 70,
    colProps: {
      span: 12,
    },
  },
  {
    field: 'userName',
    component: 'Input',
    label: t('routes.admin.userManagement_userName'),
    labelWidth: 70,
    required: true,
    colProps: {
      span: 12,
    },
  },
  {
    field: 'email',
    component: 'Input',
    label: t('routes.admin.userManagement_email'),
    required: true,
    labelWidth: 70,
    colProps: {
      span: 12,
    },
  },
  {
    field: 'phoneNumber',
    component: 'Input',
    label: '手机',
    required: true,
    labelWidth: 70,
    colProps: {
      span: 12,
    },
  },
  {
    field: 'lockoutEnabled',
    component: 'Switch',
    label: '是否锁定',
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
export async function getTableListAsync(
  params: any
): Promise<
  | PagedResultDto_1OfOfIdentityUserDtoAndContractsAnd_0AndCulture_neutralAndPublicKeyToken_null
  | undefined
> {
  const _userServiceProxy = new UserServiceProxy();
  const skipCount = (params.pageIndex - 1) * params.pageSize;
  return _userServiceProxy.usersGet(params.filter, '', skipCount, params.pageSize);
  //return GetUserListApi(params);
}

/**
 * 获取用户角色
 * @param userId
 * @returns
 */
export async function getRolesByUserIdAsync(
  userId: string
): Promise<ListResultDto_1OfOfIdentityRoleDtoAndContractsAnd_0AndCulture_neutralAndPublicKeyToken_null> {
  const _userServiceProxy = new UserServiceProxy();
  return _userServiceProxy.rolesGet(userId);
}

/**
 * 获取所有角色
 * @returns
 */
export async function getAllRoleAsync(): Promise<ListResultDto_1OfOfIdentityRoleDtoAndContractsAnd_0AndCulture_neutralAndPublicKeyToken_null> {
  const _roleServiceProxy = new RoleServiceProxy();
  return _roleServiceProxy.all();
}

/**
 * 创建用户
 * @param param0
 */
export async function createUserAsync({
  request,
  changeOkLoading,
  validate,
  closeModal,
  resetFields,
}) {
  changeOkLoading(true);
  await validate();
  const _userServiceProxy = new UserServiceProxy();
  await _userServiceProxy.usersPost(request);
  changeOkLoading(false);
  message.success(t('common.operationSuccess'));
  resetFields();
  closeModal();
}

/**
 * 删除用户
 * @param param0
 */
export async function deleteUserAsync({ userId, reload }) {
  try {
    const _userServiceProxy = new UserServiceProxy();
    openFullLoading();
    await _userServiceProxy.usersDelete(userId);
    closeFullLoading();
    message.success(t('common.operationSuccess'));
    reload();
  } catch (error) {
    closeFullLoading();
  }
}

/**
 * 编辑用户
 * @param param0
 */
export async function updateUserAsync({ request, changeOkLoading, validate, closeModal }) {
  changeOkLoading(true);
  await validate();
  const _userServiceProxy = new UserServiceProxy();
  await _userServiceProxy.usersPut(request.userId, request.userInfo);
  changeOkLoading(false);
  message.success(t('common.operationSuccess'));
  closeModal();
}

/**
 * 启用或者禁用用户
 * @param isLock
 * @returns
 */
export async function lockUserAsync(request: any): Promise<void> {
  const _userServiceProxy = new UserLookupServiceProxy();
  await _userServiceProxy.lookup(request.userId);
}

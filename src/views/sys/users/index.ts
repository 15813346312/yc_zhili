import { FormSchema } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table';
import moment from 'moment';
import {
  deleteUserClaims,
  createUserClaims,
  updateUserClaims,
  getUserClaims,
} from '/@/api/sys/userClaims';
import { message } from 'ant-design-vue';
import { useLoading } from '/@/components/Loading';
// import { PagedListInput, PagedListOutput, ListOutput } from '../../../api/sys/model/basicModel';
import {
  getUserPagedList,
  getUserRole,
  createUser,
  deleteUser,
  updateUser,
  getUser,
} from '/@/api/sys/user';
import { getRoleListAll } from '/@/api/sys/role';
import { useI18n } from '/@/hooks/web/useI18n';
const { t } = useI18n();
const [openFullLoading, closeFullLoading] = useLoading({
  tip: 'Loading...',
});

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
  // {
  //   title: '是否锁定',
  //   dataIndex: 'lockoutEnabled',
  //   slots: { customRender: 'lockoutEnabled' },
  // },
  {
    title: '创建时间',
    dataIndex: 'creationTime',
    customRender: ({ text }) => {
      return moment(text).format('YYYY-MM-DD HH:mm');
    },
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
    colProps: { span: 6 },
  },
];

export const createFormSchema: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '姓名',
    required: true,
    componentProps: {
      placeholder: '请输入姓名',
    },
    labelWidth: 70,
    colProps: {
      span: 12,
    },
  },
  {
    field: 'userName',
    component: 'Input',
    label: '用户名',
    componentProps: {
      placeholder: '请输入用户名',
    },
    labelWidth: 70,
    required: true,
    colProps: {
      span: 12,
    },
  },
  {
    field: 'email',
    component: 'Input',
    label: '邮箱',
    componentProps: {
      placeholder: '请输入邮箱',
    },
    required: true,
    labelWidth: 70,
    colProps: {
      span: 12,
    },
  },
  {
    field: 'password',
    component: 'InputPassword',
    label: '密码',
    componentProps: {
      placeholder: '请输入密码',
    },
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
    componentProps: {
      placeholder: '请输入手机',
    },
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
    label: '姓名',
    componentProps: {
      placeholder: '请输入姓名',
    },
    required: true,
    labelWidth: 70,
    colProps: {
      span: 12,
    },
  },
  {
    field: 'userName',
    component: 'Input',
    label: '用户名',
    componentProps: {
      placeholder: '请输入用户名',
    },
    labelWidth: 70,
    required: true,
    colProps: {
      span: 12,
    },
  },
  {
    field: 'email',
    component: 'Input',
    label: '邮箱',
    componentProps: {
      placeholder: '请输入邮箱',
    },
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
    componentProps: {
      placeholder: '请输入手机',
    },
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

export const reSetFormSchema: FormSchema[] = [
  {
    field: 'password',
    component: 'InputPassword',
    label: '密码',
    componentProps: {
      placeholder: '请输入密码',
    },
    required: true,
    labelWidth: 70,
    colProps: {
      span: 24,
    },
  },
  {
    field: 'confirmPassword',
    component: 'InputPassword',
    label: '确认密码',
    componentProps: {
      placeholder: '请输入确认密码',
    },
    required: true,
    dynamicRules: ({ values }) => {
      return [
        {
          required: true,
          validator: (_, value) => {
            if (!value) {
              return Promise.reject('密码不能为空');
            }
            if (value !== values.password) {
              return Promise.reject('两次输入的密码不一致!');
            }
            return Promise.resolve();
          },
        },
      ];
    },
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
  const result = await getUserPagedList(params);
  return result;
  //return GetUserListApi(params);
}

/**
 * 获取用户角色
 * @param userId
 * @returns
 */
export async function getRolesByUserIdAsync(userId: string): Promise<any> {
  return await getUserRole(userId);
}

/**
 * 获取所有角色
 * @returns
 */
export async function getAllRoleAsync(): Promise<any> {
  return await getRoleListAll();
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
  await createUser(request);
  changeOkLoading(false);
  message.success('新增成功');
  resetFields();
  closeModal();
}

/**
 * 删除用户
 * @param param0
 */
export async function deleteUserAsync({ userId, reload }) {
  try {
    openFullLoading();
    await deleteUser(userId);
    closeFullLoading();
    message.success('删除成功');
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

  await updateUser(request.id, request);
  changeOkLoading(false);
  message.success('编辑成功');
  closeModal();
}

/**
 * 启用或者禁用用户
 * @param isLock
 * @returns
 */
export async function lockUserAsync(request: any): Promise<void> {
  // const _userServiceProxy = new UserLookupServiceProxy();
  // await _userServiceProxy.lookup(request.userId);
}

export async function getUserAsync(id: string) {
  console.log(id);
  return await getUser(id);
}

/**
 * 创建
 * @param param0
 */
export async function createUserClaimsAsync(id, request) {
  await createUserClaims(id, request);
  // changeOkLoading(false);

  message.success('新增成功');
}

/**
 *
 * @param params
 * @returns
 */
export function getUserClaimsAsync(id: string): Promise<any | undefined> {
  const result = getUserClaims(id);
  return result;
}

/**
 * 删除
 * @param param0
 */
export async function deleteUserClaimsAsync(id: string, params: any) {
  try {
    //openFullLoading();

    await deleteUserClaims(id, { claimType: params.claimType, claimValue: params.claimValue });
    // closeFullLoading();
    message.success('删除成功');
  } catch (error) {
    closeFullLoading();
  }
}

/**
 * 编辑
 * @param param0
 */
export async function updateUserClaimsAsync(id, request) {
  await updateUserClaims(id, request);

  message.success('编辑成功');
}

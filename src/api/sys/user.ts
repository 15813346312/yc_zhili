import { defHttp } from '/@/utils/http/axios';
import { LoginParams } from './model/userModel';
import { useGlobSetting } from '/@/hooks/setting/index';
import { ErrorMessageMode } from '/@/utils/http/axios/types';
const globSetting = useGlobSetting();
enum Api {
  Login = '/connect/token',
  GetConfiguration = '/api/abp/application-configuration',
  BasicUserUrl = '/api/identity/users',
}

/**
 * @description: user login api
 * 登录
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  // console.log(globSetting.authUrl);
  // console.log(globSetting.apiUrl);
  return defHttp.post<any>(
    {
      baseURL: globSetting.authUrl,
      url: Api.Login,
      params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description: getConfiguration
 * 登录获取权限
 */
export function getConfiguration() {
  return defHttp.get<any>({ baseURL: globSetting.apiUrl, url: Api.GetConfiguration });
}

/**
 * @description: getUserPagedList
 * 用户分页
 */
export function getUserPagedList(params: any, mode: ErrorMessageMode = 'modal') {
  return defHttp.get<any>(
    {
      baseURL: globSetting.apiUrl,
      url: Api.BasicUserUrl,
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description: getUser
 * 用户获取单行
 */
export function getUser(id: string, mode: ErrorMessageMode = 'modal') {
  return defHttp.get<any>(
    {
      baseURL: globSetting.apiUrl,
      url: `${Api.BasicUserUrl}/${id}`,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description: deleteUser
 * 删除用户
 */
export function deleteUser(id: string, mode: ErrorMessageMode = 'modal') {
  return defHttp.delete<any>(
    {
      baseURL: globSetting.apiUrl,
      url: `${Api.BasicUserUrl}/${id}`,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description: createUser
 * 创建用户
 */
export function createUser(params: any, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<any>(
    {
      baseURL: globSetting.apiUrl,
      url: Api.BasicUserUrl,
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description: updateUser
 * 修改用户
 */
export function updateUser(id: string, params: any, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<any>(
    {
      baseURL: globSetting.apiUrl,
      url: `${Api.BasicUserUrl}/${id}`,
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description: getUserRole
 * 获取用户角色
 */
export function getUserRole(id: string, mode: ErrorMessageMode = 'modal') {
  return defHttp.get<any>(
    {
      baseURL: globSetting.apiUrl,
      url: `${Api.BasicUserUrl}/${id}/roles`,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description: updateUser
 * 修改用户角色
 */
export function updateUserRole(params: any, mode: ErrorMessageMode = 'modal') {
  return defHttp.put<any>(
    {
      baseURL: globSetting.apiUrl,
      url: `${Api.BasicUserUrl}/${params.id}/roles`,
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

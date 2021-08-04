import { defHttp } from '/@/utils/http/axios';
import { useGlobSetting } from '/@/hooks/setting/index';
import { ErrorMessageMode } from '/@/utils/http/axios/types';
import { qs } from 'qs';
const globSetting = useGlobSetting();
enum Api {
  BasicUrl = '/api/identity/users',
}

/**
 * @description:
 * 获取单行
 */
export function getUserClaims(id: string, mode: ErrorMessageMode = 'modal') {
  return defHttp.get<any>(
    {
      baseURL: globSetting.apiUrl,
      url: `${Api.BasicUrl}/${id}/claims`,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description:
 * 删除
 */
export function deleteUserClaims(id: string, params: any, mode: ErrorMessageMode = 'modal') {
  return defHttp.delete<any>(
    {
      baseURL: globSetting.apiUrl,
      url: `${Api.BasicUrl}/${id}/claims`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description:
 * 创建
 */
export function createUserClaims(id: string, params: any, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<any>(
    {
      baseURL: globSetting.apiUrl,
      url: `${Api.BasicUrl}/${id}/claims`,
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description:
 * 修改
 */
export function updateUserClaims(id: string, params: any, mode: ErrorMessageMode = 'modal') {
  return defHttp.put<any>(
    {
      baseURL: globSetting.apiUrl,
      url: `${Api.BasicUrl}/${id}/claims`,
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

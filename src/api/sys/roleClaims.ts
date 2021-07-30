import { defHttp } from '/@/utils/http/axios';
import { useGlobSetting } from '/@/hooks/setting/index';
import { ErrorMessageMode } from '/@/utils/http/axios/types';
const globSetting = useGlobSetting();
enum Api {
  BasicUrl = '/api/identity/roles',
}

/**
 * @description:
 * 获取单行
 */
export function getRoleClaims(id: string, mode: ErrorMessageMode = 'modal') {
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
export function deleteRoleClaims(id: string, mode: ErrorMessageMode = 'modal') {
  return defHttp.delete<any>(
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
 * 创建
 */
export function createRoleClaims(id: string, params: any, mode: ErrorMessageMode = 'modal') {
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
export function updateRoleClaims(id: string, params: any, mode: ErrorMessageMode = 'modal') {
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

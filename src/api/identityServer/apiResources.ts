import { defHttp } from '/@/utils/http/axios';
import { useGlobSetting } from '/@/hooks/setting/index';
import { ErrorMessageMode } from '/@/utils/http/axios/types';
const globSetting = useGlobSetting();
enum Api {
  BasicUrl = '/api/identity-server/api-resources',
}

/**
 * @description:
 * 分页
 */
export function getApiResourcesList(params: any, mode: ErrorMessageMode = 'modal') {
  return defHttp.get<any>(
    {
      baseURL: globSetting.apiUrl,
      url: `/api/identity-server/apiScopes/all`,
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description:
 * 分页
 */
export function getApiResourcesPagedList(params: any, mode: ErrorMessageMode = 'modal') {
  return defHttp.get<any>(
    {
      baseURL: globSetting.apiUrl,
      url: Api.BasicUrl,
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description:
 * 获取单行
 */
export function getApiResources(id: string, mode: ErrorMessageMode = 'modal') {
  return defHttp.get<any>(
    {
      baseURL: globSetting.apiUrl,
      url: `${Api.BasicUrl}/${id}`,
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
export function deleteApiResources(id: string, mode: ErrorMessageMode = 'modal') {
  return defHttp.delete<any>(
    {
      baseURL: globSetting.apiUrl,
      url: `${Api.BasicUrl}/${id}`,
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
export function createApiResources(params: any, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<any>(
    {
      baseURL: globSetting.apiUrl,
      url: Api.BasicUrl,
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
export function updateApiResources(id: string, params: any, mode: ErrorMessageMode = 'modal') {
  return defHttp.put<any>(
    {
      baseURL: globSetting.apiUrl,
      url: `${Api.BasicUrl}/${id}`,
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

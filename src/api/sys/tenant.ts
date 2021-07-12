import { defHttp } from '/@/utils/http/axios';
import { useGlobSetting } from '/@/hooks/setting/index';
import { ErrorMessageMode } from '/@/utils/http/axios/types';
const globSetting = useGlobSetting();
enum Api {
  BasicUrl = '/api/multi-tenancy/tenants',
}

/**
 * @description:
 * 分页
 */
export function getTenantPagedList(params: any, mode: ErrorMessageMode = 'modal') {
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
export function getTenant(id: string, mode: ErrorMessageMode = 'modal') {
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
export function deleteTenant(id: string, mode: ErrorMessageMode = 'modal') {
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
export function createTenant(params: any, mode: ErrorMessageMode = 'modal') {
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
export function updateTenant(id: string, params: any, mode: ErrorMessageMode = 'modal') {
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

/**
 * @description:
 * 修改
 */
export function updateTenantConnection(
  id: string,
  defaultConnectionString: string,
  mode: ErrorMessageMode = 'modal'
) {
  return defHttp.put<any>(
    {
      baseURL: globSetting.apiUrl,
      url: `${Api.BasicUrl}/${id}/default-connection-string?defaultConnectionString=${defaultConnectionString}`,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description:
 * 获取
 */
export function getTenantConnection(id: string, mode: ErrorMessageMode = 'modal') {
  return defHttp.get<any>(
    {
      baseURL: globSetting.apiUrl,
      url: `${Api.BasicUrl}/${id}/default-connection-string`,
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
export function deleteTenantConnection(id: string, mode: ErrorMessageMode = 'modal') {
  return defHttp.delete<any>(
    {
      baseURL: globSetting.apiUrl,
      url: `${Api.BasicUrl}/${id}/default-connection-string`,
    },
    {
      errorMessageMode: mode,
    }
  );
}

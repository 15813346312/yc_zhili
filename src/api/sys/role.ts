import { defHttp } from '/@/utils/http/axios';
import { useGlobSetting } from '/@/hooks/setting/index';
import { ErrorMessageMode } from '/@/utils/http/axios/types';
const globSetting = useGlobSetting();
enum Api {
  BasicUrl = '/api/identity/roles',
}

/**
 * @description: getUserPagedList
 * 角色分页
 */
export function getRolePagedList(params: any, mode: ErrorMessageMode = 'modal') {
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
 * @description: getRoleListAll
 * 获取全部角色
 */
export function getRoleListAll(mode: ErrorMessageMode = 'modal') {
  return defHttp.get<any>(
    {
      baseURL: globSetting.apiUrl,
      url: `${Api.BasicUrl}/all`,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description: getRole
 * 获取单行
 */
export function getRole(id: string, mode: ErrorMessageMode = 'modal') {
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
 * @description: deleteRole
 * 删除
 */
export function deleteRole(id: string, mode: ErrorMessageMode = 'modal') {
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
 * @description: createRole
 * 创建
 */
export function createRole(params: any, mode: ErrorMessageMode = 'modal') {
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
 * @description: updateRole
 * 修改
 */
export function updateRole(params: any, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<any>(
    {
      baseURL: globSetting.apiUrl,
      url: `${Api.BasicUrl}/${params.id}`,
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

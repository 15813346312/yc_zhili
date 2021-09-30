import { defHttp } from '/@/utils/http/axios';
import { useGlobSetting } from '/@/hooks/setting/index';
import { ErrorMessageMode } from '/@/utils/http/axios/types';
const globSetting = useGlobSetting();
enum Api {
  BasicUrl = '/api/zhiLiManagement/hospital',
}

/**
 * @description: pagedList
 * 分页
 */
export function pagedList(params: any, mode: ErrorMessageMode = 'modal') {
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
 * @description: all
 * 获取全部角色
 */
export function all(mode: ErrorMessageMode = 'modal') {
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
 * @description: get
 * 获取单行
 */
export function get(id: string, mode: ErrorMessageMode = 'modal') {
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
 * @description: remove
 * 删除
 */
export function remove(id: string, mode: ErrorMessageMode = 'modal') {
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
export function create(params: any, mode: ErrorMessageMode = 'modal') {
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
 * @description: update
 * 修改
 */
export function update(id: string, params: any, mode: ErrorMessageMode = 'modal') {
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

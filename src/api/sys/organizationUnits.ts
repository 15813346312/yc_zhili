import { defHttp } from '/@/utils/http/axios';
import { useGlobSetting } from '/@/hooks/setting/index';
import { ErrorMessageMode } from '/@/utils/http/axios/types';
const globSetting = useGlobSetting();
enum Api {
  BasicUrl = '/api/identity/organization-units',
}

//创建组织机构
export function createOrganizationUnitAsync(params: any, mode: ErrorMessageMode = 'modal') {
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

//修改组织机构
export function updateOrganizationUnitAsync(
  id: string,
  params: any,
  mode: ErrorMessageMode = 'modal'
) {
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

//删除组织机构
export function deleteOrganizationUnitAsync(id: string, mode: ErrorMessageMode = 'modal') {
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

//获取单行组织机构
export function getOrganizationUnitAsync(id: string, mode: ErrorMessageMode = 'modal') {
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

//获取全部组织机构
export function getAllListAsync(mode: ErrorMessageMode = 'modal') {
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

//移动组织机构
export function moveAsync(id: string, params: any, mode: ErrorMessageMode = 'modal') {
  return defHttp.put<any>(
    {
      baseURL: globSetting.apiUrl,
      url: `${Api.BasicUrl}/${id}/move`,
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

//获取单行组织机构
export function getOrganizationUnitUserAsync(id: string, mode: ErrorMessageMode = 'modal') {
  return defHttp.get<any>(
    {
      baseURL: globSetting.apiUrl,
      url: `${Api.BasicUrl}/${id}/users`,
    },
    {
      errorMessageMode: mode,
    }
  );
}

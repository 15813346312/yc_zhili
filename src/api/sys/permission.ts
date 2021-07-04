import { defHttp } from '/@/utils/http/axios';
import { useGlobSetting } from '/@/hooks/setting/index';
import { ErrorMessageMode } from '/@/utils/http/axios/types';
const globSetting = useGlobSetting();
enum Api {
  BasicUrl = '/api/permission-management/permissions',
}

/**
 * @description:
 */
export function getPermissionsList(
  providerName: string,
  providerKey: string,
  mode: ErrorMessageMode = 'modal'
) {
  console.log(providerName);
  console.log(providerKey);

  return defHttp.get<any>(
    {
      baseURL: globSetting.apiUrl,
      url: `${Api.BasicUrl}?providerName=${providerName}&providerKey=${providerKey}`,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description:
 */
export function updatePermissions(
  providerName: string,
  providerKey: string,
  param: any,
  mode: ErrorMessageMode = 'modal'
) {
  return defHttp.put<any>(
    {
      baseURL: globSetting.apiUrl,
      url: `${Api.BasicUrl}?providerName=${providerName}&providerKey=${providerKey}`,
      data: param,
    },
    {
      errorMessageMode: mode,
    }
  );
}

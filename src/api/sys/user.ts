import { defHttp } from '/@/utils/http/axios';
import { LoginParams, LoginResultModel, GetUserInfoModel } from './model/userModel';
import { useGlobSetting } from '/@/hooks/setting/index';
import { ErrorMessageMode } from '/@/utils/http/axios/types';
const globSetting = useGlobSetting();
enum Api {
  Login = '/connect/token',
  // GetUserInfo = '/getUserInfo',
  GetConfiguration = '/api/abp/application-configuration',
}

/**
 * @description: user login api
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
 * @description: getUserInfo
 */
export function getConfiguration() {
  return defHttp.get<any>({ baseURL: globSetting.apiUrl, url: Api.GetConfiguration });
}

// export function getPermCode() {
//   return defHttp.get<string[]>({ url: Api.GetPermCode });
// }

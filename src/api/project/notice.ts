import { defHttp } from '/@/utils/http/axios';
import { useGlobSetting } from '/@/hooks/setting/index';
import { ErrorMessageMode } from '/@/utils/http/axios/types';
const globSetting = useGlobSetting();
enum Api {
  BasicUrl = '/api/zhiLiManagement/notice',
}

/**
 * @description: get
 * 获取单行
 */
export function get( mode: ErrorMessageMode = 'modal') {
  return defHttp.get<any>(
    {
      baseURL: globSetting.apiUrl,
      url: `${Api.BasicUrl}`,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description: save
 * 创建
 */
export function save(params: any, mode: ErrorMessageMode = 'modal') {
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

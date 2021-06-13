import { useMessage } from '/@/hooks/web/useMessage';
import { useI18n } from '/@/hooks/web/useI18n';
// import router from '/@/router';
// import { PageEnum } from '/@/enums/pageEnum';
import { useUserStoreWidthOut } from '/@/store/modules/user';

const { createMessage } = useMessage();

const error = createMessage.error!;
export function checkStatus(status: number, msg: any): void {
  console.log(status);
  console.log(msg);

  const { t } = useI18n();
  const userStore = useUserStoreWidthOut();
  switch (status) {
    case 400:
      error(`${msg}`);
      break;
    case 401:
      error(t('sys.api.errMsg401'));
      userStore.setToken(undefined);
      userStore.setSessionTimeout(true);
      break;
    case 403:
      error(`${msg}`);
      break;
    // 404请求不存在
    case 404:
      error(`未找到服务`);
      break;
    case 405:
      error(`${msg}`);
      break;
    case 408:
      error(`${msg}`);
      break;
    case 500:
      error(`${msg}`);
      break;
    case 501:
      error(`${msg}`);
      break;
    case 502:
      error(`${msg}`);
      break;
    case 503:
      error(`${msg}`);
      break;
    case 504:
      error(`${msg}`);
      break;
    case 505:
      error(`${msg}`);
      break;
    default:
  }
}

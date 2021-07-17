<template>

  <ScrollContainer>
    <div ref="wrapperRef"
         :class="prefixCls">
      <a-tabs tab-position="left"
              :tabBarStyle="tabBarStyle">
        <template v-for="item in settingList"
                  :key="item.key">
          <a-tab-pane :tab="item.name">
            <component :is="item.component" />
          </a-tab-pane>
        </template>
      </a-tabs>
    </div>
  </ScrollContainer>

</template>

<script lang="ts">
const settingList: any = [
  { key: '1', name: '本地化', component: 'Localization' },
  { key: '2', name: '密码', component: 'PassWordSetting' },
  { key: '3', name: '邮件', component: 'EmailSetting' },
  { key: '4', name: '短信', component: 'MessageSetting' },
  { key: '5', name: '微信小程序', component: 'WechatMiniProgramsSetting' },
  { key: '6', name: '文件存储', component: 'FileStore' },
];
import { defineComponent } from 'vue';
import { ScrollContainer } from '/@/components/Container/index';
import FileStore from './center/fileStore.vue';
import Localization from './center/localization.vue';
import PassWordSetting from './center/passWordSetting.vue';
import EmailSetting from './center/emailSetting.vue';
import MessageSetting from './center/messageSetting.vue';
import WechatMiniProgramsSetting from './center/wechatMiniProgramsSetting.vue';

export default defineComponent({
  components: {
    ScrollContainer,
    FileStore,
    Localization,
    PassWordSetting,
    EmailSetting,
    MessageSetting,
    WechatMiniProgramsSetting,
  },
  setup() {
    return {
      prefixCls: 'account-setting',
      settingList,
      tabBarStyle: {
        width: '120px',
      },
    };
  },
});
</script>
<style lang="less">
.account-setting {
  margin: 12px;
  background-color: @component-background;
  .base-title {
    padding-left: 0;
  }
  .ant-tabs-tab-active {
    background-color: @item-active-bg;
  }
}
</style>
<template>
  <BasicModal title="新增角色"
              :canFullscreen="false"
              @ok="submit"
              :width="680"
              @visible-change="visibleChange"
              @register="registerModal"
              :bodyStyle="{ 'padding-top': '0' }">

    <div style="padding: 0">
      <Tabs>
        <TabPane tab="信息"
                 key="1">
          <BasicForm @register="registerUserForm" />
        </TabPane>
        <TabPane tab="声明"
                 key="2">
        <div>
            <!-- <span v-for="(item,index) in claimTypeList" :key="index">{{item.name}}</span> -->
         <a-row>
      <a-col :span="12">
        <a-card title="拥有声明">
            <a-row>
               <a-button @click="remove(item,index)"  style="text-align:left;margin:10px;" type="primary"  v-for="(item,index) in nowClaimTypeList" :key="index" block>
              {{item}}
            </a-button>
            </a-row>
        </a-card>
      </a-col>
      <a-col :span="12">
           <a-card title="不拥有声明">
            <a-row>
               <a-button @click="add(item,index)" style="text-align:left;margin:10px;" type="danger"  v-for="(item,index) in claimTypeList" :key="index" block>
              {{item}}
            </a-button>
            </a-row>
           </a-card>
      </a-col>
    </a-row>
        </div>
        </TabPane>
      </Tabs>
    </div>

  </BasicModal>
</template>

<script lang="ts">
import { defineComponent, ref, useContext, defineEmit } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { BasicForm, useForm } from '/@/components/Form/index';
import { createFormSchema, createApiResourcesAsync } from './index.ts';
import { getClaimTypeList } from '/@/api/sys/identityClaimTypes';
import { Tabs } from 'ant-design-vue';
export default defineComponent({
  name: 'CreateApiResources',
  components: {
    BasicModal,
    BasicForm,
    Tabs,
    TabPane: Tabs.TabPane,
  },
  setup() {
    // 加载父组件方法
    defineEmit(['reload']);

    const ctx = useContext();
    const [registerModal, { changeOkLoading, closeModal }] = useModalInner();
    const [registerUserForm, { getFieldsValue, validate, resetFields }] = useForm({
      labelWidth: 120,
      schemas: createFormSchema,
      showActionButtonGroup: false,
    });
    const claimTypeList= ref<any>([]);
     const nowClaimTypeList= ref<any>([]);
    const visibleChange = async (visible: boolean) => {
      if (visible) {
        getClaimTypeList().then((res) => {
          res.items.forEach(item => {
               claimTypeList.value.push(item.name)
          });

        });
      } else {
        resetFields();
      }
    };
    const add =async(row,index)=>{
        nowClaimTypeList.value.push(row)
        claimTypeList.value.splice(index,1)
    }
      const remove =async(row,index)=>{
        claimTypeList.value.push(row)
        nowClaimTypeList.value.splice(index,1)
    }
    // 保存
    const submit = async () => {
      try {
        let request = getFieldsValue();
        await createApiResourcesAsync({
          request,
          changeOkLoading,
          validate,
          closeModal,
          resetFields,
        });
        ctx.emit('reload');
      } catch (error) {
        changeOkLoading(false);
      }
    };
    return {
      registerModal,
      registerUserForm,
      submit,
      visibleChange,
      claimTypeList,
      nowClaimTypeList,add,remove
    };
  },
});
</script>
<style lang="less" scoped>
.ant-checkbox-wrapper + .ant-checkbox-wrapper {
  margin-left: 0px;
}
</style>
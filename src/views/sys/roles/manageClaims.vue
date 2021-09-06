<template>
  <BasicDrawer @register="registerDrawer"
               title="管理声明"
               width="500px">
    <div>
      <a-row style="margin-bottom:10px;">
        <!-- <a-button type="primary"
                  >新增</a-button>
        <a-button @click="reloadTable">刷新</a-button> -->
        <a-button-group>
          <a-button type="primary"
                    @click="handleCreate">
            新增
          </a-button>
          <a-button @click="reloadTable"> 刷新

          </a-button>
        </a-button-group>

      </a-row>
      <div v-if="state.dataList.length>0">
        <a-row style="text-align:center;margin-bottom:10px;font-weight:bold;">
          <a-col :span="8">
            类型
          </a-col>
          <a-col :span="8">
            值
          </a-col>
          <a-col :span="8">
            操作
          </a-col>
        </a-row>
        <a-row v-for="item in state.dataList"
               :key="item.id"
               style="text-align:center;border-width:1px;line-height:30px;">
          <a-col :span="8">
            {{item.claimType}}
          </a-col>
          <a-col :span="8">
            {{item.claimValue}}
          </a-col>
          <a-col :span="8">

            <TableAction style="margin-left:30px;line-height:30px;"
                         :actions="[
            {
              label:'修改',
              onClick: handleEdit.bind(null, item),
            },
            {
             label:'删除',
              color: 'error',

              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, item),
              },

            },
          ]" />
          </a-col>
        </a-row>
      </div>
      <div v-else>
        <a-empty />
      </div>
    </div>
    <EditClaimsModel @register="registerEditClaimsModel"
                     @reloadTable="reloadTable"
                     :bodyStyle="{ 'padding-top': '0' }" />
    <CreateClaimsModel @register="registerCreateClaimsModel"
                       @reloadTable="reloadTable"
                       :bodyStyle="{ 'padding-top': '0' }" />
  </BasicDrawer>
</template>

<script lang="ts">
import { defineComponent, reactive, useContext, defineEmit } from 'vue';
import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
import EditClaimsModel from './editclaimsModel.vue';
import CreateClaimsModel from './createclaimsModel.vue';
import { getRoleClaimsAsync, deleteRoleClaimsAsync } from './index';
import { TableAction } from '/@/components/Table';
import { useModal } from '/@/components/Modal';
export default defineComponent({
  name: 'EditAbpUser',
  components: {
    BasicDrawer,
    TableAction,
    EditClaimsModel,
    CreateClaimsModel,
  },
  setup() {
    const [registerEditClaimsModel, { openModal: openEditClaimsModel }] = useModal();
    const [registerCreateClaimsModel, { openModal: openCreateClaimsModel }] = useModal();

    // 加载父组件方法
    defineEmit(['reload']);
    const state: any = reactive({
      dataList: [],
      record: null,
    });
    const [registerDrawer, { closeDrawer, setDrawerProps }] = useDrawerInner((data) => {
      state.record = data.record;
      getRoleClaimsAsync(data.record.id).then((res) => {
        state.dataList = res.items;
      });
    });

    // 编辑用户
    const handleEdit = async (record: Recordable) => {
      openEditClaimsModel(true, {
        id: state.record.id,
        record: record,
      });
    };
    const handleDelete = async (record: Recordable) => {
      deleteRoleClaimsAsync(state.record.id, record).then(() => {
        reloadTable();
      });
    };

    const reloadTable = async () => {
      getRoleClaimsAsync(state.record.id).then((res) => {
        state.dataList = res.items;
      });
    };
    const handleCreate = async () => {
      openCreateClaimsModel(true, {
        id: state.record.id,
        record: {
          claimType: '',
          claimValue: '',
        },
      });
    };

    return {
      registerDrawer,
      state,
      handleEdit,
      handleDelete,
      handleCreate,
      reloadTable,
      registerCreateClaimsModel,
      registerEditClaimsModel,
    };
  },
});
</script>
<style lang="less" scoped>
.ant-checkbox-wrapper + .ant-checkbox-wrapper {
  margin-left: 0px;
}
</style>
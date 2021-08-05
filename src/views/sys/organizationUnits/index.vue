<template>
  <PageWrapper title="组织机构管理">
    <div class="flex">
      <a-card class="w-1/6">
        <a slot="extra"
           @click="handlePlus(null)">
          添加根组织
        </a>
        <BasicTree toolbar
                   :treeData="tree2"
                   draggable
                   @dragenter="onDragEnter"
                   @drop="onDrop"
                   @select="selectChange"
                   :renderIcon="createIcon"
                   :actionList="actionList">
        </BasicTree>
      </a-card>
      <a-card class="w-1/1">
        <a-tabs default-active-key="1"
                @change="callback">
          <a-tab-pane key="1"
                      tab="成员">

            <BasicTable :columns="userColumns"
                        :dataSource="userData"
                        :loading="loading"
                        :api="api"
                        ref="tableRef"
                        :pagination="pagination"
                        :actionColumn="{width: 100, title: '操作', dataIndex: 'action', slots: { customRender: 'action'} }">
              <template #toolbar>
                <a-button type="primary"
                          v-auth="'AbpIdentity.OrganizationUnits.ManageUsers'"
                          @click="openCreateOrganizationUnitsUserModal">添加成员</a-button>
              </template>
              <template #action="{ record }">
                <TableAction :actions="[
            {
              label:'移除',
              color: 'error',
              auth:['AbpIdentity.OrganizationUnits.ManageUsers'],
              popConfirm: {
                title: '是否确认移除',
                confirm: handleDeleteUser.bind(null, record),
              },
            },
          ]" />
              </template>
            </BasicTable>

          </a-tab-pane>
          <a-tab-pane key="2"
                      tab="角色"
                      force-render>
            Content of Tab Pane 2
          </a-tab-pane>

        </a-tabs>
      </a-card>
      <CreateOrganizationUnits @register="registerCreateOrganizationUnitsModal"
                               @reload="loadTree"
                               :bodyStyle="{ 'padding-top': '0' }" />
    </div>

  </PageWrapper>
</template>
<script lang="ts">
import { defineComponent, h, ref } from 'vue';
import { BasicTree, ActionItem, TreeItem } from '/@/components/Tree/index';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import { PageWrapper } from '/@/components/Page';
import { useUserStore } from '/@/store/modules/user';
import CreateOrganizationUnits from './createOrganizationUnits.vue';
import { useModal } from '/@/components/Modal';
import { BasicTable, TableAction } from '/@/components/Table';
import {
  getAllListAsync,
  deleteOrganizationUnitAsync,
  moveAsync,
  getOrganizationUnitUserAsync,
} from '/@/api/sys/organizationUnits';
import { cloneDeep } from 'lodash-es';
import { message, Modal } from 'ant-design-vue';
export default defineComponent({
  components: { BasicTree, PageWrapper, CreateOrganizationUnits, BasicTable, TableAction },
  setup() {
    const userColumns = [
      {
        title: '用户名',
        dataIndex: 'userName',
      },
      {
        title: '姓名',
        dataIndex: 'name',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
      },
    ];

    const userData = ref<any>([]);
    const userStore = useUserStore();
    const [registerCreateOrganizationUnitsModal, { openModal: openCreateOrganizationUnitsModal }] =
      useModal();

    const tree2 = ref<TreeItem[]>([]);
    const basicTable = ref<any>([]);
    //初始化组织机构查询
    const loadTree = async () => {
      getAllListAsync().then((res) => {
        basicTable.value = res.items;
        var item = toTree(res.items);
        tree2.value = cloneDeep(item);
      });
    };
    //转成树结构
    const toTree = (table: any) => {
      let data = [];
      table.forEach((item1) => {
        data.push({ title: item1.displayName, key: item1.id, parentId: item1.parentId });
      });
      // 空数组
      let result: any = [];
      // 判断不是数组  直接返回
      if (!Array.isArray(data)) {
        return result;
      }
      // 遍历  删除  children 属性  做初始化操作
      data.forEach((item) => {
        delete item.children;
      });
      //  空对象
      let map = {};
      data.forEach((item) => {
        map[item.key] = item;
      });

      /**
       * map对象的 键: 是每个id  值：对应的item
       * 1: {id: 1, pid: 0, name: "body"}
       * 2: {id: 2, pid: 1, name: "title"}
       * 3: {id: 3, pid: 2, name: "div"}
       */
      data.forEach((item) => {
        // item.pid 为0时 返回underfined
        let parent = map[item.parentId];
        if (parent) {
          (parent.children || (parent.children = [])).push(item);
        } else {
          // 这里push的item是pid为0的数据
          result.push(item);
        }
      });
      return result;
    };
    //按钮权限
    const actionList: ActionItem[] = [
      {
        show: () => {
          let isShow = userStore.getRoleList.includes('AbpIdentity.OrganizationUnits.Create');
          return isShow;
        },
        render: (node) => {
          return h(PlusOutlined, {
            class: 'ml-2',
            onClick: () => {
              handlePlus(node);
            },
          });
        },
      },
      {
        show: () => {
          let isShow = userStore.getRoleList.includes('AbpIdentity.OrganizationUnits.Delete');
          return isShow;
        },
        render: (node) => {
          return h(DeleteOutlined, {
            class: 'ml-2',
            onClick: () => {
              handleDelete(node);
            },
          });
        },
      },
    ];

    //移动组织架构
    let moveId;
    const onDrop = (info) => {
      let isShow = userStore.getRoleList.includes('AbpIdentity.OrganizationUnits.Update');
      if (!isShow) {
        return;
      }
      let moveRow = basicTable.value.find((r) => r.id == moveId);
      let dropRow = basicTable.value.find((r) => r.id == info.dragNodesKeys[0]);
      if (dropRow.parentId === moveId) {
        return;
      }
      Modal.confirm({
        title: `是否将[${dropRow.displayName}]组织移动到[${moveRow.displayName}]?`,
        content: '',
        okText: '确认',
        okType: 'primary',
        cancelText: '取消',
        onOk() {
          moveAsync(dropRow.id, { parentId: moveId }).then(() => {
            message.success('操作成功');
            loadTree();
          });
        },
        onCancel() {},
      });
    };

    const onDragEnter = (info) => {
      moveId = info.node.eventKey;
    };
    //添加
    function handlePlus(node: any) {
      if (node === null) {
        //添加根组织
        openCreateOrganizationUnitsModal(true, { id: null });
      } else {
        openCreateOrganizationUnitsModal(true, { id: node.key });
      }
    }
    //删除
    function handleDelete(node: any) {
      Modal.confirm({
        title: '是否确认删除?',
        content: '',
        okText: '确认',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          deleteOrganizationUnitAsync(node.key).then(() => {
            message.success('删除成功');
            loadTree();
          });
        },
        onCancel() {},
      });
    }

    //设置图标
    function createIcon({ level }) {
      return 'ion:home';
      // if (level === 1) {
      //   return 'ion:git-compare-outline';
      // }
      // if (level === 2) {
      //   return 'ion:home';
      // }
      // if (level === 3) {
      //   return 'ion:airplane';
      // }
    }

    const pagination = ref<any>(false);
    const loading = ref(false);

    function selectChange(info) {
      // userData.value = getOrganizationUnitUserAsync(info[0]);

      pagination.value = { page: 1,  total: 100 };
      loading.value = true;
      getOrganizationUnitUserAsync(info[0]).then((res) => {
        console.log(res);
        userData.value = res.items;
        loading.value = false;
      });
    }
    //tab切换
    function callback(key) {
      console.log(key);
    }

    //移除组织用户
    function handleDeleteUser(record: Recordable) {
      console.log(record);
    }
    //打开添加成员弹窗
    function openCreateOrganizationUnitsUserModal() {
      console.log('打开添加成员弹窗');
    }
    return {
      onDragEnter,
      callback,
      onDrop,
      basicTable,
      createIcon,
      tree2,
      loadTree,
      handlePlus,
      handleDelete,
      actionList,
      registerCreateOrganizationUnitsModal,
      userColumns,
      userData,
      handleDeleteUser,
      openCreateOrganizationUnitsUserModal,
      selectChange,
      pagination,
      loading,
    };
  },
  created() {
    this.loadTree();
  },
});
</script>
<template>
  <PageWrapper title="声明类型">
    <BasicTable @register="registerTable">
      <template #form-custom> custom-slot </template>

      <template #toolbar>
        <a-button type="primary"
                  v-auth="'AbpIdentity.Users.ManageClaims'"
                  @click="openCreateApiResourcesesModal">新增</a-button>
      </template>

      <template #action="{ record }">

        <TableAction :actions="[
            {
              label:'编辑',
              auth:['AbpIdentity.Users.ManageClaims'],
              onClick: handleEdit.bind(null, record),

            },

            {
             label:'删除',
              color: 'error',
              auth:['AbpIdentity.Users.ManageClaims'],

              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },

            },
          ]" />
      </template>
    </BasicTable>
    <CreateApiResourceses @register="registerCreateApiResourcesesModal"
                          @reload="reload"
                          :bodyStyle="{ 'padding-top': '0' }" />
    <EditApiResourceses @register="registerEditApiResourcesesModal"
                        @reload="reload"
                        :bodyStyle="{ 'padding-top': '0' }" />

  </PageWrapper>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { BasicTable, useTable, TableAction } from '/@/components/Table';
import {
  tableColumns,
  getTableListAsync,
  deleteApiResourcesAsync,
  searchFormSchema,
} from './index.ts';
import { useModal } from '/@/components/Modal';
import CreateApiResourceses from './createApiResources.vue';
import EditApiResourceses from './editApiResources.vue';
import { PageWrapper } from '/@/components/Page';
// import { message } from 'ant-design-vue';
export default defineComponent({
  components: {
    BasicTable,
    TableAction,
    CreateApiResourceses,
    EditApiResourceses,
    PageWrapper,
  },
  setup() {
    const [registerCreateApiResourcesesModal, { openModal: openCreateApiResourcesesModal }] =
      useModal();
    const [registerEditApiResourcesesModal, { openModal: openEditApiResourcesesModal }] =
      useModal();

    const [registerTable, { reload }] = useTable({
      title: '',
      api: getTableListAsync,
      columns: tableColumns,
      useSearchForm: true,
      formConfig: {
        labelWidth: 120,
        schemas: searchFormSchema,
      },
      showTableSetting: true,
      rowSelection: { type: 'checkbox' },
      actionColumn: {
        width: 200,
        title: '操作',
        dataIndex: 'action',
        slots: {
          customRender: 'action',
        },
        fixed: 'right',
      },
    });
    // 编辑用户
    const handleEdit = (record: Recordable) => {
      openEditApiResourcesesModal(true, {
        record: record,
      });
    };

    // 删除用户
    const handleDelete = async (record: Recordable) => {
      await deleteApiResourcesAsync({ id: record.id, reload });
    };

    return {
      registerTable,
      registerCreateApiResourcesesModal,
      openCreateApiResourcesesModal,
      registerEditApiResourcesesModal,
      handleEdit,
      handleDelete,
      reload,
    };
  },
});
</script>

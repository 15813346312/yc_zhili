<template>
  <div>
    <BasicTable @register="registerTable">
      <template #form-custom> custom-slot </template>

      <template #toolbar>
        <!-- <a-button type="primary"
                  v-auth="'AbpTenantManagement.Tenants.Create'"
                  @click="openCreateAbpTenantModal">新增</a-button> -->
      </template>
      <!-- <template #isDefault="{ record }">
        <a-tag color="green"
               v-if="record.isDefault">
          是
        </a-tag>
        <a-tag color="red"
               v-else>
          否
        </a-tag>
      </template>
      <template #isPublic="{ record }">
        <a-tag color="green"
               v-if="record.isPublic">
          是
        </a-tag>
        <a-tag color="red"
               v-else>
          否
        </a-tag>
      </template> -->

      <!-- {
             label:'连接字符串',
              auth:['AbpTenantManagement.Tenants.ManageConnectionStrings'],
              onClick: openPermissions.bind(null, record),
            },

                {
              label:'编辑',
              auth:['AbpAuditing.AuditLog.Delete'],
              onClick: handleEdit.bind(null, record),
            }, -->
      <template #action="{ record }">

        <TableAction :actions="[


            {
             label:'删除',
              color: 'error',
              auth:['AbpAuditing.AuditLog.Delete'],
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },

            },
          ]" />
      </template>
    </BasicTable>
    <CreateAbpTenant @register="registerCreateAbpTenantModal"
                     @reload="reload"
                     :bodyStyle="{ 'padding-top': '0' }" />
    <EditAbpTenant @register="registerEditAbpTenantModal"
                   @reload="reload"
                   :bodyStyle="{ 'padding-top': '0' }" />
    <!-- <Permissions @register="registerPermissionsModal"
                 @reload="reload" /> -->
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { BasicTable, useTable, TableAction } from '/@/components/Table';
import { tableColumns, getTableListAsync, deleteAuditLogAsync, searchFormSchema } from './index.ts';

// import Permissions from '/@/views/sys/permissions/index.vue';
import { message } from 'ant-design-vue';
export default defineComponent({
  components: {
    BasicTable,
    TableAction,

    // Permissions,
  },
  setup() {
    // const [registerPermissionsModal, { openDrawer: openPermissionsModal }] = useDrawer();
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

    // 删除
    const handleDelete = async (record: Recordable) => {
      await deleteAuditLogAsync({ id: record.id, reload });
    };

    // function getFormValues() {
    //   console.log(reload ().getFieldsValue());
    // }
    return {
      registerTable,
      handleDelete,
      reload,
    };
  },
});
</script>

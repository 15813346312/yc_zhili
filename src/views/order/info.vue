<template>
  <BasicDrawer v-bind="$attrs" @register="register" :isDetail="true" title="订单详情">
    <Description
      size="middle"
      title="订单信息"
      :bordered="false"
      :column="2"
      :data="infoData"
      :schema="infoSchema"
    />
    <a-divider />

    <BasicTable @register="registerTable" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, reactive,onMounted } from 'vue';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';

  import { Description } from '/@/components/Description/index';
  import { BasicTable, useTable } from '/@/components/Table';
  import { Divider } from 'ant-design-vue';

  import { infoSchema } from './service.ts';

  export default defineComponent({
    components: { BasicDrawer, Description, BasicTable },
    setup(props) {
      const infoData = reactive({});
      const [registerTable,{ getDataSource, setTableData }] = useTable({
        title: '订单项',
        dataSource: [],
        columns: [
          {
            title: '订单编号',
            width: 150,
            dataIndex: 'orderNo',
          },
          {
            title: '项目',
            width: 150,
            dataIndex: 'projectName',
          },
          {
            title: '价格',
            width: 150,
            dataIndex: 'price',
          },
        ],
        pagination: false,
        showIndexColumn: false,
      });
      const [register] = useDrawerInner((data) => {
        infoData.orderNo = data.orderNo;
        infoData.creationTime = data.creationTime;
        infoData.discountPercent = data.discountPercent;
        infoData.promotionAmount = data.promotionAmount;
        infoData.orderTotal = data.orderTotal;
        infoData.patient = data.patient;
        infoData.patientPhone = data.patientPhone;
        infoData.patientAge = data.patientAge;
        infoData.patientIdCard = data.patientIdCard;
        infoData.patientProvince = data.patientProvince;
        infoData.patientCity = data.patientCity;
        infoData.patientDistrict = data.patientDistrict;
        infoData.patientAddress = data.patientAddress;
        infoData.doctor = data.doctor.userName;
        infoData.operator = data.operator.userName;

        debugger;
        setTableData(data.orderItems);

      });
      return {
        infoData,
        infoSchema,
        register,
        registerTable,
      };
    },
  });
</script>

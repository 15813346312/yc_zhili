<template>
  <CollapseContainer title="本地化设置"
                     :canExpan="false">
                      <BasicForm @register="registerForm" />
  </CollapseContainer>
</template>

<script>
import { CollapseContainer } from '/@/components/Container';
import { BasicForm, useForm } from '/@/components/Form/index';

export default  {
    name: 'Localization',
  components: { CollapseContainer,BasicForm },
  setup(){
    const [registerForm, { getFieldsValue, validate, resetFields }] = useForm({
      labelWidth: 200,
      schemas:  [
  {
    field: 'setting_Abp_Localization_DefaultLanguage',
    component: 'Input',
    label: '默认语言',
    required: true,
    labelWidth: 200,
    colProps: {
      span: 24,
    },
  },
    {
    field: 'setting_Abp_Timing_TimeZone',
    component: 'Input',
    label: '时区',
    required: true,
    labelWidth: 200,
    colProps: {
      span: 24,
    },
  },
     {
    field: 'setting_Abp_Identity_Password_RequiredLength',
    component: 'Input',
    label: '密码最小长度',
    required: true,
    labelWidth: 200,
    colProps: {
      span: 24,
    },
  },
     {
    field: 'setting_Abp_Identity_Password_RequiredUniqueChars',
    component: 'Input',
    label: '密码唯一字符的数量',
    required: true,
    labelWidth: 200,
    colProps: {
      span: 24,
    },
  },
       {
    field: 'setting_Abp_Identity_Password_RequireNonAlphanumeric',
    component: 'Checkbox',
    label: '密码包含特殊字符',
    required: true,
    labelWidth: 200,
    colProps: {
      span: 24,
    },
  },
         {
    field: 'setting_Abp_Identity_Password_RequireLowercase',
    component: 'Checkbox',
    label: '密码包含小写字母',
    required: true,
    labelWidth: 200,
    colProps: {
      span: 24,
    },
  },
           {
    field: 'setting_Abp_Identity_Password_RequireUppercase',
    component: 'Checkbox',
    label: '密码包含大写字母',
    required: true,
    labelWidth: 200,
    colProps: {
      span: 24,
    },
  },
             {
    field: 'setting_Abp_Identity_Password_RequireDigit',
    component: 'Checkbox',
    label: '密码包含数字',
    required: true,
    labelWidth: 200,
    colProps: {
      span: 24,
    },
  }
  ],
      showActionButtonGroup: false,
    });
       return {
      registerForm
    };
  },
}
</script>


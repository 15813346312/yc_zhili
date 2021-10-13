import { FormSchema } from '/@/components/Form';

export const schemas: FormSchema[] = [
  {
    field: 'content',
    component: 'InputTextArea',
    label: '注册协议',
    componentProps: {
      placeholder: '请输入注册协议',
      rows: 15,
    },
    required: true,
  },
];

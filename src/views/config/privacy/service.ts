import { FormSchema } from '/@/components/Form';

export const schemas: FormSchema[] = [
  {
    field: 'content',
    component: 'InputTextArea',
    label: '隐私协议',
    componentProps: {
      placeholder: '请输入隐私协议',
      rows: 15,
    },
    required: true,
  },
];

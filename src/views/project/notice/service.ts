import { FormSchema } from '/@/components/Form';

export const schemas: FormSchema[] = [
  {
    field: 'title',
    component: 'Input',
    label: '标题',
    required: true,
  },
  {
    field: 'isActivate',
    component: 'Switch',
    label: '是否激活',
    required: true,
  },
  {
    field: 'content',
    component: 'InputTextArea',
    label: '公告内容',
    componentProps: {
      placeholder: '请输入公告内容',
      rows: 4,
    },
    required: true,
  }
];

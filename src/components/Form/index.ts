import Form from './src/Form.vue'
import { ElForm } from 'element-plus'
import { FormSchema, FormSetPropsType } from '@/types/form'

export type {
  ComponentNameEnum,
  ComponentName,
  InputComponentProps,
  AutocompleteComponentProps,
  InputNumberComponentProps,
  SelectOption,
  SelectComponentProps,
  SelectV2ComponentProps,
  CascaderComponentProps,
  SwitchComponentProps,
  RateComponentProps,
  ColorPickerComponentProps,
  TransferComponentProps,
  RadioOption,
  RadioGroupComponentProps,
  RadioButtonComponentProps,
  CheckboxOption,
  CheckboxGroupComponentProps,
  DividerComponentProps,
  DatePickerComponentProps,
  DateTimePickerComponentProps,
  TimePickerComponentProps,
  TimeSelectComponentProps,
  ColProps,
  FormSetProps,
  FormItemProps,
  FormSchema,
  FormProps,
  PlaceholderModel,
  InputPasswordComponentProps,
  TreeSelectComponentProps
} from './src/types'

export interface FormExpose {
  // 表单赋值操作
  setValues: (data: Recordable) => void
  // 将外部传入的props属性和内置的props进行合并
  setProps: (props: Recordable) => void
  // 删除某个表单配置项
  delSchema: (field: string) => void
  // 添加某个表单配置项
  addSchema: (formSchema: FormSchema, index?: number) => void
  // 设置表单配置项
  setSchema: (schemaProps: FormSetPropsType[]) => void
  // 表单数据对象
  formModel: Recordable
  // 获取表单实例
  getElFormRef: () => ComponentRef<typeof ElForm>
}

export { Form }

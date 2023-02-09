// 多语言
import { useI18n } from '@/hooks/web/useI18n'
const { t } = useI18n()

/**
 * 多语言转换方法
 * @param key {string} 多语言模版key
 * @param commonPref {string} 字典树对应父级字典值
 */
export const localesFn = (key: string, commonPref?: string) => {
  const prefix = commonPref || 'tableDemo'
  return t(`${prefix}.${key}`)
}

// 重要性配置枚举
export const cellConfigEnum = {
  1: {
    type: 'success',
    text: localesFn('important')
  },
  2: {
    type: 'warning',
    text: localesFn('good')
  },
  3: {
    type: 'danger',
    text: localesFn('commonly')
  }
}

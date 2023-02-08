import type { CSSProperties } from 'vue'
declare global {
  declare interface Fn<T = any> {
    (...arg: T[]): T
  }

  declare type Nullable<T> = T | null

  declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>

  /**
   * 抽象一个可扩展属性工具类，满足对象的key可以是string,symbol,number等类型
   * Record将一个类型的所有属性值映射到另一个类型上，并创造一个新的类型，参数为：对象属性名类型，对象属性值类型
   */
  declare type Recordable<T = any, K = string> = Record<K extends null | undefined ? string : K, T>

  /**
   * 声明组件实例
   */
  declare type ComponentRef<T> = InstanceType<T>

  declare type LocaleType = 'zh-CN' | 'en'

  declare type AxiosHeaders =
    | 'application/json'
    | 'application/x-www-form-urlencoded'
    | 'multipart/form-data'

  declare type AxiosMethod = 'get' | 'post' | 'delete' | 'put'

  declare type AxiosResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream'

  declare interface AxiosConfig {
    params?: any
    data?: any
    url?: string
    method?: AxiosMethod
    headersType?: string
    responseType?: AxiosResponseType
  }

  declare interface IResponse<T = any> {
    code: string
    data: T extends any ? T : T & any
  }
}

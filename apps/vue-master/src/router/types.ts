import type { RouteRecordRaw, RouteMeta } from 'vue-router'
import { defineComponent } from 'vue'

export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>)

export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta' | 'children'> {
  name: string
  meta: RouteMeta
  component?: Component | string
  components?: Component
  children?: AppRouteRecordRaw[]
  props?: Recordable
  fullPath?: string
}

export interface Meta {
  // name 
  title: string
  // Whether to ignore permissions 
  ignoreAuth?: boolean
  permissions?: string[]
  // Whether not to cache 
  noKeepAlive?: boolean
  // Whether fixed in tabUp. 
  affix?: boolean
  // tabUp. Icon of 
  icon?: string
  // Jump address 
  frameSrc?: string
  // Outside chain Jump address 
  externalLink?: string
  //Hidden 
  hidden?: boolean
}

export interface Menu {
  title: string
  label: string
  key: string
  meta: RouteMeta
  name: string
  component?: Component | string
  components?: Component
  children?: AppRouteRecordRaw[]
  props?: Recordable
  fullPath?: string
  icon?: any
  path: string
  permissions?: string[]
  redirect?: string
  sort?: number
}

export interface IModuleType {
  default: Array<RouteRecordRaw> | RouteRecordRaw
}

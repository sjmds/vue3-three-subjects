import { RouteRecordRaw } from 'vue-router'

export interface RouteRecordRawIcon extends Omit<RouteRecordRaw, ''> {
  icon?: string
  hidden?: number | string
}

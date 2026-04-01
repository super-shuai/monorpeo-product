import { defineStore } from 'pinia'
import { RouteLocationNormalized } from 'vue-router'

// Routes that do not need to appear in the TAB
const whiteList = ['Redirect', 'login']

export type RouteItem = Partial<RouteLocationNormalized> & {
  fullPath: string
  path: string
  name: string
  hash: string
  meta: object
  params: object
  query: object
}

export type ITabsViewState = {
  tabsList: RouteItem[] // Label page
}

//Retain fixed route
function retainAffixRoute(list: any[]) {
  return list.filter((item) => item?.meta?.affix ?? false)
}

export const useTabsViewStore = defineStore({
  id: 'app-tabs-view',
  state: (): ITabsViewState => ({
    tabsList: [],
  }),
  getters: {},
  actions: {
    initTabs(routes: RouteItem[]) {
      // initialize Label page
      this.tabsList = routes
    },
    addTab(route: RouteItem): boolean {
      // append Label page
      if (whiteList.includes(route.name)) return false
      const isExists = this.tabsList.some((item) => item.fullPath == route.fullPath)
      if (!isExists) {
        this.tabsList.push(route)
      }
      return true
    },
    closeLeftTabs(route: RouteItem) {
      // Close left side
      const index = this.tabsList.findIndex((item) => item.fullPath == route.fullPath)
      this.tabsList = this.tabsList.filter((item, i) => i >= index || (item?.meta?.affix ?? false))
    },
    closeRightTabs(route: RouteItem) {
      // Close right
      const index = this.tabsList.findIndex((item) => item.fullPath == route.fullPath)
      this.tabsList = this.tabsList.filter((item, i) => i <= index || (item?.meta?.affix ?? false))
    },
    closeOtherTabs(route: RouteItem) {
      // Close other
      this.tabsList = this.tabsList.filter((item) => item.fullPath == route.fullPath || (item?.meta?.affix ?? false))
    },
    closeCurrentTab(route: RouteItem) {
      // Close current page
      const index = this.tabsList.findIndex((item) => item.fullPath == route.fullPath)
      this.tabsList.splice(index, 1)
    },
    closeAllTabs() {
      // Close all
      this.tabsList = retainAffixRoute(this.tabsList)
    },

    updateTabs(route: RouteItem) {
      // Close left side
      const index = this.tabsList.findIndex((item) => item.name == route.name)

      console.log(index)
      if (index < 0) {
        return this.addTab(route)
      }
      this.tabsList.splice(index, 1, route)
    },
  },
})

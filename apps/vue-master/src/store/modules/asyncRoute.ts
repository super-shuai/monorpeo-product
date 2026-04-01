import { toRaw, unref } from 'vue'
import { defineStore } from 'pinia'
import { RouteRecordRaw } from 'vue-router'
import { store } from '@/store'
import { asyncRoutes, constantRouter } from '@/router/index'
import { generateDynamicRoutes } from '@/router/generator'
import { useProjectSetting } from '@/hooks/setting/useProjectSetting'
import { devRoutes } from '@/router/modules/dev'
import { Layout } from '@/router/constant'

interface TreeHelperConfig {
  id: string
  children: string
  pid: string
}

const DEFAULT_CONFIG: TreeHelperConfig = {
  id: 'id',
  children: 'children',
  pid: 'pid',
}

const getConfig = (config: Partial<TreeHelperConfig>) => Object.assign({}, DEFAULT_CONFIG, config)

export interface IAsyncRouteState {
  menus: RouteRecordRaw[]
  routers: any[]
  routersAdded: any[]
  keepAliveComponents: string[]
  isDynamicRouteAdded: boolean
}

function filter<T = any>(
  tree: T[],
  func: (n: T) => RouteRecordRaw | null | undefined,
  config: Partial<TreeHelperConfig> = {}
): RouteRecordRaw[] {
  config = getConfig(config)
  const children = config.children as string

  function listFilter(list: T[]) {
    return list.reduce<RouteRecordRaw[]>((router, node) => {
      node[children] = node[children] && listFilter(node[children])
      const item = func(node)
      if (item) {
        router.push(item)
      }

      return router
    }, [])
  }

  return listFilter(tree)
}

export const useAsyncRouteStore = defineStore({
  id: 'app-async-route',
  state: (): IAsyncRouteState => ({
    menus: [],
    routers: constantRouter,
    routersAdded: [],
    keepAliveComponents: [],
    // Whether the route has been dynamically added
    isDynamicRouteAdded: false,
  }),
  getters: {
    getMenus(): RouteRecordRaw[] {
      return this.menus
    },
    getIsDynamicRouteAdded(): boolean {
      return this.isDynamicRouteAdded
    },
  },
  actions: {
    getRouters() {
      return toRaw(this.routersAdded)
    },
    setDynamicRouteAdded(added: boolean) {
      this.isDynamicRouteAdded = added
    },
    // Setting dynamic Routing
    setRouters(routers: RouteRecordRaw[]) {
      this.routersAdded = routers
      this.routers = constantRouter.concat(routers)
    },
    setMenus(menus: RouteRecordRaw[]) {
      // Setting dynamic Routing
      this.menus = menus
    },
    setKeepAliveComponents(compNames: string[]) {
      // Set the component to be cached
      this.keepAliveComponents = compNames
    },
    async generateRoutes(data) {
      let accessedRouters

      const { permissionMode } = useProjectSetting()

      if (unref(permissionMode) === 'BACK') {
        // Dynamic fetch menu
        try {
          accessedRouters = await generateDynamicRoutes()
        } catch (error) {
          console.log(error)
        }
      } else {
        try {
          const permissionsList = data || []
          const asyncRoutesFlat = asyncRoutes.flatMap(({ children, ...item }) => [item, ...(children || [])])
          const defaultRoute = asyncRoutesFlat
            .filter((item) => item?.meta?.show === false)
            .map((item) => {
              return {
                ...item,
                meta: { ...item.meta, title: window.$wt(item?.meta?.title as string) },
              }
            })
          console.log(defaultRoute)
          const routeFilter = (route): any => {
            const meta = route.meta || {}
            const { permissions } = meta
            if (permissions) return route

            const item = asyncRoutesFlat.find((v) => v.name === route.name)
            return (
              item && {
                ...item,
                meta: {
                  ...meta,
                  title: item?.meta?.title ? window.$wt(item?.meta?.title as string) : route.meta?.title,
                },
                children: route.children,
              }
            )
          }

          //Filter whether the account has a certain permission ，And remove the menu from the load list
          accessedRouters = [
            ...filter(permissionsList, routeFilter),
            {
              path: '/detail',
              name: '_detail',
              component: Layout,
              meta: { show: false },
              children: defaultRoute,
            },
          ]
        } catch (error) {
          console.log(error)
        }
      }

      if (import.meta.env.DEV) {
        accessedRouters = [...devRoutes, ...accessedRouters]
      }

      this.setRouters(accessedRouters)
      this.setMenus(accessedRouters)
      return toRaw(accessedRouters)
    },
  },
})

// Need to be used outside the setup
export function useAsyncRoute() {
  return useAsyncRouteStore(store)
}

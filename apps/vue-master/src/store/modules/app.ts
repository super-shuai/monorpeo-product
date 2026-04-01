import { defineStore } from 'pinia'
import { store } from '@/store'
import { storage } from '@/utils/Storage'
import { AUTO_CALL_STATUS, SYSTEM_LIST, CC_TOKEN } from '@/store/mutation-types'
import { getCcToken } from '@/api/user-mgt/user-details'

export interface IAppState {
  autoCallStatus: boolean
  systemList: Array<{
    key: string
    name: string
    app_id: string
  }>
  ccToken: string
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): IAppState => ({
    autoCallStatus: storage.get(AUTO_CALL_STATUS, false), // Whether to enable automatic outbound calls
    systemList: storage.get(SYSTEM_LIST, false),
    ccToken: storage.get(CC_TOKEN, false),
  }),
  getters: {
    show(): boolean {
      return this.autoCallStatus
    },
    getAutoCallStatus(): boolean {
      return this.autoCallStatus
    },
  },
  actions: {
    setAutoCallStatus(status: boolean) {
      this.autoCallStatus = status
      storage.set(AUTO_CALL_STATUS, status)
    },

    setSystemList(status: []) {
      this.systemList = status
      storage.set(SYSTEM_LIST, status)
    },

    setCcToken(status: string) {
      this.ccToken = status
      storage.set(CC_TOKEN, status)
    },

    async getCcToken() {
      const ccLoginApi = this.systemList.filter((item) => item.app_id === 'collect')[0].key
      const [res] = await getCcToken(ccLoginApi)
      if (res.code == 200) {
        this.setCcToken(res.data?.token)
      }
    },
  },
})

// Need to be used outside the setup
export function useApp() {
  return useAppStore(store)
}

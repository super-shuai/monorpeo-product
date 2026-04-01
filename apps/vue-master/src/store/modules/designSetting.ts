import { defineStore } from 'pinia'
import { store } from '@/store'
import designSetting from '@/settings/designSetting'

const { darkTheme, appTheme, appThemeList } = designSetting

interface DesignSettingState {
  //Dark theme 
  darkTheme: boolean
  //System style 
  appTheme: string
  //System built-in style 
  appThemeList: string[]
}

export const useDesignSettingStore = defineStore({
  id: 'app-design-setting',
  state: (): DesignSettingState => ({
    darkTheme,
    appTheme,
    appThemeList,
  }),
  getters: {
    getDarkTheme(): boolean {
      return this.darkTheme
    },
    getAppTheme(): string {
      return this.appTheme
    },
    getAppThemeList(): string[] {
      return this.appThemeList
    },
  },
  actions: {},
})

// Need to be used outside the setup
export function useDesignSetting() {
  return useDesignSettingStore(store)
}

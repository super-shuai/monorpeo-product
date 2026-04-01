import { defineStore } from 'pinia'
import projectSetting from '@/settings/projectSetting'
import type { IHeaderSetting, IMenuSetting, IMultiTabsSetting, ICrumbsSetting } from '/#/config'

const {
  navMode,
  navTheme,
  isMobile,
  headerSetting,
  showFooter,
  menuSetting,
  multiTabsSetting,
  crumbsSetting,
  permissionMode,
  isPageAnimate,
  pageAnimateType,
  language,
} = projectSetting

interface ProjectSettingState {
  navMode: string //Navigation mode 
  navTheme: string //Navigation style 
  headerSetting: IHeaderSetting //Top setting 
  showFooter: boolean //Page footer 
  menuSetting: IMenuSetting //multi-label 
  multiTabsSetting: IMultiTabsSetting //multi-label 
  crumbsSetting: ICrumbsSetting //crumbs 
  permissionMode: string //Permission mode 
  isPageAnimate: boolean //Whether to enable route animation 
  pageAnimateType: string //Route animation type 
  isMobile: boolean // Whether the device is in mobile mode 
  language: string // Language 
}

export const useProjectSettingStore = defineStore({
  id: 'app-project-setting',
  state: (): ProjectSettingState => ({
    navMode: navMode,
    navTheme,
    isMobile,
    headerSetting,
    showFooter,
    menuSetting,
    multiTabsSetting,
    crumbsSetting,
    permissionMode,
    isPageAnimate,
    pageAnimateType,
    language,
  }),
  getters: {
    getNavMode(): string {
      return this.navMode
    },
    getNavTheme(): string {
      return this.navTheme
    },
    getIsMobile(): boolean {
      return this.isMobile
    },
    getHeaderSetting(): object {
      return this.headerSetting
    },
    getShowFooter(): boolean {
      return this.showFooter
    },
    getMenuSetting(): object {
      return this.menuSetting
    },
    getMultiTabsSetting(): object {
      return this.multiTabsSetting
    },
    getCrumbsSetting(): object {
      return this.crumbsSetting
    },
    getPermissionMode(): string {
      return this.permissionMode
    },
    getIsPageAnimate(): boolean {
      return this.isPageAnimate
    },
    getPageAnimateType(): string {
      return this.pageAnimateType
    },
    getLanguage(): string {
      return this.language
    },
  },
  actions: {
    setNavTheme(value: string): void {
      this.navTheme = value
    },
    setIsMobile(value: boolean): void {
      this.isMobile = value
    },

    setLanguage(value: string): void {
      this.language = value
    },
  },
})

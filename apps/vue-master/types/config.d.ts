export interface ProjectSettingState {
  //Navigation mode 
  navMode: string
  //Navigation style 
  navTheme: string
  //Top setting 
  headerSetting: object
  //Page footer 
  showFooter: boolean
  //Menu setting 
  menuSetting: object
  //multi-label 
  multiTabsSetting: object
  //crumbs 
  crumbsSetting: object
  //Permission mode 
  permissionMode: string
}

export interface IBodySetting {
  fixed: boolean
}

export interface IHeaderSetting {
  bgColor: string
  fixed: boolean
  isReload: boolean
}

export interface IMenuSetting {
  minMenuWidth: number
  menuWidth: number
  fixed: boolean
  mixMenu: boolean
  collapsed: boolean
  mobileWidth: number
}

export interface ICrumbsSetting {
  show: boolean
  showIcon: boolean
}

export interface IMultiTabsSetting {
  bgColor: string
  fixed: boolean
  show: boolean
}
export interface GlobConfig {
  title: string
  apiUrl: string
  shortName: string
  urlPrefix?: string
  uploadUrl?: string
  imgUrl?: string
  ossUrl?: string
}

export interface GlobEnvConfig {
  // title 
  VITE_GLOB_APP_TITLE: string
  // Interface address 
  VITE_GLOB_API_URL: string
  // Interface prefix 
  VITE_GLOB_API_URL_PREFIX?: string
  // Project abbreviation
  VITE_GLOB_APP_SHORT_NAME: string
  // Image upload address 
  VITE_GLOB_UPLOAD_URL?: string
  //Picture prefix address 
  VITE_GLOB_IMG_URL?: string
  // oss Echo address 
  VITE_GLOB_OSS_URL?: string
}

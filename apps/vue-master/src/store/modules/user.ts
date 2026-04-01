import { defineStore } from 'pinia'
import { store } from '@/store'
import { ACCESS_TOKEN, CURRENT_USER } from '@/store/mutation-types'

import { getUserInfo as getUserInfoApi, getOjkFlag, kfLogin, login } from '@/api/system/user'
import { storage } from '@/utils/Storage'
import { permissionsList } from '@/api/system/menu'

export type UserInfoType = {
  // TODO: add your own data
  username: string
  lang: string
  uid?: string | number
  email?: string
  product?: string
}

export type ExtDataType = {
  ext: number
  group_id: number
  id: number
  workplace_group_id: number
}

export interface IUserState {
  token: string
  username: string
  welcome: string
  avatar: string
  permissions: any[]
  info: UserInfoType
  extData: ExtDataType
  accessList: any[]
  ojkFlag: boolean
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): IUserState => ({
    token: storage.get(ACCESS_TOKEN, ''),
    username: '',
    welcome: '',
    avatar: '',
    permissions: [],
    info: storage.get(CURRENT_USER, {}),
    extData: {
      ext: 0,
    } as ExtDataType,

    accessList: [],
    ojkFlag: false,
  }),
  getters: {
    getToken(): string {
      return this.token
    },
    getAvatar(): string {
      return this.avatar
    },
    getNickname(): string {
      return this.username
    },
    getUserInfo(): UserInfoType {
      return this.info
    },

    getOjkFlag(): boolean {
      return this.ojkFlag
    },

    getExtNumber(): number {
      return this.extData.ext
    },

    uid(): number | string {
      return this.info.uid!
    },
  },
  actions: {
    setToken(token: string) {
      this.token = token
    },
    setAvatar(avatar: string) {
      this.avatar = avatar
    },
    setPermissions(permissions = []) {
      this.permissions = permissions
    },
    setUserInfo(info: UserInfoType) {
      this.info = info
    },

    setExtData(ext) {
      this.extData = ext
    },

    setAccessList(access) {
      this.accessList = access
    },

    setOjkFlag(flag) {
      this.ojkFlag = flag
    },
    // Account center login
    async centerLogin(params: any) {
      const response = await login(params)
      return response
    },

    // System login
    async login() {
      const response = await kfLogin()
      return response
    },

    // Get user information
    async getInfo() {
      const result = await getUserInfoApi()
      this.setUserInfo(result.data)
      this.setAvatar(result.data?.username)
      return result.data
    },

    // Get user information
    async getOjkFlags() {
      const result = await getOjkFlag()
      const switchflag: boolean = result.data.SET == 1
      this.setOjkFlag(switchflag)
      return result.data
    },

    async getPermissions() {
      const result = await permissionsList()
      const list = result?.data || []
      this.setPermissions(list)

      return list
    },

    // Log out
    async logout() {
      this.setPermissions([])
      this.setUserInfo({ username: '', lang: '' })
      storage.remove(ACCESS_TOKEN)
      storage.remove(CURRENT_USER)
    },
  },
})

// Need to be used outside the setup
export function useUser() {
  return useUserStore(store)
}

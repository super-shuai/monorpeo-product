import { defineStore } from 'pinia'
import { IS_SCREENLOCKED } from '@/store/mutation-types'
import { storage } from '@/utils/Storage'

// If no operation is performed for a long period of time, the default screen lock duration is set 
const initTime = 60 * 60

const isLocked = storage.get(IS_SCREENLOCKED, false)

export type IScreenLockState = {
  isLocked: boolean // Lock screen or not 
  lockTime: number
}

export const useScreenLockStore = defineStore({
  id: 'app-screen-lock',
  state: (): IScreenLockState => ({
    isLocked: isLocked === true, // Lock screen or not 
    lockTime: isLocked == 'true' ? initTime : 0,
  }),
  getters: {},
  actions: {
    setLock(payload: boolean) {
      this.isLocked = payload
      storage.set(IS_SCREENLOCKED, this.isLocked)
    },
    setLockTime(payload = initTime) {
      this.lockTime = payload
    },
  },
})

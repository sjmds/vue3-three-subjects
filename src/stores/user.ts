import { defineStore, acceptHMRUpdate } from 'pinia'
import type { UserInfo } from '@/types/types.d'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    userInfo: {
      name: 'admin',
      id: '1',
    }
  }),
  getters: {

  },
  actions: {
    setUserInfo(payload: UserInfo) {
      this.userInfo = payload
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}

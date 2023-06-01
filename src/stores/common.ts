import { defineStore, acceptHMRUpdate } from 'pinia'

export const useCommonStore = defineStore({
  id: 'common',
  state: () => ({
    asideWidth: 200,
    collapse: false,
    innerWidth: window.innerWidth - 200 - 40,
    innerHeight: window.innerHeight - 60 - 40,
  }),
  getters: {

  },
  actions: {
    updateCollapse() {
      this.collapse = !this.collapse
      this.asideWidth = this.collapse ? 60 : 200
      this.innerWidth = window.innerWidth - this.asideWidth - 40
    },
    updateInner({ clientWidth, clientHeight }: any) {
      this.innerWidth = clientWidth
      this.innerHeight = clientHeight
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCommonStore, import.meta.hot))
}

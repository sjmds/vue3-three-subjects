import { defineStore, acceptHMRUpdate } from 'pinia'
import routesData from "@/router/routes.json"

export const useRouterStore = defineStore({
  id: 'router',
  state: () => ({
    routes: routesData,
  }),
  getters: {
  },
  actions: {
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useRouterStore, import.meta.hot))
}
import { createRouter, createWebHistory } from 'vue-router'
import { generateMenu } from '@/utils/router'
import { ref } from 'vue'

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/layout/index.vue'),
      // redirect: '/home/home',
      // children: [
      //   {
      //     path: '/home/home',
      //     name: '首页',
      //     component: () => import('@/views/home/home.vue'),
      //   },
      //   {
      //     path: '/components',
      //     name: '组件',
      //     children: [
      //       {
      //         path: '/loading',
      //         name: 'Loading',
      //         component: () => import('@/views/loading/loading.vue'),
      //       },
      //     ]
      //   },
      // ]
    },
  ]
})

const registerRoute = ref(true)
router.beforeEach(async (to, from, next) => {
  if (registerRoute.value) {
    await generateMenu()
    registerRoute.value = false
    // todo:必须传to，不然刷新后页面空白
    next(to)
  } else {
    next()
  }

})

export default router

import router from "@/router"
import routesData from "@/router/routes.json"
import type { RouteRecordRawIcon } from '@/types/types.d'

export const parsePath = (path: string) => {
  return path.startsWith('/') ? path : `/${path}`
}

export const _import = (path: string) => () => import(`../views${parsePath(path)}.vue`)
export const _importGlob = (path: string) => {
  // /**/*，该格式固定
  let modules = import.meta.glob('../views/**/*.vue')
  // 然后动态路由的时候这样来取
  return modules[`../views${parsePath(path)}.vue`]
}

export const parseMenu = (routeList: RouteRecordRawIcon[], parent: RouteRecordRawIcon) => {
  // console.log('routeList', routeList)
  for (const route of routeList) {
    // console.log('route', route, parent)
    const hasChild = route.children && route.children.length

    const newRoute: any = {
      ...route,
      children: route.children || [],
      component: !hasChild ? _importGlob(route.path) : null,
      // component: !hasChild ? _import(route.path) : null,
    }

    if (parent.name) {
      router.addRoute(parent.name, newRoute)
    } else {
      router.addRoute(newRoute)
    }

    if (hasChild) {
      parseMenu(route.children || [], newRoute)
    }

  }
}


export const generateMenu = async () => {
  const indexRoute: RouteRecordRawIcon = router.getRoutes().filter(item => item.name === 'index')[0]
  // console.log('indexRoute', indexRoute)
  const parentRoute: any = {
    ...indexRoute,
    redirect: parsePath(routesData[0]?.path)
  }
  router.addRoute(parentRoute)
  parseMenu(routesData, parentRoute)
  if (parentRoute.name) {
    router.addRoute(parentRoute.name, {
      path: '/404',
      component: _importGlob('/error/404')
    })
    router.addRoute(parentRoute.name, {
      path: '/500',
      component: _importGlob('/error/500')
    })
    router.addRoute(parentRoute.name, {
      path: '*',
      redirect: '/404'
    })
  }
  // console.log('router', router.getRoutes())

}
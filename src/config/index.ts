export default {
  title: "基建管理数字化移交平台",
  copyright: "Copyright © 2022 tomi-group.com. All rights reserved.",
  isFirstPage: true, // 配置首页不可关闭
  key: "yunzhu", // 配置主键,目前用于存储
  whiteList: ["/login", "/404", "/401", "/lock"], // 配置无权限可以访问的页面
  whiteTagList: ["/login", "/404", "/401", "/lock"], // 配置不添加tags页面 （'/advanced-router/mutative-detail/*'——*为通配符）

  systemUrl: '/app-system',
  iotUrl: '/app-iot',
  vehicleUrl: '/app-vehicle',

  homeUrl: "/",
  homeTowUrl: "/oilFactory/index",
  homeShow: true,
  //内蒙首页跳转
  // homeTowUrl: "/app",
  //内蒙隐藏模块
  // homeShow:false,
  fistPage: {
    label: "首页",
    value: "/",
    params: {},
    query: {},
    group: [],
    close: false
  },
  // 配置菜单的属性
  menu: {
    props: {
      label: "label",
      path: "path",
      icon: "icon",
      children: "children"
    }
  },
  // 1配置中心,2车载网关,3光储充,4光伏电站
  appTypeList: [{
    label: '配置中心',
    value: '1',
    code: 'system',
  }, {
    label: '车载网关',
    value: '2',
    code: 'vehicle',
  }, {
    label: '光储充',
    value: '3',
    code: 'opticalstorage',
  }, {
    label: '光伏电站',
    value: '4',
    code: 'photovoltaic',
  }],
  appTypeMap: {
    system: '1',
    vehicle: '2',
    opticalstorage: '3',
    photovoltaic: '4',
  },
}

<template>
  <el-container class="layout-container">
    <!-- 菜单 -->
    <el-aside :width="asideWidth+'px'">
      <el-scrollbar>
        <div class="logo">
          <img height="50" src="~@/assets/img/logo.svg" alt="" srcset="">
        </div>
        <el-button
          class="collapse-btn"
          :icon="collapse?'el-icon-expand':'el-icon-fold'" 
          @click="setCollapse"
        />
        <el-menu router :collapse="collapse">
          <template v-for="item in routerStore.routes" :key="item.id">
            <el-menu-item
              v-if="!item.children || !item.children.length"
              :index="item.path">
              <el-icon v-if="item.icon">
                <component :is="'el-icon-'+item.icon"/>
              </el-icon>{{item.name}}
            </el-menu-item>
            <el-sub-menu v-if="item.children && item.children.length" :index="item.path">
              <template #title>
                <el-icon v-if="item.icon">
                  <component :is="'el-icon-'+item.icon"/>
                </el-icon>{{item.name}}
              </template>
              <template v-for="child in item.children" :key="child.id">
                <el-menu-item v-if="!child.hidden" :index="child.path">
                  <el-icon v-if="child.icon">
                    <component :is="'el-icon-'+child.icon"/>
                  </el-icon>{{child.name}}
                </el-menu-item>
              </template>
            </el-sub-menu>
          </template>
        </el-menu>
      </el-scrollbar>
    </el-aside>
    <el-container>
      <!-- 头部 -->
      <el-header style="text-align: right;">
        <div class="user-info">
          <el-avatar 
            style="margin-right: 8px;" 
            :size="30" 
            src="" 
          ><el-icon>
              <component is="el-icon-avatar"/>
            </el-icon>
          </el-avatar>
          <span>admin</span>
        </div>
      </el-header>
      <!-- 主体 -->
      <el-main>
        <el-scrollbar ref="mainDom">
          <router-view />
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useRouterStore } from '@/stores/router'
import { useCommonStore } from '@/stores/common'
import { storeToRefs } from 'pinia'
const routerStore = useRouterStore()
const commonStore = useCommonStore()
const { collapse, asideWidth } = storeToRefs(commonStore)
const mainDom = ref<any>(null)

const setInner = () => {
  const { clientWidth, clientHeight } = mainDom.value?.$el
  // console.log('setInner clientWidth, clientHeight', clientWidth, clientHeight)
	commonStore.updateInner({ clientWidth, clientHeight })
}
const setCollapse = () => {
  console.log('collapse',collapse)
  commonStore.updateCollapse()
}

onMounted(() => {
  setInner()
  window.addEventListener('resize', () => {
    setInner()
  })
})
</script>

<style lang="scss" scoped>
.layout-container .el-header {
  position: relative;
  background-color: var(--vt-c-white);
}
.logo {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--vt-c-white);
}
.layout-container .el-aside {
  background-color: var(--vt-c-white);
}
.layout-container .collapse-btn {
  position: fixed;
  left: 0px;
  bottom: 5px;
  z-index: 100;
}
.layout-container .el-menu {
  height: calc(100vh - 60px);
  border-right: 0;
}
.layout-container .el-main {
  padding: 20px;
}
.layout-container .user-info {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>

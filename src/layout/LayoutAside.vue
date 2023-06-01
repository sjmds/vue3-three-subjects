<template>
  <el-aside class="layout-aside" :width="asideWidth+'px'">
    <el-scrollbar>
      <div class="logo">
        <img height="50" src="~@/assets/img/logo.svg" alt="" srcset="">
      </div>
      <el-button
        class="collapse-btn"
        :icon="collapse?'el-icon-expand':'el-icon-fold'" 
        @click="setCollapse"
      />
      <el-menu
        router 
        :collapse="collapse">
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
</template>

<script lang="ts" setup>
import { ref } from 'vue'
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
  // console.log('collapse',collapse)
  commonStore.updateCollapse()
}
</script>

<style lang="scss" scoped>
.layout-aside {
  background-color: var(--vt-c-white);
  .logo {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--vt-c-white);
  }
  .collapse-btn {
    position: fixed;
    left: 0px;
    bottom: 5px;
    z-index: 100;
  }
  .el-menu {
    height: calc(100vh - 60px);
    border-right: 0;
  }
}
</style>

<template>
  <el-container class="layout-container">
    <!-- 菜单 -->
    <LayoutAside />
    <el-container class="is-vertical">
      <!-- 头部 -->
      <LayoutHeader />
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
import { useCommonStore } from '@/stores/common'
import LayoutAside from './LayoutAside.vue'
import LayoutHeader from './LayoutHeader.vue'
const commonStore = useCommonStore()
const mainDom = ref<any>(null)

const setInner = () => {
  const { clientWidth, clientHeight } = mainDom.value?.$el
  // console.log('setInner clientWidth, clientHeight', clientWidth, clientHeight)
	commonStore.updateInner({ clientWidth, clientHeight })
}

onMounted(() => {
  setInner()
  window.addEventListener('resize', () => {
    setInner()
  })
})
</script>

<style lang="scss" scoped>
.layout-container .el-main {
  padding: 20px;
}
</style>

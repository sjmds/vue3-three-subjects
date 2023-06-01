<template>
  <el-header class="layout-header" style="text-align: right;">
    <div class="user-info">
      <el-avatar 
        style="margin-right: 8px;" 
        :size="30" 
        src="" 
      ><el-icon>
          <component is="el-icon-avatar"/>
        </el-icon>
      </el-avatar>
      <span>{{ userInfo.name }}</span>
    </div>
  </el-header>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)

</script>

<style lang="scss" scoped>
.layout-header {
  position: relative;
  background-color: var(--vt-c-white);
  .user-info {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    right: 20px;
  }
}
</style>

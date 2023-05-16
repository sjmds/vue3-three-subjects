<template>
  <div class="avue-home" :style="{width: innerWidth+'px',height: innerHeight+'px'}">
    <div class="avue-home__main">
      <img
        class="avue-home__loading"
        src="/svg/loading-spin.svg"
        alt="loading"
      />
      <div class="avue-home__title">正在加载资源</div>
      <div class="avue-home__sub-title">
        初次加载资源可能需要较多时间 请耐心等待
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useCommonStore } from '@/stores/common'
const { innerWidth, innerHeight } = storeToRefs(useCommonStore())
</script>

<style lang="scss" scoped>
</style>

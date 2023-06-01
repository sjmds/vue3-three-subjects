<template>
  <!-- <FullscreenLoading /> -->
  <div class="ss" ref="ss"></div>
</template>

<script setup lang="ts">
import { ref, render,h,onMounted } from 'vue'
import FullscreenLoading from '@/components/FullscreenLoading'
const ss = ref<any>(null)
onMounted(()=>{
  // "render"函数的返回值需要是"VNode"格式, "h"函数可以构造"VNode"格式数据. 
  // ss.value是需要append的dom，render不会替换ss.value的内容
  render(h(FullscreenLoading), ss.value)
})
</script>
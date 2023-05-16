<template>
  <div 
		class="card-wrap" 
		:style="{width: innerWidth+'px',height: innerHeight+'px'}"
	><slot/></div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCommonStore } from '@/stores/common'
const { innerWidth, innerHeight } = storeToRefs(useCommonStore())
</script>

<style lang="scss" scoped>
.card-wrap {
	display: block;
}
</style>
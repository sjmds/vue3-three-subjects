<template>
  <div 
		class="scene-wrap" 
		ref="sceneDom"
		:style="{width: innerWidth+'px',height: innerHeight+'px'}"
	></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import * as THREE from 'three'
import { useCommonStore } from '@/stores/common'
const { innerWidth, innerHeight } = storeToRefs(useCommonStore())

const sceneDom = ref<any>(null)
let camera:any, scene:any, renderer:any

const init = () => {
	scene = new THREE.Scene()
	camera = new THREE.PerspectiveCamera( 45, innerWidth.value / innerHeight.value, 1, 500 )
  camera.position.set( 0, 0, 100 )
  camera.lookAt( 0, 0, 0 )

	renderer = new THREE.WebGLRenderer()
	renderer.setSize( innerWidth.value, innerHeight.value )
	sceneDom.value.appendChild(renderer.domElement)

	const material = new THREE.LineBasicMaterial( { color: 0x00ff00 } )
  const points = []
  points.push( new THREE.Vector3( -10, 0, 0 ) )
  points.push( new THREE.Vector3( 0, 10, 0 ) )
  // 坐标原点，和数学坐标轴一样
  points.push( new THREE.Vector3( 0, 0, 0 ) )
  points.push( new THREE.Vector3( 10, 0, 0 ) )

  const geometry = new THREE.BufferGeometry().setFromPoints( points )
  const line = new THREE.Line( geometry, material )
	scene.add(line)

  window.addEventListener( 'resize', onWindowResize )
}
function animate() {
  requestAnimationFrame( animate )
  render()
}
function render() {
  renderer.render( scene, camera )
}
function onWindowResize() {
	camera.aspect = innerWidth.value / innerHeight.value
	camera.updateProjectionMatrix()
	renderer.setSize( innerWidth.value, innerHeight.value )
}

onMounted(()=>{
	init()
	animate()
	render()
})

</script>

<style lang="scss" scoped>
.scene-wrap {
	display: block;
	background-color: var(--vt-c-white);
}
</style>
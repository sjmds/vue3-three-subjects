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
let camera:any, scene:any, renderer:any, cube:any

const init = () => {
	scene = new THREE.Scene()
	camera = new THREE.PerspectiveCamera( 75, innerWidth.value / innerHeight.value, 0.1, 1000 )

	renderer = new THREE.WebGLRenderer()
	renderer.setSize( innerWidth.value, innerHeight.value )
	sceneDom.value.appendChild(renderer.domElement)

	const geometry = new THREE.BoxGeometry( 1, 1, 1 )
	const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
	cube = new THREE.Mesh( geometry, material )
	scene.add( cube )

	camera.position.z = 5
  window.addEventListener( 'resize', onWindowResize )

}
function animate() {
	requestAnimationFrame( animate )
	render()
}
function render() {
  cube.rotation.x += 0.01
	cube.rotation.y += 0.01
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
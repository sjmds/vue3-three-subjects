<template>
  <div 
		class="scene-wrap" 
		ref="sceneDom"
		:style="{width: innerWidth+'px',height: innerHeight+'px'}"
	></div>
</template>

<script setup lang="ts">
import path from 'pathe'
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { useCommonStore } from '@/stores/common'
const { innerWidth, innerHeight } = storeToRefs(useCommonStore())

const sceneDom = ref<any>(null)
let camera:any, scene:any, renderer:any

const init = () => {
	scene = new THREE.Scene()
	camera = new THREE.PerspectiveCamera( 45, innerWidth.value / innerHeight.value, 0.1, 100 )
  camera.position.set( 1.5, 4, 9 )
  camera.lookAt( 0, 0, 0 )

  //

  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath( path.join('/node_modules/three/examples/jsm/libs/draco/gltf/') )

  const loader = new GLTFLoader()
  loader.setDRACOLoader( dracoLoader )
  loader.setPath( path.resolve('static/gltf/') )
  loader.load('/forest_house.glb', ( gltf ) => {
    scene.add( gltf.scene )
    render()
	} )

  // 

	renderer = new THREE.WebGLRenderer()
	renderer.setSize( innerWidth.value, innerHeight.value )
	sceneDom.value.appendChild(renderer.domElement)

  const controls = new OrbitControls( camera, renderer.domElement )
  controls.addEventListener( 'change', render )
  controls.target.set( 0, 2, 0 )
  controls.update()

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
  render()
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
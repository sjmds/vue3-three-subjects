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
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { useCommonStore } from '@/stores/common'
const { innerWidth, innerHeight } = storeToRefs(useCommonStore())

const sceneDom = ref<any>(null)
let camera:any, scene:any, renderer:any, group:any, cameraTarget:any

let text:string = 'three.js',
    font:any = undefined,
    fontName:string = 'optimer', // helvetiker, optimer, gentilis, droid sans, droid serif
    fontWeight:string = 'bold', // normal bold
    textMesh1:any = undefined

let targetRotation = 0
let targetRotationOnPointerDown = 0
let pointerX = 0
let pointerXOnPointerDown = 0
let windowHalfX = innerWidth.value / 2

const init = () => {
	scene = new THREE.Scene()
  scene.background = new THREE.Color( 0x000000 )
  scene.fog = new THREE.Fog( 0x000000, 250, 1400 )

	camera = new THREE.PerspectiveCamera( 30, innerWidth.value / innerHeight.value, 1, 1500 )
  camera.position.set( 0, 400, 700 )
  cameraTarget = new THREE.Vector3( 0, 150, 0 )

  const dirLight = new THREE.DirectionalLight( 0xffffff, 0.125 )
  dirLight.position.set( 0, 0, 1 ).normalize()
  scene.add( dirLight )

  const pointLight = new THREE.PointLight( 0xffffff, 1.5 )
  pointLight.color.setHSL( Math.random(), 1, 0.5 )
  pointLight.position.set( 0, 100, 90 )
  scene.add( pointLight )

	renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio( window.devicePixelRatio )
	renderer.setSize( innerWidth.value, innerHeight.value )
	sceneDom.value.appendChild(renderer.domElement)

  group = new THREE.Group()
  group.position.y = 100
  scene.add( group )

  // EVENTS
  sceneDom.value.style.touchAction = 'none'
  sceneDom.value.addEventListener( 'pointerdown', onPointerDown )
  
  window.addEventListener( 'resize', onWindowResize )
}

function loadFont() {
  const loader = new FontLoader()
  loader.load( 
    path.resolve('node_modules/three/examples/fonts/' + fontName + '_' + fontWeight + '.typeface.json'), 
    function ( response ) {
      font = response
      refreshText()
  })
}

function createText() {
  const textGeo = new TextGeometry( text, {
    font,
    size: 70,
    height: 20,
    curveSegments: 4,

    bevelThickness: 2,
    bevelSize: 1.5,
    bevelEnabled: true,
  })
  textGeo.computeBoundingBox()
  const centerOffset = - 0.5 * ( textGeo?.boundingBox?.max?.x||0 - (textGeo?.boundingBox?.min?.x||0) )

  const materials = [
    new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true } ), // front
    new THREE.MeshPhongMaterial( { color: 0xffffff } ) // side
  ]

  textMesh1 = new THREE.Mesh( textGeo, materials )
  textMesh1.position.x = centerOffset
  textMesh1.position.y = 30
  textMesh1.position.z = 0

  textMesh1.rotation.x = 0
  textMesh1.rotation.y = Math.PI * 2

  group.add( textMesh1 )
}

function refreshText() {
  textMesh1 && group.remove( textMesh1 )
  if ( ! text ) return

  createText()
}
function onPointerDown( event:any ) {
  if ( event.isPrimary === false ) return
  pointerXOnPointerDown = event.clientX - windowHalfX
  targetRotationOnPointerDown = targetRotation

  document.addEventListener( 'pointermove', onPointerMove )
  document.addEventListener( 'pointerup', onPointerUp )
}

function onPointerMove( event:any ) {
  if ( event.isPrimary === false ) return
  pointerX = event.clientX - windowHalfX
  targetRotation = targetRotationOnPointerDown + ( pointerX - pointerXOnPointerDown ) * 0.02
}

function onPointerUp(event:any) {
  if ( event.isPrimary === false ) return;
  document.removeEventListener( 'pointermove', onPointerMove )
  document.removeEventListener( 'pointerup', onPointerUp )
}

function render() {
  group.rotation.y += ( targetRotation - group.rotation.y ) * 0.05
  group.rotation.x += ( targetRotation - group.rotation.x ) * 0.02

  camera.lookAt( cameraTarget )

  renderer.clear()
  renderer.render( scene, camera )

}

function animate() {
  requestAnimationFrame( animate )
  render()
}

function onWindowResize() {
  windowHalfX = innerWidth.value / 2
  camera.aspect = innerWidth.value / innerHeight.value
  camera.updateProjectionMatrix()
  renderer.setSize( innerWidth.value, innerHeight.value )
}

onMounted(() => {
  loadFont()
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
import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// // axes helper
    // const axesHelper = new THREE.AxesHelper()
    // scene.add(axesHelper)

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('./static02/textures/matcaps/3.png')
const donutTexture = textureLoader.load('./static02/textures/matcaps/5.png')
matcapTexture.colorSpace = THREE.SRGBColorSpace

/**
 * Fonts
 */
const fontLoader = new FontLoader()

fontLoader.load('./static02/fonts/helvetiker_regular.typeface.json', (font) => {
    const textGeometry = new TextGeometry('ce pizza', {
        font, 
        size: 0.5,
        height: 0.2,
        depth: 0.2,
        curveSegments: 10,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.01,
        bevelOffset: 0,
        bevelSegments: 8
    })
    // textGeometry.computeBoundingBox()
    // textGeometry.translate(
    //     -(textGeometry.boundingBox.max.x - 0.02) * 0.5,
    //     -(textGeometry.boundingBox.max.y - 0.03) * 0.5,
    //     -(textGeometry.boundingBox.max.z - 0.03) * 0.5
    // )
    // textGeometry.computeVertexNormals()
    // console.log(textGeometry.boundingBox)
    
    textGeometry.center()

    const textMaterial = new THREE.MeshMatcapMaterial({matcap: matcapTexture}) //material
    // textMaterial.wireframe = true
    const text = new THREE.Mesh(textGeometry, textMaterial) //mesh
    scene.add(text) //add to scene
})

// add a console.time before the loop to see how long it takes to create 100 donuts 
console.time('donuts')
const donutGeometry = new THREE.TorusGeometry(0.35, 0.2, 16, 60)
const donutMaterial = new THREE.MeshMatcapMaterial({matcap: donutTexture})
// 100 donuts!
for (let i = 0; i < 500; i++) {
    const donut = new THREE.Mesh(donutGeometry, donutMaterial)
    // start with value from 0 to 1 (normalized) then multiply by 10 (as positive as negative)
    donut.position.x = (Math.random() -0.5) * 10
    donut.position.y = (Math.random() -0.5) * 10
    donut.position.z = (Math.random() -0.5) * 10

    donut.rotation.x = Math.random() * Math.PI
    donut.rotation.y = Math.random() * Math.PI

    const donutScale = Math.random() * 0.5
    donut.scale.set(donutScale, donutScale, donutScale)

    scene.add(donut)
}
console.timeEnd('donuts')

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 10)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()




import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';

/**
 * Base
 */

// debug
const gui = new GUI();

// cnavas
const canvas = document.querySelector('canvas.webgl')

// scene
const scene = new THREE.Scene()

/**
 * lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0x00fffc, 1.5)
directionalLight.position.set(1, 0.25, 0)
scene.add(directionalLight)
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, .5)
scene.add(directionalLightHelper)

gui.add(ambientLight, 'intensity').min(0).max(3).step(0.001)

const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.9)
scene.add(hemisphereLight)
const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, .5)
scene.add(hemisphereLightHelper)

const pointLight = new THREE.PointLight(0xff9000, 2.5, 10, 2)
pointLight.position.set(1, -0.5, 1)
scene.add(pointLight)
const pointLightHelper = new THREE.PointLightHelper(pointLight, .2)
scene.add(pointLightHelper)

gui.add(pointLight, 'intensity').min(0).max(10).step(0.001)

const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 2, 1, 1)
rectAreaLight.position.set(-1.5, 0, 1.5)
// after changng the position 
rectAreaLight.lookAt(new THREE.Vector3())
scene.add(rectAreaLight)
const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight)
scene.add(rectAreaLightHelper)

const spotLight = new THREE.SpotLight(0x78ff00, 4.5, 7, Math.PI * 0.1, 0.25, 1)
spotLight.position.set(0, 2, 3)
scene.add(spotLight)
spotLight.target.position.x = -1
scene.add(spotLight.target)
const spotLightHelper = new THREE.SpotLightHelper(spotLight)
scene.add(spotLightHelper)





/**
 * objects
 */
// material
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.4

// objects 
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(.5, 32, 32),
    material
);
sphere.position.x = - 1.5;

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(.75, .75, .75),
    material
);

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material
);
torus.position.x = 1.5;

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.5;

scene.add(sphere, cube, torus, plane);

/**
 * sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
window.addEventListener('resize', () => {
    // update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    
    // update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // update renderer 
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
})

/**
 * camera
 */
// base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// controls 
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // update objects 
    sphere.rotation.y = 0.1 * elapsedTime
    cube.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    cube.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // update controls
    controls.update()

    // render
    renderer.render(scene, camera)

    // request next frame
    window.requestAnimationFrame(tick)
}

tick()
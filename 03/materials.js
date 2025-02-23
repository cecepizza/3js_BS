import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import './style.css';
import GUI from 'lil-gui'

/**
 * debug UI
 */
const gui = new GUI()

/* base canvas */
const canvas = document.querySelector('canvas.webgl')

// scene 
const scene = new THREE.Scene()

//* sizes */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
// handle window resizing 
window.addEventListener('resize', () => {
    // updates sizes 
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // update camera 
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load('./static02/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('./static02/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('./static02/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('./static02/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('./static02/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('./static02/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('./static02/textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('./static02/textures/matcaps/8.png')
const gradientTexture = textureLoader.load('./static02/textures/gradients/5.jpg')

doorColorTexture.colorSpace = THREE.SRGBColorSpace
matcapTexture.colorSpace = THREE.SRGBColorSpace

// * objects */
// mesh basic material
    // const material = new THREE.MeshBasicMaterial()
    // material.map = doorColorTexture
    // material.color = new THREE.Color('red')
    // material.wireframe = true 
    // material.alphaMap = doorAlphaTexture
    // material.opacity = 0.5
    // material.transparent = true
    // material.side = THREE.DoubleSide

// MeshNormalMaterial
    // const material = new THREE.MeshNormalMaterial()
    // material.flatShading = true

// MeshMatcapMaterial
    // const material = new THREE.MeshMatcapMaterial()
    // material.matcap = matcapTexture

// MeshLambertMaterial
    //  const material = new THREE.MeshLambertMaterial()

// MeshPhongMaterial
    // const material = new THREE.MeshPhongMaterial()
    // material.shininess = 50
    // material.specular = new THREE.Color('red')

// // MeshToonMaterial
    // const material = new THREE.MeshToonMaterial()
    // gradientTexture.minFilter = THREE.NearestFilter // minecreft style - when you just want big pixels
    // gradientTexture.magFilter = THREE.NearestFilter 
    // gradientTexture.generateMipmaps = false
    // material.gradientMap = gradientTexture

// MeshStandardMaterial
const material = new THREE.MeshStandardMaterial()
material.metalness = 0.5
material.roughness = 0.5

gui.add(material, 'metalness').min(0).max(1).step(0.0001)
gui.add(material, 'roughness').min(0).max(1).step(0.0001)

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    material
)
sphere.position.x = - 1.5 

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1,1),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 16, 32),
    material
)
torus.position.x = 1.5

scene.add(sphere, plane, torus)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 30)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

//* camera */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// orbit controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true; // smoother controls

// renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// animation loop 
const clock = new THREE.Clock();

const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // update objects
    sphere.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime
    plane.rotation.y = 0.1 * elapsedTime

    sphere.rotation.y = -0.15 * elapsedTime
    torus.rotation.y = -0.15 * elapsedTime
    plane.rotation.y = -0.15 * elapsedTime

    
    // update controls
    controls.update();

    // render scene
    renderer.render(scene, camera);

    // call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();




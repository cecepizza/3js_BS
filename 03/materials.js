import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import './style.css';
import GUI from 'lil-gui'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
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

// // MeshStandardMaterial
    // const material = new THREE.MeshStandardMaterial()
    // material.metalness = 1
    // material.roughness = 1
    // material.map = doorColorTexture
    // material.aoMap = doorAmbientOcclusionTexture // add details to the object
    // material.aoMapIntensity = 1
    // material.displacementMap = doorHeightTexture
    // material.displacementScale = 0.1
    // material.metalnessMap = doorMetalnessTexture
    // material.roughnessMap = doorRoughnessTexture
    // material.normalMap = doorNormalTexture
    // material.normalScale.set(0.5, 0.5)
    // material.transparent = true
    // material.alphaMap = doorAlphaTexture

    // gui.add(material, 'metalness').min(0).max(1).step(0.0001)
    // gui.add(material, 'roughness').min(0).max(1).step(0.0001)

// MeshPhysicalMaterial
const material = new THREE.MeshPhysicalMaterial()
material.metalness = 0
material.roughness = 0
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture // add details to the object
// material.aoMapIntensity = 1
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.1
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorNormalTexture
// material.normalScale.set(0.5, 0.5)
// material.transparent = true
// material.alphaMap = doorAlphaTexture

gui.add(material, 'metalness').min(0).max(1).step(0.0001)
gui.add(material, 'roughness').min(0).max(1).step(0.0001)

// clearcoat 
    // material.clearcoat = 1
    // material.clearcoatRoughness = 0
    // gui.add(material, 'clearcoat').min(0).max(1).step(0.0001)

// sheen 
    // material.sheen = 1
    // material.sheenRoughness = 0.25
    // material.sheenColor.set(1,1,1)
    // gui.add(material, 'sheen').min(0).max(1).step(0.0001)
    // gui.add(material, 'sheenRoughness').min(0).max(1).step(0.0001)
    // gui.addColor(material, 'sheenColor')

// // iridescence 
    // material.iridescence = 1
    // material.iridescenceIOR = 1
    // material.iridescenceThicknessRange = [100, 800]

    // gui.add(material, 'iridescence').min(0).max(1).step(0.0001)
    // gui.add(material, 'iridescenceIOR').min(1).max(2.333).step(0.0001)
    // gui.add(material.iridescenceThicknessRange, '0').min(1).max(1000).step(1)
    // gui.add(material.iridescenceThicknessRange, '1').min(1).max(1000).step(1)

// // transmission 
material.transmission = 1
material.ior = 1.5
material.thickness = 0.5 

gui.add(material, 'transmission').min(0).max(1).step(0.0001)
gui.add(material, 'ior').min(1).max(10).step(0.0001)
gui.add(material, 'thickness').min(0).max(1).step(0.0001)


const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64),
    material
)
sphere.position.x = - 1.5 

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1,1, 100, 100),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 64, 128),
    material
)
torus.position.x = 1.5

scene.add(sphere, plane, torus)

/**
 * Lights
 */
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
// scene.add(ambientLight)

// const pointLight = new THREE.PointLight(0xffffff, 30)
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4
// scene.add(pointLight)


/** Environment Map */
const rgbeLoader = new RGBELoader()
rgbeLoader.load('./static02/textures/environmentMap/2k.hdr', (environmentMap) => {
    environmentMap.mapping = THREE.EquirectangularReflectionMapping
    scene.background = environmentMap
    scene.environment = environmentMap
})

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




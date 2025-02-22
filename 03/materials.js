import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import './style.css';

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


// * objects */
// mesh basic material
const material = new THREE.MeshBasicMaterial()

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
    new THREE.TorusGeometry(0.3,0.2,1,32),
    material
)

scene.add(sphere, plane, torus)

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

    // update controls
    controls.update();

    // render scene
    renderer.render(scene, camera);

    // call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();




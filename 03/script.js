import * as THREE from 'three';
import './style.css';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import GUI from 'lil-gui';


// lil- gui
const gui = new GUI()

// plain JS find position of the cursor
const cursor = {
    x: 0,
    y: 0 }
window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = - (event.clientY / sizes.height - 0.5)

    console.log(cursor.x, cursor.y);
})

// canvas - fetch the canvas element from the html
const canvas = document.querySelector('canvas.webgl');
console.log(canvas);

// scene 
const scene = new THREE.Scene();

// // geometry
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: false})

// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

const group = new THREE.Group()
scene.add(group);

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: false})
)
group.add(cube1);


const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: false})
)
cube2.position.x = -1.2;
cube2.position.z = -1;
group.add(cube2);

const cube3 = new THREE.Mesh(
new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: false})
)
cube3.position.x = 1.2;
cube3.position.z = .1;
group.add(cube3);

group.position.y = -.5
group.scale.y = 1.5;
group.rotation.y = 0.5;

// //position
// cube1.position.set(0.7, -0.6, 1);

// //rotation
// cube1.rotation.reorder('YXZ');
// cube1.rotation.y = Math.PI * 0.25;
// cube1.rotation.x = Math.PI * 0.25;

// //scale
// cube1.scale.set(2, 0.5, 0.5);


// const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);

//sizes
// save size in an object to reuse for camera, renderer, etc.
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
// listen for resize event
window.addEventListener('resize', () => {
    // update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // update camera aspect ration with the aspect property
    camera.aspect = sizes.width / sizes.height 

    // update orthographic camera frustum dimesions
    const aspectRatio = sizes.width / sizes.height;
    camera.left = -2 * aspectRatio;
    camera.right = 2 * aspectRatio;
    camera.top = 2;
    camera.bottom = -2;

    // updated the projection matrix with camera.updateProjectionMatrix 
    camera.updateProjectionMatrix()

    // // update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


})

// listen for double click event 
window.addEventListener('dblclick', () =>
    {
        const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
    
        if(!fullscreenElement)
        {
            if(canvas.requestFullscreen)
            {
                canvas.requestFullscreen()
            }
            else if(canvas.webkitRequestFullscreen)
            {
                canvas.webkitRequestFullscreen()
            }
        }
        else
        {
            if(document.exitFullscreen)
            {
                document.exitFullscreen()
            }
            else if(document.webkitExitFullscreen)
            {
                document.webkitExitFullscreen()
            }
        }
    })

    
// camera
// const camera = new THREE.PerspectiveCamera(70, sizes.width / sizes.height)
const aspectRatio = sizes.width / sizes.height;
const camera = new THREE.OrthographicCamera(2 * aspectRatio, -2 * aspectRatio, 2, -2, 0.1, 100)
camera.position.z = 3;
camera.position.y = 0;
camera.position.x = 0;
scene.add(camera);

gui.add(group.position, 'y')

// controls
const controls = new OrbitControls( camera, canvas ) 
// control what the camera is looking at
controls.target.y = 2
controls.update()
// camera looks straight at cube 
// camera.lookAt(mesh.position);

// renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
})

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const clock = new THREE.Clock();

// animation 
const tick = () => {

    const elapsedTime = clock.getElapsedTime();

    // // update camera 
    // camera.position.x = cursor.x * 3;
    // camera.position.y = cursor.y * 3;

    
    // cube1.rotation.y = Math.sin(elapsedTime);
    // cube1.position.x = Math.sin(elapsedTime);
    // cube1.position.y = Math.cos(elapsedTime);

    // cube2.position.x = Math.cos(elapsedTime);
    // cube2.position.y = Math.sin(elapsedTime);


    // cube3.position.x = Math.sin(elapsedTime) -1 ;
    // cube3.position.y = Math.cos(elapsedTime) -1;

    camera.lookAt(new THREE.Vector3());

    // take a picture of the scene from the camera point of view
    renderer.render(scene, camera);


    // pass or call this function every time the browser renders a new frame 
    window.requestAnimationFrame(tick);
}

tick();
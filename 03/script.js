import * as THREE from 'three';

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


const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

//sizes
// save size in an object to reuse for camera, renderer, etc.
const sizes = {
    width: 800,
    height: 600
}

// camera
const camera = new THREE.PerspectiveCamera(70, sizes.width / sizes.height)
camera.position.z = 3;
camera.position.y = 0;
camera.position.x = 0;
scene.add(camera);


// camera looks straight at cube 
// camera.lookAt(mesh.position);

// renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
})

renderer.setSize(sizes.width, sizes.height);

const clock = new THREE.Clock();

// animation 
const tick = () => {

    const elapsedTime = clock.getElapsedTime();


    // cube1.rotation.y = Math.sin(elapsedTime);
    cube1.position.x = Math.sin(elapsedTime);
    cube1.position.y = Math.cos(elapsedTime);

    cube2.position.x = Math.cos(elapsedTime);
    cube2.position.y = Math.sin(elapsedTime);


    cube3.position.x = Math.sin(elapsedTime) -1 ;
    cube3.position.y = Math.cos(elapsedTime) -1;

    camera.lookAt(cube3.position);

    // take a picture of the scene from the camera point of view
    renderer.render(scene, camera);


    // pass or call this function every time the browser renders a new frame 
    window.requestAnimationFrame(tick);
}

tick();
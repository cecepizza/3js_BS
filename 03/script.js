import * as THREE from 'three';

// canvas - fetch the canvas element from the html
const canvas = document.querySelector('canvas.webgl');
console.log(canvas);

// scene 
const scene = new THREE.Scene();

// geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true})

const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

//sizes
// save size in an object to reuse for camera, renderer, etc.
const sizes = {
    width: 800,
    height: 600
}

// camera
const camera = new THREE.PerspectiveCamera(70, sizes.width / sizes.height)
camera.position.z = 3;
scene.add(camera);

// renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
})

renderer.setSize(sizes.width, sizes.height);

// take a picture of the scene from the camera point of view
renderer.render(scene, camera);

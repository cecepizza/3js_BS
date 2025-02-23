import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import './styles.css'
import * as dat from 'dat.gui'
import typefaceFont from './three/examples/fonts/helvetiker_regular.typeface.json'

const gui = new dat.GUI()

const canvas = document.querySelector('canvas')

const scene = new THREE.Scene()


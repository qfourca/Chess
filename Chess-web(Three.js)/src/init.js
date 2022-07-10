import * as THREE from 'three'

import Camera from './easy/Camera'
import Scene from './easy/Scene'
import Renderer from './easy/Renderer'
import Raycaster from './easy/Raycaster'

import Chessboard from './asset/chessboard/Chessboard'
import Pon from './asset/chesspiece/Pon'

function animate() { 
	renderer.render(scene,camera); 
	requestAnimationFrame(animate); 
}
export default () => {
	const ligit = new THREE.DirectionalLight(0xffffff)
	ligit.position.set(0, 0, 1000)
	scene.add(ligit)

	// const hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 4); 
	// hemiLight.position.set(0, 0, 1000)
	// scene.add(hemiLight);


	const chessboard = new Chessboard()
	chessboard.render(scene)
	
	const pon = new Pon(scene)

	animate()
	// render()
}

export const scene = new Scene()
export const camera = new Camera(75, window.innerWidth / window.innerHeight)
export const renderer = new Renderer(window.innerWidth, window.innerHeight, document.getElementById('three-js container'))
export const raycaster = new Raycaster()
export const render = () => renderer.render(scene, camera)
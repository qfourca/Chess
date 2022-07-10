import * as THREE from 'three'

import Camera from './easy/Camera'
import Scene from './easy/Scene'
import Renderer from './easy/Renderer'
import Raycaster from './easy/Raycaster'

import Chessboard from './asset/chessboard/Chessboard'

import Chess from './logic/Chess'

import Moveable from './asset/Moveable'

function autoRender() { 
	render()
	requestAnimationFrame(autoRender); 
}
export default () => {
	const ligit = new THREE.DirectionalLight(0xffffff)
	ligit.position.set(0, 0, 1000)
	scene.add(ligit)


	const chessboard = new Chessboard()
	chessboard.render(scene)
	
	autoRender()
}

export const scene = new Scene()
export const camera = new Camera(75, window.innerWidth / window.innerHeight)
export const renderer = new Renderer(window.innerWidth, window.innerHeight, document.getElementById('three-js container'))
export const raycaster = new Raycaster()
export const chess = new Chess()
export const render = () => renderer.render(scene, camera)
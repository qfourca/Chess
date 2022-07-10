import * as THREE from 'three'
import { clickEventListener } from '../event/EventListeners';

export default class Renderer extends THREE.WebGLRenderer{
	constructor (width, height, domElement) {
		super({
			antialias: true
		})
		this.setSize(width, height)
		// this.physicallyCorrectLights = true
		domElement.appendChild(this.domElement);
		this.domElement.addEventListener("click", (event) => clickEventListener.event(event) ,false);
	}
}
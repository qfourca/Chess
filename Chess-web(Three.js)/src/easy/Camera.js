import * as THREE from 'three'

export default class Camera extends THREE.PerspectiveCamera{
	constructor (FOV, size) {
		super(FOV, size)
		this.position.z = 1000
	}
}


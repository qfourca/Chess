import * as THREE from 'three'

export default class Floor {
    constructor() {
        this.material = new THREE.MeshStandardMaterial({
            roughness: 0.5,
            color: 0x55D7D7
        })
        this.geometry = new THREE.PlaneGeometry(50, 50)
        this.mesh = new THREE.Mesh(this.geometry, this.material)    
    }
    render(scene, coordinate) {
        const pos = this.__coordinateToPos__(coordinate)
        this.mesh.position.set(pos.x, pos.y, 15)
        scene.add(this.mesh)
    }
    dispose(scene) {
        scene.remove(this.mesh)
    }
    __coordinateToPos__(coordinate) {
        return {
            x: -350 + coordinate.rank * 100,
            y: -350 + coordinate.file * 100
        }
    }
}
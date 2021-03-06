import * as THREE from 'three'

export default class Floor {
    constructor(coordinate) {
        this.material = new THREE.MeshStandardMaterial({
            roughness: 0.5,
            color: 0x55D7D7
        })
        this.geometry = new THREE.PlaneGeometry(80, 80)
        this.mesh = new THREE.Mesh(this.geometry, this.material)  
        this.coordinate = coordinate
    }
    render(scene) {
        const pos = this.coordinate.toPos()
        this.mesh.position.set(pos.x, pos.y, 10)
        scene.add(this.mesh)
    }
    dispose(scene) {
        scene.remove(this.mesh)
    }
}
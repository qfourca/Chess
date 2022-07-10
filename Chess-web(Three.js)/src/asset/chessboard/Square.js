import * as THREE from 'three'


export default class Square{
    constructor(color) {
        this.color = color
        this.material = new THREE.MeshStandardMaterial({
            roughness: 0.7,
            color: this.color ? 0xF6F6F6 : 0x373737
        })
        this.geometry = new THREE.PlaneGeometry(100, 100)
        this.mesh = new THREE.Mesh(this.geometry, this.material) 

    }
    render(scene, opction) {
        if(opction) {
            if(opction.position) {
                this.mesh.position.set(opction.position.x, opction.position.y, opction.position.z)
            }
        }
        scene.add(this.mesh)
    }
}
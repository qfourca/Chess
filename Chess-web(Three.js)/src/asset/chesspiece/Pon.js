import * as THREE from 'three'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { render } from '../../init'

export default class Pon{
    constructor(scene, color) {
        this.scene = scene
        const loader = new GLTFLoader();
        loader.load( './static/assets/chesspieces.glb', ( gltf ) =>{
            this.mesh = gltf.scene.children[0]
            this.mesh.material = new THREE.MeshStandardMaterial({color: 0xf0f0f0});
            console.log(this.mesh)
            console.log(this.mesh.name)

            this.mesh.position.set(100, 100, 10)
            scene.add(this.mesh)
        }, undefined, ( error ) => {
            console.error( error );
        } );
    }
    render() {

    }
}
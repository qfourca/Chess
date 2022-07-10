import * as THREE from 'three'
import { raycaster, camera, scene } from '../init'
export default class Click {
    constructor() {
        this.__events__ = new Map()
        this.mouse = new THREE.Vector2();
    }
    event(event) {
        let gap1 = event.clientX - event.offsetX
        let gap2 = event.clientY - event.offsetY
        this.mouse.x = ( (event.clientX - gap1)/(window.innerWidth) )*2 -1;
        this.mouse.y =  -( (event.clientY-gap2)/(window.innerHeight ) )*2 +1;
        raycaster.setFromCamera(this.mouse,camera);
        const intersectObjects = raycaster.intersectObjects(scene.children)
        intersectObjects.forEach(element => {
            this.executeEvent(element.object)
        })
    }
    addEvent(object, event) {
        if(this.__events__.has(object)) {
            console.log("Already Exist event")
        }
        else {
            this.__events__.set(object, event)
        }
    }
    deleteEvent(object) {
        this.__events__.delete(object)
    }
    executeEvent (object) {
        if(this.__events__.get(object)) {
            this.__events__.get(object)()
        }
    }
}
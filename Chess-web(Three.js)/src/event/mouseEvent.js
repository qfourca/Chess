import TWEEN from 'tween'
import * as THREE from 'three'
import { camera, scene, renderer, mouse } from '../init'
import { Vector2 } from 'three'

let isMouseDown = false
document.body.addEventListener('mousemove', (event) => {
    event.preventDefault()
    if(isMouseDown) {
        camera.cameraMove.rotate(new Vector2(-event.movementX, event.movementY))
    }
    
})

document.body.addEventListener('mousedown', (event) => {
    isMouseDown = true
})

document.body.addEventListener('mouseup', (event) => {
    isMouseDown = false
})

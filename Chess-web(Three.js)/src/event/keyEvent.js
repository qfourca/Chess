import { camera, mouse } from '../init'

window.addEventListener('keydown', event => {
	if(event.key == 'w') {	
		camera.cameraMove.startMove('y', false)
	}
	else if(event.key == 'a') {
		camera.cameraMove.startMove('x', true)
	}
	else if(event.key == 's') {
		camera.cameraMove.startMove('y', true)
	}
	else if(event.key == 'd') {
		camera.cameraMove.startMove('x', false)
	}
	else if(event.key == 'q') {
		camera.cameraMove.startMove('z', false)
	}
	else if(event.key == 'e') {
		camera.cameraMove.startMove('z', true)
	}
})

window.addEventListener('keyup', event => {
	
	if(event.key == 'w') {
		camera.cameraMove.stopMove('y')
	}
	else if(event.key == 'a') {
		camera.cameraMove.stopMove('x')
	}
	else if(event.key == 's') {
		camera.cameraMove.stopMove('y')
	}
	else if(event.key == 'd') {
		camera.cameraMove.stopMove('x')
	}
	else if(event.key == 'q') {
		camera.cameraMove.stopMove('z')
	}
	else if(event.key == 'e') {
		camera.cameraMove.stopMove('z')
	}
})
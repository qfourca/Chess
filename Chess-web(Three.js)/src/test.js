import * as THREE from 'three'
let scene,camera,renderer,light1,light2,rayCast,mouse;
let sphere,cube;

let onMouseClick = function(e){
    
    let gap1 = e.clientX - e.offsetX
    let gap2 = e.clientY - e.offsetY
    mouse.x = ( (e.clientX - gap1)/(window.innerWidth*0.375) )*2 -1;
    mouse.y =  -( (e.clientY-gap2)/(window.innerHeight*0.375) )*2 +1;
    
    rayCast.setFromCamera(mouse,camera);
}

let createGeometry = function(){
     let geometry = new THREE.BoxGeometry(4,4,4);
     let material = new THREE.MeshLambertMaterial({color:0xabcdef});
     cube = new THREE.Mesh(geometry,material);
     cube.position.set(0,2,3);
     scene.add(cube);
   
     geometry = new THREE.SphereGeometry(4,30,30);
     material = new THREE.MeshLambertMaterial({color:0xabcdef});
     sphere = new THREE.Mesh(geometry,material);
     sphere.position.set(5,2,3);
     scene.add(sphere);    
}

let init = function(){
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.01,10000);
    camera.position.set(0,10,40);
    camera.lookAt(scene.position);
    
    light1 = new THREE.DirectionalLight(0xffffff,1);
    light2 = new THREE.DirectionalLight(0xffffff,1);
    light2.position.set(0,-5,2);
    scene.add(light1);
    scene.add(light2);

    createGeometry();
  
    rayCast = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    mouse.x = mouse.y = -1;
 
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth*0.375,window.innerHeight*0.375);

   document.getElementById('three-js container').appendChild(renderer.domElement);
   renderer.domElement.addEventListener("click",onMouseClick,false);
}

let mainLoop = function(){
     sphere.material.color.set(0x0450fb);
     cube.material.color.set(0xff4500);
     let intersects = rayCast.intersectObjects(scene.children);
     intersects.forEach(obj=>obj.object.material.color.set(0x00ff00));

     requestAnimationFrame(mainLoop);
     renderer.render(scene,camera);
}

init()
mainLoop();

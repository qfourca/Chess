import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export let pawn = new Object()
export let bisop = new Object()
export let knight = new Object()
export let rook = new Object()
export let queen = new Object()
export let king = new Object()
export let loading = true


const loader = new GLTFLoader()
loader.load( './static/assets/chesspieces.glb', ( gltf ) => {
    console.log('loading success')
    gltf.scene.children.forEach(element => {
        element.scale.set(50, 50, 50)
        switch (element.name) {
            case 'pawn': pawn = element; break;
            case 'bisop': bisop = element; break;
            case 'knight': knight = element; break;
            case 'rook': rook = element; break;
            case 'queen': queen = element; break;
            case 'king': king = element; break;
        }
    })
    loading = false
}, undefined, ( error ) => {
    console.error( error );
} );

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export let pawn = new Object
export let bisop = new Object
export let knight = new Object
export let rook = new Object
export let queen = new Object
export let king = new Object

const pieceList = [
    { piece: pawn, name: "pawn" },
    { piece: bisop, name: "bisop" },
    { piece: knight, name: "knight" },
    { piece: rook, name: "rook" },
    { piece: queen, name: "queen" },
    { piece: king, name: "king" }
]

const loader = new GLTFLoader()
loader.load( './static/assets/chesspieces.glb', ( gltf ) =>{
    console.log('loading success')
    gltf.scene.children.forEach(element => {
        pieceList.forEach(piece => {
            if(piece.name === element.name) {
                element.scale.set(50, 50, 50)
                piece.piece = element
                console.log(piece.name)
            }

        })
    })
}, undefined, ( error ) => {
    console.error( error );
} );


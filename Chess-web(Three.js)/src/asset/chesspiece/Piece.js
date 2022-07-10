import * as THREE from 'three'
import { pawn, bisop, knight, rook, queen, king, loading } from "./chesspieces";

export default class Piece {
    constructor(scene, piece, color, coordinate) {
        this.coordinate = coordinate
        this.position = coordinate.toPos()
        this.type = piece
        this.color = color
        const loadingCheck = setInterval(() => {
            if(loading) { console.log('loading.....') }
            else { 
                clearInterval(loadingCheck)
                switch (piece) {
                    case 'pawn': this.mesh = pawn.clone(); break;
                    case 'bisop': this.mesh = bisop.clone(); break;
                    case 'knight': this.mesh = knight.clone(); break;
                    case 'rook': this.mesh = rook.clone(); break;
                    case 'queen': this.mesh = queen.clone(); break;
                    case 'king': this.mesh = king.clone(); break;
                }
                this.mesh.material = new THREE.MeshStandardMaterial({color: color ? 0xffffff : 0x4B0D0D})
                this.mesh.position.set(this.position.x, this.position.y, 10)
                scene.add(this.mesh)
            }   
        }, 10);
    }
}
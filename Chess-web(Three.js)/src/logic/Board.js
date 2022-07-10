import { scene } from "../init"
import Piece from "../asset/chesspiece/Piece"
import Coordinate from './Coordinate'
import Moveable from "../asset/Moveable"
export default class Board {
    constructor() {
        this.board = new Array(8)
        for(let i = 0; i < 8; i++) {
            this.board[i] = new Array(8)
        }
        for(let i=0;i<8;i++) {
            this.board[1][i] = new Piece(scene, 'pawn', true, new Coordinate(i, 1))
            this.board[6][i] = new Piece(scene, 'pawn', false, new Coordinate(i, 6))
        }
        [
            'rook',
            'knight',
            'bisop',
            'queen',
            'king',
            'bisop',
            'knight',
            'rook'
        ].forEach((element, idx) => {
            this.board[0][idx] = new Piece(scene, element, true, new Coordinate(idx, 0))
            this.board[7][idx] = new Piece(scene, element, false, new Coordinate(idx, 7))
        })
    }
    moveable(coordinate) {
        const piece = this.board[coordinate.file][coordinate.rank]
        console.log(piece ? piece.type : null)
        switch(piece.type) {
            case 'pawn': return this.__ponMoveable__(coordinate)
        }
        
    }
    __ponMoveable__(coordinate) {
        const color = this.board[coordinate.file][coordinate.rank].color
        let ret = new Array(8)
        for(let i = 0; i < 8; i++) { ret[i] = new Array(8) }
        if(color) {
            
        }
        return ret
    }
    __knightMoveable__(coordinate) {

    }

}

import { scene } from "../init"
import Piece from "../asset/chesspiece/Piece"
import Moveable from "../asset/Moveable"
export default class Board {
    constructor() {
        this.board = new Array(8)
        for(let i = 0; i < 8; i++) {
            this.board[i] = new Array(8)
        }
        for(let i=0;i<8;i++) {
            this.board[1][i] = new Piece(scene, 'pawn', true, {file: 1, rank: i})
            this.board[6][i] = new Piece(scene, 'pawn', false, {file: 6, rank: i})
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
            this.board[0][idx] = new Piece(scene, element, true, {file: 0, rank: idx})
            this.board[7][idx] = new Piece(scene, element, false, {file: 7, rank: idx})
        })
    }
    moveable(coordinate) {
        const moveable = new Moveable()
        moveable.render(scene, {rank: 4, file: 4})
    }
}

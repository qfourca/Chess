import Board from "./Board";
import Moveable from "../asset/Moveable"
import { scene } from "../init";
import Coordinate from "./Coordinate";
export default class Chess {
    constructor(color) {
        this.board = new Board()
        this.moveable = new Array
        this.clicked = undefined
        this.myColor = color
    }
    click(coordinate) {
        if(this.clicked) {
            let moveable = this.board.moveable(this.clicked) 
            if(moveable[coordinate.file][coordinate.rank]) {
                this.move(this.clicked, coordinate)
                this.__removeMoveable__()
                this.clicked = undefined
            }
            else {
                moveable = this.board.moveable(coordinate)
                if(moveable) {
                    this.clicked = coordinate
                    this.__removeMoveable__()
                    this.__renderMoveable__(moveable)
                }
            }
        }
        else {
            let moveable = this.board.moveable(coordinate)
            if(moveable == undefined) {
                
            }
            else {
                this.clicked = coordinate
                this.__removeMoveable__()
                this.__renderMoveable__(moveable)
            }
        }
        
    }
    move(from, to) {
        const fromPiece = this.board.getPiece(from)
        const toPiece = this.board.getPiece(to)
        this.board.board[to.file][to.rank] = fromPiece
        this.board.board[from.file][from.rank] = undefined
        if(toPiece != undefined) toPiece.dispose(scene)
        fromPiece.move(to, 70)
    }
    __renderMoveable__(moveable) {
        moveable.forEach((first, i) => {
            first.forEach((element, j) => {
                if(element) {
                    this.moveable.push(new Moveable(new Coordinate(j, i)))
                }
            })
        })
        this.moveable.forEach(element => {
            element.render(scene)
        })
    }
    __removeMoveable__() {
        this.moveable.forEach(element => {
            element.dispose(scene)
        })
        this.moveable = null
        this.moveable = new Array
    }
}
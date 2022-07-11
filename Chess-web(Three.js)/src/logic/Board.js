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
    moveable(coor) {
        const coordinate = {...coor}
        const piece = this.getPiece(coordinate)
        if(piece == undefined) return piece
        switch(piece.type) {
            case 'pawn': return this.__ponMoveable__(coordinate)
            case 'knight': return this.__shortMoveable__(coordinate, piece.type)
            case 'king': return this.__shortMoveable__(coordinate, piece.type)
            case 'bisop': return this.__longMoveable__(coordinate, piece.type)
            case 'rook': return this.__longMoveable__(coordinate, piece.type)
            case 'queen': return this.__longMoveable__(coordinate, piece.type)
        }
    }
    __ponMoveable__(coordinate) {
        const color = this.getPiece(coordinate).color
        const mypos = {...coordinate}
        let ret = this.__initMoveable__()

        if(color) {
            coordinate.file += 1
            let temp = this.getPiece(coordinate)
            if(temp == undefined) {
                ret[coordinate.file][coordinate.rank] = true
                coordinate.file += 1
                if(coordinate.file == 3) {
                    temp = this.getPiece(coordinate)
                    if(temp == undefined) {
                        ret[coordinate.file][coordinate.rank] = true
                    }
                }
            }
            coordinate = mypos
            coordinate.file += 1
            coordinate.rank += 1
            temp = this.getPiece(coordinate)
            if(temp != undefined) {
                if(temp.color != color) {
                    ret[coordinate.file][coordinate.rank] = true
                }
            }
            coordinate.rank -= 2
            temp = this.getPiece(coordinate)
            if(temp != undefined) {
                if(temp.color != color) {
                    ret[coordinate.file][coordinate.rank] = true
                }
            }
        }
        else {
            coordinate.file -= 1
            let temp = this.getPiece(coordinate)
            if(temp == undefined) {
                ret[coordinate.file][coordinate.rank] = true
                coordinate.file -= 1
                if(coordinate.file == 4) {
                    temp = this.getPiece(coordinate)
                    if(temp == undefined) {
                        ret[coordinate.file][coordinate.rank] = true
                    }
                }
            }
            coordinate = mypos
            coordinate.file -= 1
            coordinate.rank += 1
            temp = this.getPiece(coordinate)
            if(temp != undefined) {
                if(temp.color != color) {
                    ret[coordinate.file][coordinate.rank] = true
                }
            }
            coordinate.rank -= 2
            temp = this.getPiece(coordinate)
            if(temp != undefined) {
                if(temp.color != color) {
                    ret[coordinate.file][coordinate.rank] = true
                }
            }
        }
        return ret
    }
    __shortMoveable__(coordinate, type) {
        const color = this.getPiece(coordinate).color
        let ret = this.__initMoveable__()
        const check = (coor) => {
            const my = this.getPiece(coor)
            return my == undefined || my.color != color
        }
        let array
        if(type == 'knight') {
            array = [
                new Coordinate(coordinate.rank + 2, coordinate.file + 1),
                new Coordinate(coordinate.rank + 2, coordinate.file - 1),
                new Coordinate(coordinate.rank - 2, coordinate.file + 1),
                new Coordinate(coordinate.rank - 2, coordinate.file - 1),
                new Coordinate(coordinate.rank + 1, coordinate.file + 2),
                new Coordinate(coordinate.rank + 1, coordinate.file - 2),
                new Coordinate(coordinate.rank - 1, coordinate.file + 2),
                new Coordinate(coordinate.rank - 1, coordinate.file - 2)
            ]
        }
        else if(type == 'king') {
            array = [
                new Coordinate(coordinate.rank + 1, coordinate.file + 1),
                new Coordinate(coordinate.rank + 1, coordinate.file - 1),
                new Coordinate(coordinate.rank + 1, coordinate.file),
                new Coordinate(coordinate.rank, coordinate.file - 1),
                new Coordinate(coordinate.rank, coordinate.file + 1),
                new Coordinate(coordinate.rank - 1, coordinate.file + 1),
                new Coordinate(coordinate.rank - 1, coordinate.file - 1),
                new Coordinate(coordinate.rank - 1, coordinate.file)
            ]
        }
        array.forEach(element => {
            if(!element.outOfBound()) {
                ret[element.file][element.rank] = check(element)
            }
        })
        return ret
    }
    __longMoveable__(coordinate, type) {
        const color = this.getPiece(coordinate).color
        let ret = this.__initMoveable__()
        const check = (coor, func) => {
            coor = func(coor)
            if(coor.outOfBound()) { return; }
            
            const my = this.getPiece(coor)
            if(my == undefined) {
                ret[coor.file][coor.rank] = true
                check(coor, func)
            }
            else if(my.color != color) {
                ret[coor.file][coor.rank] = true
            }
        }
        let array
        if(type == 'bisop') {
            array = [
                arg => new Coordinate(arg.rank + 1, arg.file + 1),
                arg => new Coordinate(arg.rank + 1, arg.file - 1),
                arg => new Coordinate(arg.rank - 1, arg.file + 1),
                arg => new Coordinate(arg.rank - 1, arg.file - 1)
            ]
        }
        else if(type == 'rook') {
            array = [
                arg => new Coordinate(arg.rank + 1, arg.file),
                arg => new Coordinate(arg.rank, arg.file - 1),
                arg => new Coordinate(arg.rank - 1, arg.file),
                arg => new Coordinate(arg.rank, arg.file + 1)
            ]
        }
        else if(type == 'queen') {
            array = [
                arg => new Coordinate(arg.rank + 1, arg.file + 1),
                arg => new Coordinate(arg.rank + 1, arg.file - 1),
                arg => new Coordinate(arg.rank - 1, arg.file + 1),
                arg => new Coordinate(arg.rank - 1, arg.file - 1),
                arg => new Coordinate(arg.rank + 1, arg.file),
                arg => new Coordinate(arg.rank, arg.file - 1),
                arg => new Coordinate(arg.rank - 1, arg.file),
                arg => new Coordinate(arg.rank, arg.file + 1)
            ]
        }
        else {
            console.log("Unknown")
        }
        array.forEach(element => {
            check(coordinate, element)
        })
        return ret
    }
    
    getPiece(coordinate) {
        return this.board[coordinate.file][coordinate.rank]
    }
    __initMoveable__() {
        let ret = new Array(8)
        for(let i = 0; i < 8; i++) { ret[i] = new Array(8) }
        for(let i = 0; i < 8; i++) {
            for(let j = 0; j < 8; j++) {
                ret[i][j] = false
            }
        }
        return ret
    }
}

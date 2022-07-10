import { Vector3 } from 'three'
import Floor from './Floor'
import Square from './Square'
import { chess } from '../../init'
import { clickEventListener } from '../../event/EventListeners'

export default class Playground{
    constructor() {
        this.floor = new Floor()
        this.squares = new Array(8)
        for(let i = 0; i < 8; i++) {
            this.squares[i] = new Array(8)
            for(let j = 0; j < 8; j++) {
                this.squares[i][j] = new Square(i % 2 != j % 2)
                clickEventListener.addEvent(this.squares[i][j].mesh, () => console.log(chess.board.moveable({file: i, rank: j})))
            }
        }
    }
    render(scene) {
        this.floor.render(scene, {
            position: new Vector3(0, 0, 0) 
        })
        this.squares.forEach((dimension1, i) => {
            dimension1.forEach((element, j) => {
                element.render(scene, {
                    position: new Vector3(-350 + j * 100, -350 + i * 100, 5)
                })
            })
        })
    }
}
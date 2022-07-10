import Board from "./Board";

export default class Chess {
    constructor() {
        this.board = new Board()
        this.moveable = new Array(8)
    }
    renderMoveable(moveable) {
        this.moveable = moveable
    }
    removeMoveable() {

    }
}
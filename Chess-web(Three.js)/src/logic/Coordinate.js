export default class Coordinate {
    constructor(rank, file) {
        this.rank = rank
        this.file = file
    }
    move(coordinate) {

    }
    toPos() {
        return {
            x: -350 + this.rank * 100,
            y: -350 + this.file * 100
        }
    }
    outOfBound() {
        return !(this.file < 8 && this.file >= 0 && this.rank < 8 && this.rank >= 0)
    }
}
//
//  Chess.swift
//  Chess
//
//  Created by 김건호 on 2022/05/04.
//

import Foundation
struct Coordinate:Equatable {
    var X:Int
    var Y:Int
    init(X: Int, Y: Int) {
        self.X = X
        self.Y = Y
    }
    func outOfBoundCheck () -> Bool {
        return X < 0 || X > 7 || Y < 0 || Y > 7
    }
}
struct Colors {
    var white:String {get {return "white"}}
    var black:String {get {return "black"}}
    var empty:String {get {return "empty"}}
    
    func reverseColor(color:String) -> String {
        return color == self.white ? self.black : self.white
    }
}
struct Pieces {
    var empty:String {get {return "empty"}}
    var pon:String {get {return "pon"}}
    var knight:String {get {return "knight"}}
    var bisop:String {get {return "bisop"}}
    var rook:String {get {return "rook"}}
    var queen:String {get {return "queen"}}
    var king:String {get {return "king"}}
}
class Chess: ObservableObject {
    let colors:Colors = Colors()
    let pieces:Pieces = Pieces()
    @Published var myColor:String
    @Published var board = [[ChessPiece]](repeating: Array(repeating: ChessPiece(piece: "empty", color: "empty") ,count: 8), count: 8)
    @Published var movementBoard = [[Bool]](repeating: Array(repeating: false ,count: 8), count: 8)
    @Published var isClicked:Coordinate? = nil
    let communication:Communication = Communication()
    
    init() {
        self.myColor = "black"
        if(!(self.myColor == "white" || self.myColor == "black")) {
            return
        }
        for i in 0 ..< 8 {
            board[1][i] = ChessPiece(piece: self.pieces.pon, color: self.colors.white)
        }
        for i in 0 ..< 8 {
            board[6][i] = ChessPiece(piece: self.pieces.pon, color: self.colors.black)
        }
        let layout = [
            self.pieces.rook,
            self.pieces.knight,
            self.pieces.bisop,
            self.pieces.queen,
            self.pieces.king,
            self.pieces.bisop,
            self.pieces.knight,
            self.pieces.rook
        ]
        for (index, element) in layout.enumerated() {
            board[0][index] = ChessPiece(piece: element, color: self.colors.white)
        }
        for (index, element) in layout.enumerated() {
            board[7][index] = ChessPiece(piece: element, color: self.colors.black)
        }
        
        DispatchQueue.global().async {
            self.communication.connect(movePiece: self.unsafeMovePiece)
            self.communication.setColor(setColor: { (color:String) -> () in self.myColor = color })
        }
    }
    func whereCanGo(coordinate:Coordinate) -> Array<Array<Bool>>?{
        let bisopMovement = [
            { (coor:Coordinate) in return Coordinate(X: coor.X + 1, Y: coor.Y + 1) },
            { (coor:Coordinate) in return Coordinate(X: coor.X - 1, Y: coor.Y + 1) },
            { (coor:Coordinate) in return Coordinate(X: coor.X + 1, Y: coor.Y - 1) },
            { (coor:Coordinate) in return Coordinate(X: coor.X - 1, Y: coor.Y - 1) }
        ]
        let rookMovement = [
            { (coor:Coordinate) in return Coordinate(X: coor.X + 1, Y: coor.Y) },
            { (coor:Coordinate) in return Coordinate(X: coor.X - 1, Y: coor.Y) },
            { (coor:Coordinate) in return Coordinate(X: coor.X, Y: coor.Y + 1) },
            { (coor:Coordinate) in return Coordinate(X: coor.X, Y: coor.Y - 1) }
        ]
        let queenMovement = bisopMovement + rookMovement
        let knightMovement = [
            Coordinate(X: coordinate.X + 2, Y: coordinate.Y + 1),
            Coordinate(X: coordinate.X + 2, Y: coordinate.Y - 1),
            Coordinate(X: coordinate.X + 1, Y: coordinate.Y + 2),
            Coordinate(X: coordinate.X + 1, Y: coordinate.Y - 2),
            Coordinate(X: coordinate.X - 2, Y: coordinate.Y + 1),
            Coordinate(X: coordinate.X - 2, Y: coordinate.Y - 1),
            Coordinate(X: coordinate.X - 1, Y: coordinate.Y + 2),
            Coordinate(X: coordinate.X - 1, Y: coordinate.Y - 2)
        ]
        let kingMovement = [
            Coordinate(X: coordinate.X + 1, Y: coordinate.Y + 1),
            Coordinate(X: coordinate.X + 1, Y: coordinate.Y - 1),
            Coordinate(X: coordinate.X + 1, Y: coordinate.Y),
            Coordinate(X: coordinate.X, Y: coordinate.Y - 1),
            Coordinate(X: coordinate.X - 1, Y: coordinate.Y + 1),
            Coordinate(X: coordinate.X - 1, Y: coordinate.Y - 1),
            Coordinate(X: coordinate.X - 1, Y: coordinate.Y),
            Coordinate(X: coordinate.X, Y: coordinate.Y + 1)
        ]
        switch (self.board[coordinate.Y][coordinate.X].piece) {
        case self.pieces.pon: return ponCanGo(coordinate: coordinate)
        case self.pieces.knight: return shortPieceCanGo(coordinate: coordinate, movementList: knightMovement)
        case self.pieces.bisop: return longPieceCanGo(coordinate: coordinate, movementFun: bisopMovement)
        case self.pieces.rook: return longPieceCanGo(coordinate: coordinate, movementFun: rookMovement)
        case self.pieces.queen: return longPieceCanGo(coordinate: coordinate, movementFun: queenMovement)
        case self.pieces.king: return shortPieceCanGo(coordinate: coordinate, movementList: kingMovement)
        default: return nil
        }
    }
    
    func movePiece (from:Coordinate, to:Coordinate) -> String {
        if(board[from.Y][from.X].piece == self.pieces.empty) {
            return "Impossable to move WITH BUG"
        }
        else if(board[to.Y][to.X].color == self.myColor) {
            return "New selection"
        }
        else {
            let moveCheck = whereCanGo(coordinate: from)
            if((moveCheck ?? [[Bool]](repeating: Array(repeating: false ,count: 8), count: 8))[to.Y][to.X]) {
                unsafeMovePiece(from: from, to: to)
                self.communication.sendMessage(message: "\(from.X)\(from.Y)=>\(to.X)\(to.Y)")
                return "success"
            }
            else {
                return "Impossable to move"
            }
        }
    }
    
    private func unsafeMovePiece (from:Coordinate, to:Coordinate) {
        print(board[from.Y][from.X].piece, board[to.Y][to.X].piece)
        board[to.Y][to.X] = board[from.Y][from.X]
        board[from.Y][from.X] = ChessPiece(piece: self.pieces.empty, color: self.colors.empty)
    }
    
    func click(coordinate:Coordinate) {
        if(self.myColor == self.board[coordinate.Y][coordinate.X].color) {
            self.isClicked = coordinate
            let movement = self.whereCanGo(coordinate: coordinate)
            if(movement != nil) {
                self.movementBoard = movement ?? [[Bool]](repeating: Array(repeating: false ,count: 8), count: 8)
            }
        }
        else {
            self.isClicked = nil
        }
    }

    private func allowType(coordinate:Coordinate, list:Array<String>) -> Bool {
        if(coordinate.outOfBoundCheck()) { return false }
        let color:String = self.board[coordinate.Y][coordinate.X].color
        return list.contains(color)
    }
    private func ponCanGo(coordinate:Coordinate) -> Array<Array<Bool>>{
        var board = [[Bool]](repeating: Array(repeating: false ,count: 8), count: 8)
        let myColor:String = self.board[coordinate.Y][coordinate.X].color
        var tempCoordinate:Coordinate
        var error:Bool
        func gotoThere (coordinate:Coordinate, list:Array<String>) -> Bool {
            if(allowType(coordinate: coordinate, list: list) && !coordinate.outOfBoundCheck()) {
                board[coordinate.Y][coordinate.X] = true
                return true
            }
            return false
        }
        tempCoordinate = Coordinate(X: coordinate.X, Y: coordinate.Y + (myColor == self.colors.white ? 1 : -1))
        if(gotoThere(coordinate: tempCoordinate, list: [self.colors.empty]) && coordinate.Y == (myColor == self.colors.white ? 1 : 6)) {
            tempCoordinate = Coordinate(X: coordinate.X, Y: coordinate.Y + (myColor == self.colors.white ? 2 : -2))
            error = gotoThere(coordinate: tempCoordinate, list: [self.colors.empty])
        }
        tempCoordinate = Coordinate(X: coordinate.X + 1, Y: coordinate.Y + (myColor == self.colors.white ? 1 : -1))
        error = gotoThere(coordinate: tempCoordinate, list: [myColor == self.colors.white ? self.colors.black : self.colors.white])
        tempCoordinate = Coordinate(X: coordinate.X - 1, Y: coordinate.Y + (myColor == self.colors.white ? 1 : -1))
        error = gotoThere(coordinate: tempCoordinate, list: [myColor == self.colors.white ? self.colors.black : self.colors.white])
        
        return board
    }
    
    private func shortPieceCanGo(coordinate:Coordinate, movementList: Array<Coordinate>) -> Array<Array<Bool>>{
        var board = [[Bool]](repeating: Array(repeating: false ,count: 8), count: 8)
        let enemyColor:String = self.colors.reverseColor(color: self.board[coordinate.Y][coordinate.X].color)
        func gotoThere (coordinate:Coordinate, ememy:String) {
            if(allowType(coordinate: coordinate, list: [ememy, self.colors.empty]) && !coordinate.outOfBoundCheck()) {
                board[coordinate.Y][coordinate.X] = true
            }
        }
        for element in movementList {
            gotoThere(coordinate: element, ememy: enemyColor)
        }
        return board
    }
    private func longPieceCanGo(coordinate:Coordinate, movementFun:Array<(Coordinate) -> Coordinate>) -> Array<Array<Bool>> {
        var board = [[Bool]](repeating: Array(repeating: false ,count: 8), count: 8)
        
        func gotoThere (coordinate:Coordinate, myColor:String, changeCoor:(Coordinate) -> Coordinate) {
            let tempCoordinate:Coordinate = changeCoor(coordinate)
            if(allowType(coordinate: tempCoordinate, list: [self.colors.reverseColor(color: myColor), self.colors.empty])
            && !tempCoordinate.outOfBoundCheck()) {
                board[tempCoordinate.Y][tempCoordinate.X] = true
                if(allowType(coordinate: tempCoordinate, list: [self.colors.empty])) {
                    gotoThere(coordinate: tempCoordinate, myColor: myColor, changeCoor: changeCoor)
                }
            }
        }
        for element in movementFun {
            gotoThere(coordinate: coordinate, myColor: self.board[coordinate.Y][coordinate.X].color, changeCoor: element)
        }
        return board
    }
}

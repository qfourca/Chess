//
//  ChessPiece.swift
//  Chess
//
//  Created by 김건호 on 2022/05/04.
//

import Foundation

class ChessPiece {
    var piece:String
    var color:String
    var asset:String { get {
        return self.color + "-" + self.piece
    }}
    
    init(piece:String, color: String) {
        self.piece = piece
        self.color = color
    }
    func whereCanIGo(chessBoard: Array<Array<ChessPiece>>, coordinate:Coordinate) -> Array<Array<Bool>> {
        let board = [[Bool]](repeating: Array(repeating: false ,count: 8), count: 8)
        return board
    }
    
}



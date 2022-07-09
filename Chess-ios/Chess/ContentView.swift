//
//  ContentView.swift
//  Test
//
//  Created by 김건호 on 2022/04/28.
//

import SwiftUI

struct ContentView: View {
    
    @State private var isXX: Bool = false
    
    @ObservedObject
    var chess:Chess = Chess()
    
    var body: some View {
        VStack(spacing: 0) {
            ForEach((chess.myColor == chess.colors.white ? Array(chess.board.enumerated()).reversed() : Array(chess.board.enumerated())), id: \.offset) { verIdx, element in
                HStack(spacing: 0) {
                    ForEach((chess.myColor == chess.colors.white ? Array(element.enumerated()) : Array(element.enumerated()).reversed()), id: \.offset) { horIdx, piece in
                            ZStack{
                                Rectangle()
                                    .fill(verIdx % 2 != horIdx % 2 ?
                                          Color(hue: 1.0, saturation: 0.13, brightness: 0.7) :
                                          Color(hue: 1.0, saturation: 0.5, brightness: 0.43))
                                    .frame(width: 35, height: 35)
                                if(piece.piece != "empty") {
                                    Image(piece.asset)
                                        .resizable()
                                        .frame(width: 35, height: 35)
                                }
                                if(chess.isClicked != nil && chess.movementBoard[verIdx][horIdx]) {
                                    Circle()
                                        .fill(Color(hue: 0.5, saturation: 0.13, brightness: 0.7, opacity: 0.7))
                                        .frame(width: 15, height: 15)
                                }
                            }
                            .onTapGesture {
                                if(chess.isClicked != nil) {
                                    let from:Coordinate = chess.isClicked ?? Coordinate(X: 0, Y: 0)
                                    let result:String = chess.movePiece(from: from, to: Coordinate(X: horIdx, Y: verIdx))
                                    if(result == "success") {
                                        chess.isClicked = nil
                                    }
                                    else if(result == "New selection") {
                                        if(Coordinate(X: horIdx, Y: verIdx) == chess.isClicked) {
                                            chess.isClicked = nil
                                        }
                                        else {
                                            chess.click(coordinate: Coordinate(X: horIdx, Y: verIdx))
                                        }
                                    }
                                    else {
                                        print(result)
                                    }
                                }
                                else {
                                    chess.click(coordinate: Coordinate(X: horIdx, Y: verIdx))
                                }
                            }
                        }
                    }
                }
            }
        }
    }


struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}

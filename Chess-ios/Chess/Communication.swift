//
//  Communication.swift
//  Chess
//
//  Created by 김건호 on 2022/05/05.
//

import Foundation
import SocketIO

let manager = SocketManager(socketURL: URL(string: "http://localhost:3000/test")!, config: [.log(false) ,.compress, .forceWebsockets(true)])
class Communication {
    var socket:SocketIOClient
    init () {
        self.socket = manager.defaultSocket
    }
    func connect(movePiece: @escaping(Coordinate, Coordinate) -> ()) {
        self.socket = manager.defaultSocket
        self.socket.connect()
        self.socket.on(clientEvent: .connect) {data, ack in
            print("socket connected")
        }
        recieveMessage(movePiece: movePiece)
    }
    func recieveMessage(movePiece: @escaping(Coordinate, Coordinate) -> ()) {
        self.socket.on("message") { (dataArray, ack) in
            let safeData:String = dataArray[0] as? String ?? "00=>00"
            let to:Int = Int(String(safeData[safeData.index(safeData.startIndex, offsetBy: 4) ..< safeData.index(safeData.startIndex, offsetBy: 6)])) ?? 0
            let from:Int = Int(String(safeData[safeData.index(safeData.startIndex, offsetBy: 0) ..< safeData.index(safeData.startIndex, offsetBy: 2)])) ?? 0
            movePiece(Coordinate(X: from / 10, Y: from % 10), Coordinate(X: to / 10, Y: to % 10))
            print(Coordinate(X: to / 10, Y: to % 10), Coordinate(X: from / 10, Y: from % 10))
        }
    }
    func setColor(setColor:@escaping (String) -> ()) {
        self.socket.on("color") { (dataArray, ack) in
            print(dataArray[0])
            setColor(dataArray[0] as! String)
        }
    }
    func sendMessage(message:String) {
        self.socket.emit("message", message)
    }
    func disconnect() {
        self.socket.disconnect()
    }
}

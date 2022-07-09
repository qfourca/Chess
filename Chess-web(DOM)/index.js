for(let i = 0; i < 8 ; i++) {
    for(let j = 0; j < 8; j++) {
        let chessBox = document.createElement('div')
        chessBox.setAttribute('class', i % 2 == j % 2 ? 'box bright' : 'box dark')
        chessBox.setAttribute('id', `${i + 1}-${j + 1}`)
        document.querySelector('.chessContainer').appendChild(chessBox)
    }
}

let chessArray = new Array(8)
for(let i = 0;i < 8; i++) {
    chessArray[i] = new Array(8)
}
for(let i=0;i<8;i++)
{
    chessArray[6][i]='white-pon';
}
for(let i=0;i<8;i++)
{
    chessArray[1][i]='black-pon';
}
chessArray[7][6]='white-knight';
chessArray[7][1]='white-knight';
chessArray[0][6]='black-knight';
chessArray[0][1]='black-knight';
chessArray[7][7]='white-rook';
chessArray[7][0]='white-rook';
chessArray[0][7]='black-rook';
chessArray[0][0]='black-rook';
chessArray[7][4]='white-king';
chessArray[0][4]='black-king';
chessArray[0][3]='black-queen';
chessArray[7][3]='white-queen';
chessArray[0][2]='black-bisop';
chessArray[0][5]='black-bisop';
chessArray[7][2]='white-bisop';
chessArray[7][5]='white-bisop';

for(let i = 0; i < 8; i++) {
    for(let j = 0; j < 8; j++) {
        if(chessArray[i][j] != undefined) {
            let asset = document.createElement('img')
            asset.setAttribute('src', `./img/chess asset/${chessArray[i][j]}.png`)
            asset.setAttribute('class', 'chessAsset')
            document.getElementById(`${i+1}-${j+1}`).appendChild(asset)
        }
    }
}


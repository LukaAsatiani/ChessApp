export default {
  default_fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",

  color: (piece) => {
    let p = piece.split('_')[0]
    
    if(p.toUpperCase() === p)
      return 'w'
    
    return 'b'
  },

  fen2matrix:(fen) => {
    let fenstr = fen
    fenstr = fenstr.split(' ')[0]
    fenstr = fenstr.replaceAll(/([0-9])/ig, (offset) => '#'.repeat(offset))
    return fenstr.split('/')
  },

  matrix2fen:(matrix) => {
    let matrixstr = matrix.join('/')
    matrixstr = matrixstr.replaceAll(/(#+)/ig, (match) => match.length)
    return matrixstr
  },

  validMove:(pd, fen) => {

  },

  fen2dict:(fen) => {
    let fenstr = fen
    fenstr = fenstr.split(' ')[0]
    fenstr = fenstr.replaceAll(/([0-9])/ig, (offset) => '#'.repeat(offset))
    const parts = fenstr.split('/')

    const pieces = []
    const turn = fen.split(' ')[1]

    parts.forEach((part, i) => {
      part.split('').forEach((piece, j) => {
        if(piece !== '#'){
          pieces.push(`${piece}_${9 - (i+1)}${j+1}`)
        }
      })
    })
    
    return {pieces, turn}
  },

  replaceChar(origString, replaceChar, index) {
    let firstPart = origString.substr(0, index);
    let lastPart = origString.substr(index + 1);
      
    let newString = firstPart + replaceChar + lastPart;
    return newString;
  },

  updatedMatrix(matrix, piece, pos){
    let temp = `${matrix[pos.y]}`
    
    matrix[pos.y] = this.replaceChar(temp, piece, pos.x)
    return matrix
  },

  swithTurn(turn){
    if(turn === 'w')
      return 'b'
    
    return 'w'
  },

  move(piece, pos, to, fen){
    let matrix = this.fen2matrix(fen)
    
    const _to = {
      y: 8 - to.y,
      x: to.x - 1
    }

    const _pos = {
      y: 8 - pos.y,
      x: pos.x - 1
    }

    console.log(_pos, _to)

    if(!(to.x >= 1 && to.x <= 8 && to.y >= 1 && to.y <= 8)){
      return {
        ok: false,
        pos: _pos
      }
    }

    const square = matrix[_to.y][_to.x]
    console.log(_to.y, _to.x)
    if(square !== '#' && this.color(square) === this.color(piece)){
      return {
        ok: false,
        pos: _pos
      }
    }

    this.updatedMatrix(matrix, '#', _pos)
    this.updatedMatrix(matrix, piece, _to)
    let fen_parts = fen.split(' ')
    fen_parts[0] = this.matrix2fen(matrix)
    fen_parts[1] = this.swithTurn(fen_parts[1])
    console.log(matrix)
    return {
      ok: true,
      pos: _to,
      value: fen_parts.join(' ')
    }
  }
}
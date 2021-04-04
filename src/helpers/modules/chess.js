// export default {
//   default_fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",

//   movePaterns: {
//     p: {
//       directions: [[1, 0]],
//       take_direction: [[1, 1], [1, -1]],
//       limit: 2
//     },
//     r: {
//       directions: [[1, 0], [0, 1], [-1, 0], [0, -1]],
//       limit: null
//     },
//     b: {
//       directions: [[1, 1], [-1, 1], [1, -1], [-1, -1]],
//       limit: null
//     },
//     k: {
//       directions: [[1, 0], [0, 1], [-1, 0], [0, -1], [1, 1], [-1, 1], [1, -1], [-1, -1]],
//       limit: 1
//     },
//     q: {
//       directions: [[1, 0], [0, 1], [-1, 0], [0, -1], [1, 1], [-1, 1], [1, -1], [-1, -1]],
//       limit: null
//     },
//     n: {
//       directions: [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, -2], [-1, -2], [1, 2], [-1, 2]],
//       limit: 1
//     }
//   },

//   validMoves (piece, pos, matrix, orientation, dict = false){
//     const p = this.movePaterns[piece.toLowerCase()]
//     const color = this.color(piece)
//     const c_this = this

//     const list = []
//     const t_dict = {}

//     p.directions.forEach(check)

//     function check(direction){
//       const n = {...pos}
//       const ind = color === orientation ? -1 : 1
//       let counter = 0
      
//       while(c_this.checkRange(n)){
//         if(counter === p.limit)
//           break

//         if(counter > 0){
//           if(matrix[n.y][n.x] !== '#')
//             break
//         }
        
//         n.y += ind * direction[0]
//         n.x += direction[1]

//         if(n, c_this.checkRange({y: 7 - n.y, x: n.x})){
//           list.push(`${8 - n.y}${n.x + 1}`)
//           if(matrix[n.y][n.x] === '#')
//             t_dict[`${n.y + 1}${n.x + 1}`] = true
//         }
//         counter++
//       }
//     }
    
//     if(dict)
//       return t_dict

//     return list
//   },

//   color: (piece) => {
//     let p = piece.split('_')[0]
    
//     if(p.toUpperCase() === p)
//       return 'w'
    
//     return 'b'
//   },

//   fen2matrix:(fen) => {
//     let fenstr = fen
//     fenstr = fenstr.split(' ')[0]
//     fenstr = fenstr.replaceAll(/([0-9])/ig, (offset) => '#'.repeat(offset))
//     return fenstr.split('/')
//   },

//   matrix2fen:(matrix) => {
//     let matrixstr = matrix.join('/')
//     matrixstr = matrixstr.replaceAll(/(#+)/ig, (match) => match.length)
//     return matrixstr
//   },

//   fen2dict:(fen) => {
//     let fenstr = fen
//     fenstr = fenstr.split(' ')[0]
//     fenstr = fenstr.replaceAll(/([0-9])/ig, (offset) => '#'.repeat(offset))
//     const parts = fenstr.split('/')

//     const pieces = []
//     const turn = fen.split(' ')[1]

//     parts.forEach((part, i) => {
//       part.split('').forEach((piece, j) => {
//         if(piece !== '#'){
//           pieces.push(`${piece}_${9 - (i+1)}${j+1}`)
//         }
//       })
//     })
    
//     return {pieces, turn}
//   },

//   replaceChar(origString, replaceChar, index) {
//     let firstPart = origString.substr(0, index);
//     let lastPart = origString.substr(index + 1);
      
//     let newString = firstPart + replaceChar + lastPart;
//     return newString;
//   },

//   updatedMatrix(matrix, piece, pos, orientation){
//     const y = orientation === 'w' ? pos.y : 7 - pos.y
//     const x = orientation === 'w' ? pos.x : 7 - pos.x

//     let temp = `${matrix[y]}`
    
//     matrix[y] = this.replaceChar(temp, piece, x)
//     return matrix
//   },

//   swithTurn(turn){
//     if(turn === 'w')
//       return 'b'
    
//     return 'w'
//   },

//   checkRange(pos){
//     return pos.x >= 0 && pos.x <= 7 && pos.y >= 0 && pos.y <= 7
//   },

//   showValid(piece, pos, fen, orientation){
//     let matrix = this.fen2matrix(fen)
    
//     const _pos = {
//       y: 8 - pos.y,
//       x: pos.x - 1
//     }

//     return this.validMoves(piece, _pos, matrix, orientation, true)
//   },

//   move(piece, pos, to, fen, orientation){
//     let matrix = this.fen2matrix(fen)
    
//     const _to = {
//       y: 8 - to.y,
//       x: to.x - 1
//     }

//     const _pos = {
//       y: 8 - pos.y,
//       x: pos.x - 1
//     }

//     if(!(to.x >= 1 && to.x <= 8 && to.y >= 1 && to.y <= 8)){
//       return {
//         ok: false,
//         pos: _pos
//       }
//     }

//     const square = matrix[_to.y][_to.x]
    
//     if(!this.validMoves(piece, _pos, matrix, orientation).includes(`${to.y}${to.x}`))
//       return {
//         ok: false,
//         pos: _pos
//       }

//     if(square !== '#' && this.color(square) === this.color(piece)){
//       return {
//         ok: false,
//         pos: _pos
//       }
//     }

//     this.updatedMatrix(matrix, '#', _pos, orientation)
//     this.updatedMatrix(matrix, piece, _to, orientation)

//     let fen_parts = fen.split(' ')
//     fen_parts[0] = this.matrix2fen(matrix)
//     fen_parts[1] = this.swithTurn(fen_parts[1])
    
//     return {
//       ok: true,
//       pos: _to,
//       value: fen_parts.join(' ')
//     }
//   }
// }

const h = {
  notations: {
    w: {
      h: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
      v: ['1', '2', '3', '4', '5', '6', '7', '8']
    },
    b: {
      h: ['h', 'g', 'f', 'e', 'd', 'c', 'b', 'a'],
      v: ['8', '7', '6', '5', '4', '3', '2', '1']
    }
  },

  color(piece) {
    let p = piece.split('_')[0]
    
    if(p.toUpperCase() === p)
      return 'w'
    
    return 'b'
  },

  fen2dict (fen, orient) {
    let fenstr = fen
    fenstr = fenstr.split(' ')[0]
    fenstr = fenstr.replaceAll(/([0-9])/ig, (offset) => '#'.repeat(offset))
    const parts = fenstr.split('/')
    
    const pieces = {}

    const turn = fen.split(' ')[1]
    
    parts.forEach((part, i) => {
      part.split('').forEach((piece, j) => {
        if(piece !== '#'){
          const pos = `${String.fromCharCode(97 + j)}${9 - (i+1)}`
          pieces[`${piece}_${pos}`] = {
            transform: orient === 'w' ? `translate(${j}00%, ${i}00%)` : `translate(${7 - j}00%, ${7 - i}00%)`,
            piece: piece,
            color: this.color(piece),
            pos
          }
        }
      })
    })
        
    return {pieces, turn}
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

  updateFen(fen, position){
    const parts = fen.split(' ')
    parts[0] = position
    parts[1] = parts[1] === 'w' ? 'b' : 'w'

    return parts.join(' ')
  }
}

export class Piece {
  static color(piece) {
    return h.color(piece)
  }

  static parsePiece(piece){
    return {
      color: this.color(piece),
      piece: piece
    }
  }
}

export class Game {
  constructor(){
    this._fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
    this._orient = 'w'
    this._player = 'w'
  }
  
  set fen(str){
    this._fen = str
  }

  get fen(){
    return this._fen
  }

  get player(){
    return this._player
  }

  get orient(){
    return this._orient
  }

  get notation(){
    return h.notations[this.orient]
  }

  get position(){
    return h.fen2dict(this._fen, this._orient)
  }
  
  parseSquareNotation(pos) {
    if(!(pos.y >= 1 && pos.y <= 8 && pos.x >= 1 && pos.x <= 8))
      return {
        ok: false
      }

    const x = this._orient === 'w' ? String.fromCharCode(96 + pos.x) : String.fromCharCode(96 + (9 - pos.x))
    const y = this._orient === 'w' ? pos.y : 9 - pos.y
  
    return {
      ok: true,
      value: `${x}${y}`
    }
  }

  switchOrient(){
    this._orient === 'w' ? this._orient = 'b' : this._orient = 'w'
  }

  move(from, to){
    from = {
      x: from[0].charCodeAt(0) - 97,
      y: 8 - parseInt(from[1])
    }
    
    to = {
      x: to[0].charCodeAt(0) - 97,
      y: 8 - parseInt(to[1])
    }

    let matrix = h.fen2matrix(this._fen)
    
    if(matrix[to.y][to.x] !== '#' && Piece.color(matrix[from.y][from.x]) === Piece.color(matrix[to.y][to.x]))
      return {
        ok: false
      }

    matrix = h.updatedMatrix(matrix, matrix[from.y][from.x], to)
    matrix = h.updatedMatrix(matrix, '#', from)

    this.fen = h.updateFen(this._fen, h.matrix2fen(matrix))
    console.log(this.fen)     
    return {
      ok: true
    }
  }
}
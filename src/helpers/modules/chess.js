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
  movePaterns: {
    p: {
      directions: [[1, 0]],
      take_direction: [[1, 1], [1, -1]],
      limit: 2
    },
    r: {
      directions: [[1, 0], [0, 1], [-1, 0], [0, -1]],
      limit: null
    },
    b: {
      directions: [[1, 1], [-1, 1], [1, -1], [-1, -1]],
      limit: null
    },
    k: {
      directions: [[1, 0], [0, 1], [-1, 0], [0, -1], [1, 1], [-1, 1], [1, -1], [-1, -1]],
      limit: 1
    },
    q: {
      directions: [[1, 0], [0, 1], [-1, 0], [0, -1], [1, 1], [-1, 1], [1, -1], [-1, -1]],
      limit: null
    },
    n: {
      directions: [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, -2], [-1, -2], [1, 2], [-1, 2]],
      limit: 1
    }
  },
  
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
  },

  checkRange(pos){
    return pos.x >= 0 && pos.x <= 7 && pos.y >= 0 && pos.y <= 7
  },

  isOposite(piece1, piece2){
    if(piece1 === '#' || piece2 === '#')
      return false
    
    if(this.color(piece1) === this.color(piece2))
      return false

    if(piece1.toLowerCase() === piece2.toLowerCase())
      return true
  }
}

export class Square {
  static guarded(pos, matrix, player){
    let bool = false

    Object.entries(h.movePaterns).forEach((e) => {
      const piece = e[0]
      const directions = e[1].take_direction || e[1].directions
      const limit = e[1].limit

      directions.forEach((direction) => {
        const n = {...pos}
        const ind = Piece.color(player) === 'w' ? 1 : -1
        let counter = 0

        while(h.checkRange(n)){
          if(counter === limit)
            break
       
          n.y += ind * direction[0]
          n.x += direction[1]

          if(h.checkRange({y: 7 - n.y, x: n.x})){
            const _piece = matrix[n.y][n.x]
            
            if(_piece.toLowerCase() === piece && player !== Piece.color(_piece)){
              bool = true
            }
          }

          counter++
        }    
      })
    })
    
    return bool
  }
  
  static notation2cord (pos) {
    const _pos = {
      x: pos[0].charCodeAt(0) - 97,
      y: 8 - parseInt(pos[1])
    }
    
    if(!(_pos.y >= 0 && _pos.y <= 7 && _pos.x >= 0 && _pos.x <= 7))
      return null

    return _pos
  }

  static cord2notation (pos, orient = 'w') {
    pos.y = 9 - pos.y
    if(!(pos.y >= 1 && pos.y <= 8 && pos.x >= 1 && pos.x <= 8))
      return 0

    const x = orient === 'w' ? String.fromCharCode(96 + pos.x) : String.fromCharCode(96 + (9 - pos.x))
    const y = orient === 'w' ? pos.y : 9 - pos.y
  
    return `${x}${y}`
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

export class King extends Piece {
  constructor(pos, matrix){
    this.piece = matrix[pos.y][pos.x]
    this.pos = pos
    this.matrix = matrix
    this.directions = h.movePaterns.k.directions
    this.take_directions = h.movePaterns.k.take_direction || h.movePaterns.k.directions
  }

  validMoves(){
    console.log(directions)
  }
}

export class Moves {
  constructor(player){
    this.player = player
    this.moves_list = []
  }
  
  check(direction, pos, matrix, piece, p){
    const n = {...pos}
    const ind = Piece.color(piece) === 'w' ? -1 : 1
    let counter = 0
    
    while(h.checkRange(n)){
      if(counter === p.limit)
        break
   
      n.y += ind * direction[0]
      n.x += direction[1]
  
      if(h.checkRange({y: 7 - n.y, x: n.x})){
        let temp = null
        
        if(piece.toLowerCase() === 'k' && Square.guarded(n, matrix, this.player))
          break

        if(matrix[n.y][n.x] === '#'){
          temp = Square.cord2notation({x: n.x + 1, y: n.y + 1})
          this.moves_list.push(temp)
        }
        else if (Piece.color(matrix[n.y][n.x]) !== this.player){
          temp = `x${Square.cord2notation({x: n.x + 1, y: n.y + 1})}`
          
          if(matrix[n.y][n.x].toLowerCase() === 'k')
            temp = `+${Square.cord2notation({x: n.x + 1, y: n.y + 1})}`

          this.moves_list.push(temp)
          break
        } else {
          break
        }
      }
      counter++
    }
  }

  validMoves (pos, matrix) {
    this.moves_list = []

    const piece = matrix[pos.y][pos.x]
    const p = h.movePaterns[piece.toLowerCase()]
    
    p.directions.forEach((e) => this.check(e, pos, matrix, piece, p))
    
    return this.moves_list
  }

  isValid(){

  }
}

export class Game {
  constructor(){
    this._fen = "5k1r/NpbK3n/1Bp5/1p2P3/8/1P3p2/3n1PP1/8 w - - 0 1"
    this._orient = 'w'
    this._player = 'w'
    this._activeSquare = null
    this._validSquares = []
    this._actionSquares = []
    this._position_dict = {}
    this.moves = new Moves(this.player)
    this.pieces = []

    this.generatePieces()
  }
  
  set fen(str){
    this._fen = str
  }

  set validSquares(array){
    this._validSquares = array
  }

  set activeSquare(square){
    this._activeSquare = square
  }

  set actionSquares(squares){
    this._actionSquares = squares
  }

  get validSquares(){
    return this._validSquares
  }

  get activeSquare(){
    return this._activeSquare
  }

  get actionSquares(){
    return this._actionSquares
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

  set position(dict){
    this._position_dict = dict
  }

  get position(){
    return this._position_dict
  }
  
  generatePieces(){
    this.position = h.fen2dict(this._fen, this._orient)
  }

  clearPointers(){
    this.validSquares = this.activeSquare = []
  }

  parseSquareNotation(pos) {
    const notation = Square.cord2notation(pos, this.orient)
    
    if(!notation){
      return {
        ok: false
      }
    }

    return {
      ok: true,
      value: notation
    }
  }

  switchOrient(){
    this._orient === 'w' ? this._orient = 'b' : this._orient = 'w'
  }

  validation(square){
    const _square = Square.notation2cord(square)
    
    const list = this.moves.validMoves(_square, h.fen2matrix(this.fen))
  
    this.validSquares = list
    return list
  }

  move(from, to){
    const _from = Square.notation2cord(from)
    const _to = Square.notation2cord(to)

    let matrix = h.fen2matrix(this._fen)

    if(matrix[_to.y][_to.x] !== '#' && Piece.color(matrix[_from.y][_from.x]) === Piece.color(matrix[_to.y][_to.x]))
      return {
        ok: false
      }

    if(!(this.validSquares.includes(to) || this.validSquares.includes(`x${to}`))){
      this.clearPointers()
    
      return {
        ok: false
      }
    }
    
    this.clearPointers()

    matrix = h.updatedMatrix(matrix, matrix[_from.y][_from.x], _to)
    matrix = h.updatedMatrix(matrix, '#', _from)

    this.fen = h.updateFen(this._fen, h.matrix2fen(matrix))

    return {
      ok: true
    }
  }
}
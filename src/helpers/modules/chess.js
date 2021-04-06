const
  WHITE               = 'w',
  BLACK               = 'b',
  KING                = 'k',
  QUEEN               = 'q',
  ROOK                = 'r',
  KNIGHT              = 'n',
  BISHOP              = 'b',
  PAWN                = 'p',
  CAPTURE             = 'x',
  CHECK               = '+',
  CHECKMATE           = '#',
  KING_SIDE_CASTLE    = 'O-O', 
  QUEEN_SIDE_CASTLE   = 'O-O-O',
  DIRECTIONS          = {
    d: [
      [1, -1], [1, 0],  
      [1, 1], [0, 1],
      [-1, 1], [-1, 0], 
      [-1, -1], [0, -1]
    ],
    h: [
      [2, 1], [2, -1], 
      [-2, 1], [-2, -1], 
      [1, -2], [-1, -2], 
      [1, 2], [-1, 2]
    ]
  }

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
      return WHITE
    
    return BLACK
  },

  fen2dict (fen) {
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
            transform: {
              w: `translate(${j}00%, ${i}00%)`,
              b: `translate(${7 - j}00%, ${7 - i}00%)`
            },
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
    parts[1] = parts[1] === WHITE ? BLACK : WHITE

    return parts.join(' ')
  },

  parseDirections(str){
    if(str === 'h')
      return DIRECTIONS.h
    
    const list = []

    for(let i in str){
      list.push(DIRECTIONS.d[parseInt(str[i]) - 1])
    }

    return list
  },

  inRange(pos){
    return pos.x >= 0 && pos.x <= 7 && pos.y >= 0 && pos.y <= 7
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
        const ind = Piece.color(player) === WHITE ? 1 : -1
        let counter = 0

        while(h.inRange(n)){
          if(counter === limit)
            break
       
          n.y += ind * direction[0]
          n.x += direction[1]

          if(h.inRange({y: 7 - n.y, x: n.x})){
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

  static cord2notation (pos, orient = WHITE) {
    pos.y = 9 - pos.y
    if(!(pos.y >= 1 && pos.y <= 8 && pos.x >= 1 && pos.x <= 8))
      return 0

    const x = orient === WHITE ? String.fromCharCode(96 + pos.x) : String.fromCharCode(96 + (9 - pos.x))
    const y = orient === WHITE ? pos.y : 9 - pos.y
  
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

class Piece2 {
  constructor(pos, matrix){
    this.square = pos,
    this.cords = Square.notation2cord(pos)
    this.color = Piece.color(matrix[this.cords.y][this.cords.x])
    this.piece = matrix[this.cords.y][this.cords.x].toLowerCase()
    this.matrix = matrix
    this.valid_moves = []
  }
  
  getPiece(pos){
    if(this.isEmpty(pos))
      return null
    
    return this.matrix[pos.y][pos.x]
  }

  isEmpty(pos){
    return this.matrix[pos.y][pos.x] === '#'
  }

  isPlayerPiece(pos){
    return Piece.color(this.matrix[pos.y][pos.x]) === this.color
  }

  inRange(pos){
    return pos.x >= 0 && pos.x <= 7 && pos.y >= 0 && pos.y <= 7
  }
}

class Pawn extends Piece2 {
  constructor(pos, matrix){
    super(pos, matrix)
    this.direction = h.parseDirections('2')[0]
    this.startLine = this.color === WHITE ? 7 : 1
    this.penultLine = this.color === BLACK ? 7 : 1
    this.frontDir = this.color === WHITE ? 1 : -1
    this.take_directions = h.parseDirections('13')
  
    this.validate()
  }
  
  validate () {
    const _pos = {...this.cords}

    for(let i = 0; i < 2; i++){
      _pos.y -= this.frontDir * this.direction[0]
      _pos.x += this.direction[1]
      
      if(!this.inRange(_pos))
        break
        
      if(this.isEmpty(_pos)){
        this.valid_moves.push(Square.cord2notation({x: _pos.x + 1, y: _pos.y + 1}))
      }
      else
        break
        
      if(this.cords.y !== this.startLine)
        break
    }

    for(let i in this.take_directions){
      const direction = this.take_directions[i]
      const _pos = {...this.cords}
      
      _pos.y -= this.frontDir * direction[0]
      _pos.x += direction[1]

      if(!this.inRange(_pos) || this.isEmpty(_pos))
        continue
        
      if(!this.isPlayerPiece(_pos))
        this.valid_moves.push(`${CAPTURE}${Square.cord2notation({x: _pos.x + 1, y: _pos.y + 1})}`)
    }
  }
}

class King extends Piece2{
  constructor(pos, matrix){
    super(pos, matrix)
    this.directions = h.parseDirections('12345678')
    this.validate()
  }

  validate(){
    for(let i in this.directions){
      const direction = this.directions[i]
      const _pos = {...this.cords}
      
      _pos.y -= direction[0]
      _pos.x += direction[1]
      
      if(!this.inRange(_pos))
        continue
        
      if(this.isEmpty(_pos) || !this.isPlayerPiece(_pos))
        this.valid_moves.push(Square.cord2notation({x: _pos.x + 1, y: _pos.y + 1}))
    }
  }
}

export class Moves {
  constructor(player){
    this.player = player
    this.moves_list = []
  }
  
  check(direction, pos, matrix, piece, p){
    const n = {...pos}
    const ind = Piece.color(piece) === WHITE ? -1 : 1
    let counter = 0
    
    while(h.inRange(n)){
      if(counter === p.limit)
        break
   
      n.y += ind * direction[0]
      n.x += direction[1]
  
      if(h.inRange({y: 7 - n.y, x: n.x})){
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

  validMoves () {
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
    this._fen = "5n2/6pk/4NP2/3Pp2q/P4P1p/1P4p1/2P3p1/2K5 w - - 0 1"
    this._orient = BLACK
    this._player = WHITE
    this._activeSquare = null
    this._validSquares = []
    this._actionSquares = []
    this._position_dict = {}
    this.moves = new Moves(this.player)
    this.matrix = h.fen2matrix(this._fen)
    this._pieces = {}

    this.generatePosition()
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

  set position(dict){
    this._position_dict = dict
  }

  set pieces(dict){
    this._pieces = dict
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

  get position(){
    return this._position_dict
  }

  get pieces(){
    return this._pieces
  }
  
  generatePosition(){
    this.position = h.fen2dict(this.fen)
    const dict = {}

    Object.entries(this.position.pieces).forEach(([key, value]) => {
      switch(value.piece.toLowerCase()){
        case KING:
          dict[key] = new King(value.pos, this.matrix)
          break
        case PAWN:
          dict[key] = new Pawn(value.pos, this.matrix)
          break
      }
    })

    this.pieces = dict
  }

  updatePosition(){

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
    this._orient === WHITE ? this._orient = BLACK : this._orient = WHITE
  }

  validation(piece){
    const list = this.pieces[piece].valid_moves
    
    this.validSquares = list
    return list
  }

  move(from, to){
    const piece = matrix[_from.y][_from.x]
    const _from = Square.notation2cord(from)
    const _to = Square.notation2cord(to)
    let matrix = this.matrix
    
    if(matrix[_to.y][_to.x] !== '#' && Piece.color(piece) === Piece.color(matrix[_to.y][_to.x]))
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

    matrix = h.updatedMatrix(matrix, piece, _to)
    matrix = h.updatedMatrix(matrix, '#', _from)

    this.fen = h.updateFen(this._fen, h.matrix2fen(matrix))

    return {
      ok: true
    }
  }
}
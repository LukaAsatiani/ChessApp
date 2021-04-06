<template>
  <div
    @mouseup="place($event)"
    @mousemove="move($event)"
    :key="cnt"
  >
    <v-sheet
      class="transparent piece-container"
      v-for="(value, name) in game.position.pieces"
      :key="name"
      :v-if="false"
      :style="pieceContainerStyle(value)"
      :class="[name, value.color === game.position.turn && game.position.turn === game.player ? 'grabable' : null]"
      @mousedown="grab({...value, name}, $event)"
    ></v-sheet>
  </div>
</template>

<script>
  import { Piece } from '@/helpers/modules/chess'

  export default {
    props: ['size', 'game'],
    data () {
      return {
        grabbed: {},
        picked: {},
        cnt: 0
      }
    },
    computed: {
      pieceContainerStyle: function () {
        return (v) => ({
          height: `${this.size}px`,
          width: `${this.size}px`,
          transform: v.transform[this.game.orient],
          "background-image": `url(./pieces/${v.color}/${v.piece}.svg)`
        });
      }
    },
    methods: {
      grab(pd, event){
        if(this.game.position.turn === this.game.player && Piece.color(pd.piece) === this.game.player){
          this.ativateSquare(pd.pos)
          this.validation(pd.name)

          this.grabbed = {
            target: event.target,
            pd
          }

          this.picked = {}
          const x = (event.layerX - this.size / 2) / this.size * 100
          const y = (event.layerY - this.size / 2) / this.size * 100
          
          event.target.style.transform = `translate(${x}%, ${y}%)`
        }
      },
      place(event){
        if(this.game.position.turn !== this.game.player)
          return

        let t = this.grabbed

        if(this.picked.target)
          t = this.picked

        if(t.target){
          const pos = t.pd.pos
          let x = Math.floor(event.layerX / this.size) + 1
          let y = Math.floor(event.layerY / this.size) + 1
          
          const to = {
            y, x
          }
          
          const ps = this.game.parseSquareNotation(to)
          
          if(!ps.ok || ps.value === pos){
            t.target.style.transform = t.pd.transform[this.game.orient]
            this.picked = t
            this.grabbed = {}
            this.update()
            return
          }

          const move = this.game.move(pos, ps.value)

          if(!move.ok){
            t.target.style.transform = t.pd.transform[this.game.orient]
            this.picked = t
            this.update()
          } else {
            this.actionSquares([pos, ps.value])
            this.cnt++
          }

          this.grabbed = {}
        }
      },
      move(event){
        if(this.grabbed.target){
          this.grabbed.target.style.zIndex = 99
          
          const x = (event.layerX - this.size / 2) / this.size * 100
          const y = (event.layerY - this.size / 2) / this.size * 100
        
          this.grabbed.target.style.transform = `translate(${x}%, ${y}%)`
        }
      },
      ativateSquare(pos){
        this.game.activeSquare = pos
        this.update()
      },
      actionSquares(squares){
        this.game.actionSquares = squares
        this.update()
      },
      validation(square){
        const squares = this.game.validation(square)
        if(squares.length > 0)
          this.update()
      },
      update(){
        this.$emit('update')
      }
    }
  }
  
</script>

<style scoped>
  * {
    padding: 0;
    margin: 0;
  }

  .c-container {
    height: 100%;
    width: 100%;
  }

  .piece-container {
    position: absolute;
    background-size: cover;
    padding: 3px;
    box-sizing: border-box;
  }

  .piece {
    position: relative
  }

  .grabable:hover {
    cursor: pointer;
  }
</style>
<template>
  <div
    @mouseup="place($event)"
    @mousemove="move($event)"
    :key="update_count"
  >
    <v-sheet
      class="transparent piece-container"
      v-for="(item, i) in position.pieces"
      :key="i"
      :v-if="false"
      :class="position.turn === color(item) ? 'grabable' : null"
      :style="pieceContainerStyle({...pcp(item)})"      
      @mousedown="grab(item, $event)"
    ></v-sheet>
  </div>  
</template>

<script>
  import { ch } from '@/helpers'

  export default {
    props: {
      data: {
        type: Object,
        default: () => ({})
      }
    },
    data () {
      return {
        grabbed: {},
        fen: ch.default_fen,
        update_count: 0
      }
    },
    computed: {
      pieceContainerStyle: function () {
        return ({piece, color, pos}) => ({
          height: `${this.size}px`,
          width: `${this.size}px`,
          transform: `translate(${pos.x}00%, ${pos.y}00%)`,
          "background-image": `url(./pieces/${color}/${piece}.svg)` 
        });
      },
      matrix () {
        const p = ch.fen2matrix(this.fen)
        
        return {...p}
      },
      position () {
        const p = ch.fen2dict(this.fen)
        
        return {...p}
      },
      color: function () {
        return (piece) => ch.color(piece)
      },
      valid: function () {
        return (piece, fen) => ch.validMove(piece, fen)
      },
      size () {
        return this.data.size
      },
      current_orientation () {
        return this.data.current_orientation
      }
    },
    methods: {
      pcp(pd){
        const piece = pd.split('_')[0]
        const color = this.color(piece)
        let [i, j] = pd.split('_')[1]
        
        i = 8 - i
        j -= 1

        const pos = {
          y: this.current_orientation === 'b' ? 7 - i : i,
          x: this.current_orientation === 'b' ? 7 - j : j
        }

        const valid = this.valid(pd, this.fen)

        return {piece, color, pos}
      },
      grab(pd, event){
        if(this.color(pd) === this.position.turn){
          this.grabbed = {
            target: event.target,
            pd
          }
          const x = (event.layerX - this.size / 2) / this.size * 100
          const y = (event.layerY - this.size / 2) / this.size * 100
          
          event.target.style.transform = `translate(${x}%, ${y}%)`
        }
      },
      place(event){
        if(this.grabbed.target){
          let [piece, pos] = this.grabbed.pd.split('_')
          
          pos = {
            y: this.current_orientation === 'b' ? 9 - parseInt(pos[0]) : parseInt(pos[0]),
            x: this.current_orientation === 'b' ? 9 - parseInt(pos[1]) : parseInt(pos[1])
          }

          let x = Math.floor(event.layerX / this.size) + 1
          let y = Math.floor(event.layerY / this.size) + 1
          
          const to = {
            y: 9 - y, x
          }

          const n_fen = ch.move(piece, pos, to, this.fen)

          if(n_fen.ok){
            this.fen = n_fen.value
            this.grabbed.target.style.zIndex = 1
          } else {
          }

          this.grabbed = {}
          event.target.style.transform = `translate(${n_fen.pos.x * 100}%, ${n_fen.pos.y * 100}%)`
        }
      },
      move(event){
        if(this.grabbed.target){
          this.grabbed.target.style.zIndex = 99
          
          const x = (event.layerX - this.size / 2) / this.size * 100
          const y = (event.layerY - this.size / 2) / this.size * 100
        
          this.grabbed.target.style.transform = `translate(${x}%, ${y}%)`
        }
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
    cursor: grab;
  }

  .grabable:active {
    cursor: grabbing;
  }
</style>
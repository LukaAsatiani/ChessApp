<template>
  <div
    @mouseup="place($event)"
    @mousemove="move($event)"
    @mouseclick="move($event)"
  >
    <v-sheet
      class="transparent piece-container"
      v-for="(item, i) in position.pieces"
      :key="i"
      :v-if="false"
      :class="[item, position.turn === color(item) ? 'grabable' : null]"
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
      },
      callbacks: {
        type: Object,
        default: () => ({})
      }
    },
    data () {
      return {
        grabbed: {},
        picked: {},
        fen: ch.default_fen
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
        return (piece, pos, fen) => ch.showValid(piece, pos, fen, this.current_orientation)
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
          
          const pos = pd.split('_')[1]

          const valid = this.valid(pd.split('_')[0], {
            y: this.current_orientation === 'b' ? 9 - parseInt(pos[0]) : parseInt(pos[0]),
            x: this.current_orientation === 'b' ? 9 - parseInt(pos[1]) : parseInt(pos[1])  
          }, this.fen)

          this.callbacks.setValid(valid)

          event.target.style.transform = `translate(${x}%, ${y}%)`
        }
      },
      place(event){
        let t = this.grabbed

        if(this.picked.target)
          t = this.picked

        if(t.target){
          let [piece, pos] = t.pd.split('_')
          
          pos = {
            y: this.current_orientation === 'b' ? 9 - parseInt(pos[0]) : parseInt(pos[0]),
            x: this.current_orientation === 'b' ? 9 - parseInt(pos[1]) : parseInt(pos[1])
          }

          let x = Math.floor(event.layerX / this.size) + 1
          let y = Math.floor(event.layerY / this.size) + 1
          
          const to = {
            y: 9 - y, x
          }

          let n_fen = ch.move(piece, pos, to, this.fen, this.current_orientation)
          console.log(n_fen)
          if(n_fen.ok){
            this.fen = n_fen.value
            t.target.style.zIndex = 1
            this.callbacks.setValid(null)
            this.picked = {}
          } else {
            this.picked = t
            event.target.style.transform = `translate(${n_fen.pos.x * 100}%, ${n_fen.pos.y * 100}%)`
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
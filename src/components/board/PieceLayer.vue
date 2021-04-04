<template>
  <div
    @mouseup="place($event)"
    @mousemove="move($event)"
    :key="cnt"
  >
    <!-- <v-sheet
      class="transparent piece-container"
      v-for="(item, i) in position.pieces"
      :key="i"
      :v-if="false"
      :class="[item, position.turn === color(item) ? 'grabable' : null]"
      :style="pieceContainerStyle({...pcp(item)})"      
      @mousedown="grab(item, $event)"
    ></v-sheet> -->
    <v-sheet
      class="transparent piece-container"
      v-for="(value, name) in game.position.pieces"
      :key="name"
      :v-if="false"
      :style="pieceContainerStyle(value)"
      :class="[name, value.color === game.position.turn && game.position.turn === game.player ? 'grabable' : null]"
      @mousedown="grab(value, $event)"
    ></v-sheet>
  </div>
</template>

<script>
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
          transform: v.transform,
          "background-image": `url(./pieces/${v.color}/${v.piece}.svg)`
        });
      }
    },
    methods: {
      grab(pd, event){
        if(pd.color === this.game.position.turn){
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
        let t = this.grabbed
        
        if(this.picked.target)
          t = this.picked

        if(t.target){
          const pos = t.pd.pos
          let x = Math.floor(event.layerX / this.size) + 1
          let y = Math.floor(event.layerY / this.size) + 1
          
          const to = {
            y: 9 - y, x
          }
          
          const ps = this.game.parseSquareNotation(to)
          if(!ps.ok || ps.value === pos){
            t.target.style.transform = t.pd.transform
            this.picked = t
            this.grabbed = {}
            return
          }

          const move = this.game.move(pos, ps.value)

          if(!move.ok){
            t.target.style.transform = t.pd.transform
            this.picked = t
          }

          console.log(this.game.position)
          this.cnt++
          // let n_fen = ch.move(piece, pos, to, this.fen, this.current_orientation)
          
          // if(n_fen.ok){
          //   this.fen = n_fen.value
          //   t.target.style.zIndex = 1
          //   this.callbacks.setValid(null)
          //   this.picked = {}
          // } else {
          //   this.picked = t
          //   event.target.style.transform = `translate(${n_fen.pos.x * 100}%, ${n_fen.pos.y * 100}%)`
          // }

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
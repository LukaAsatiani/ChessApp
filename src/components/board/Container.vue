<template>
  <v-row
    ref="container"
    class="fill-height pa-0 ma-0"
  >
    <v-sheet
      class="mx-auto my-auto primary relative"
      :style="boardStyle"
    >
      <BoardLayer :size="size" :game="game" :key="`b${orient}`"/>
      <PieceLayer :size="size / 8" class="absolute" :game="game" :key="`p${orient}`"/>
    </v-sheet>
  </v-row>
</template>

<script>
  import BoardLayer from './BoardLayer.vue'
  import PieceLayer from './PieceLayer.vue'
  import { Game, Piece } from '@/helpers/modules/chess' 

  export default {
    components: {
      BoardLayer,
      PieceLayer
    },
    data () {
      return {
        size: null,
        orient: null
      }
    },
    computed: {
      boardStyle() {
        return {
          height: `${this.size}px`,
          width: `${this.size}px`
        }
      },
      game(){
        return new Game()
      }
    },
    mounted () {
      this.size = Math.min(this.$refs.container.clientHeight, this.$refs.container.clientWidth)
      
      window.addEventListener("keyup", function(e) {
        if(String.fromCharCode(e.keyCode).toLowerCase() === 'x'){
          this.game.switchOrient()
          this.orient = this.game.orient
        }
      }.bind(this));
    }
  }

</script>

<style scoped>
  
  .c-container {
    position: relative;
  }

  .relative {
    position: relative;
  }

  .absolute {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

</style>

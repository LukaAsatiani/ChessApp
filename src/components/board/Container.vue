<template>
  <v-row
    ref="container"
    class="fill-height pa-0 ma-0"
  >
    <v-sheet
      class="mx-auto my-auto primary relative"
      :style="boardStyle"
    >
      <BoardLayer :data="boardLProps.data" :callbacks="boardLProps.callbacks"/>
      <PieceLayer :data="pieceLProps.data" :callbacks="pieceLProps.callbacks" class="absolute" />
    </v-sheet>
  </v-row>
</template>

<script>
  import BoardLayer from './BoardLayer.vue'
  import PieceLayer from './PieceLayer.vue'

  export default {
    components: {
      BoardLayer,
      PieceLayer
    },
    data () {
      return {
        size: null,
        current_orientation: 'w',
        // grabbed: null
      }
    },
    computed: {
      boardStyle() {
        return {
          height: `${this.size}px`,
          width: `${this.size}px`
        }
      },
      boardLProps() {
        return {
          data: {
            size: this.size,
            current_orientation: this.current_orientation
          }
        }
      },
      pieceLProps() {
        return {
          data: {
            size: this.size / 8,
            current_orientation: this.current_orientation
          }
        }
      }
    },
    methods: {
      switchOrientation(){
        if(this.current_orientation === 'w'){
          this.current_orientation = 'b'
          return
        }

        this.current_orientation = 'w'
      },
      // setGrabbed (target = null) {
      //   if(!target){
      //     this.grabbed = null
      //     return
      //   }
          
      //   this.grabbed = target
      // }
    },
    mounted () {
      this.size = Math.min(this.$refs.container.clientHeight, this.$refs.container.clientWidth)

      window.addEventListener("keypress", function(e) {
        if(String.fromCharCode(e.keyCode) === 'x')
          this.switchOrientation()
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

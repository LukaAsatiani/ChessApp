<template>
  <div>
    <v-row
      class="pa-0 ma-0"
      v-for="(n, i) in game.notation.v"
      :key="i"
      :style="rowStyle"
    >
      <v-sheet
        class="pa-0 ma-0 square"
        v-for="(c, j) in game.notation.h"
        :class="j % 2 === i % 2 ? 'c-white' : 'c-black'"
        :key="j"
        :style="squareStyle"
      >
        <span
          v-if="i === 7"
          class="notation-horizontal font-weight-bold caption"
        >
          {{c}}
        </span>
        <span 
          v-if="j === 7"
          class="notation-vertical font-weight-bold caption"
        >
          {{9 - n}}
        </span>
      </v-sheet>
    </v-row>  
  </div>  
</template>

<script>

  export default {
    props: ['size', 'game'],
    data () {
      return {
          
      }
    },
    computed: {
      squareStyle(){
        return {
          height: `${this.s_size}px`,
          width: `${this.s_size}px`
        };
      },
      rowStyle(){
        return {
          height: `${this.s_size}px`,
          width: `${this.size}px`
        };
      },
      s_size(){
        return this.size / 8
      }
    }
  }
  
</script>

<style scoped>
  .c-white {
    background-color: #f2f9bb;
    color: #59935d
  }

  .c-black {
    background-color: #59935d;
    color: #f2f9bb
  }

  .square {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .valid-square-pointer {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color:rgba(20,85,30,0.5)
  }

  .notation-horizontal {
    position: absolute;
    bottom: 0;
    left: 5px;
  }

  .notation-vertical {
    position: absolute;
    top: 0;
    right: 5px;
  }
</style>
<template>
  <div>
    <v-row
      class="pa-0 ma-0"
      v-for="i in 8"
      :key="i"
      :style="rowStyle"
    >
      <v-sheet
        class="pa-0 ma-0 square"
        v-for="j in 8"
        :class="j % 2 === i % 2 ? 'c-white' : 'c-black'"
        :key="j"
        :style="squareStyle"
      >
        <span 
          v-if="i === 8"
          class="notation-horizontal font-weight-bold caption"
        >
          {{current_orientation === 'b' ? String.fromCharCode(96 + (9 - j)) : String.fromCharCode(96 + j)}}
        </span>
        <span 
          v-if="j === 8"
          class="notation-vertical font-weight-bold caption"
        >
          {{current_orientation === 'b' ? i : 9 - i}}
        </span>
      </v-sheet>
    </v-row>  
  </div>  
</template>

<script>

  export default {
    props: {
      data: {
        type: Object,
        default: () => ({})
      }
    },
    data () {
      return {
        
      }
    },
    computed: {
      notation(){
        return this.orientation[this.current_orientation].notation
      },
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
      size () {
        return this.data.size
      },
      current_orientation () {
        return this.data.current_orientation
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
    position: relative
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
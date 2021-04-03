<template>
  <v-row
    class="fill-height ma-0 d-flex"
  > 
    <v-sheet
      class="mx-auto my-auto transparent"
      :height="this.$vuetify.breakpoint.xsOnly ? '100vh' : '80vh'"
      :width="this.$vuetify.breakpoint.xsOnly ? '96vw' : '100vw'"
    >
      <c-chess-board />
    </v-sheet>
  </v-row>
</template>

<script>

export default {
  
}

</script>

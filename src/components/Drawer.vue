<template>
  <v-navigation-drawer
    v-model="show"
    absolute
    temporary
    class="primary lighten-1"
  >
    <v-sheet
      color="secondary darken-2"
      class="pa-4"
    >
        <div
          class="avatar-container"
        > 
          <img :src="getProfile.image" class="c-avatar"/>
        </div>

      <v-list-item
        dark
        class="ma-0 pa-0"
      >
        <v-list-item-content>
          <v-list-item-title class="title">
            {{getProfile.username}}
          </v-list-item-title>
          <v-list-item-subtitle>{{getProfile.email}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-sheet>

    <v-divider></v-divider>

    <v-list
      dense
      dark
    >
      <v-list-item
        v-for="item in menu"
        :key="item.title"
        link
        @click="item.callback ? item.callback() : null"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      menu: [
        {icon: 'mdi-account-search', title: 'Search room', callback: () => {
          this.callbacks.showWindow('c-search-room-window')
          this.$emit('input', false)
        }},
        {icon: 'mdi-account-multiple-plus', title: 'Create room', callback: () => {
          this.callbacks.showWindow('c-create-room-window')
          this.$emit('input', false)
        }},
        {icon: 'mdi-logout', title: 'Logout', callback: this.logout}
      ],
    }
  },
  props: {
    value: Boolean,
    callbacks: Object
  },
  computed: {
    ...mapGetters('user', {
      getProfile: 'GET_PROFILE'
    }),
    show: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    ...mapActions('auth', {
      logout: 'AUTH_LOGOUT'
    })
  }
}
</script>

<style scoped>

  .avatar-container {
    position: relative;
    height: 64px;
    width: 64px;
    border-radius: 50%;
    border: 1px solid #2196fc;
    box-shadow: inset 0 0 20px 10px #313131;
    overflow: hidden;
  }
  
  .c-avatar {
    height: 100%;
  }

</style>
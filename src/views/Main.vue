<template>
  <v-row
    class="fill-height ma-0 d-flex"
    v-if="getProfile"
  > 
    <Drawer v-model="drawer" :callbacks="{showWindow, closeWindow}"/>
    <Window v-model="window.show">
      <template scope="props">
        <component :is="window.component" :close="props.close"/>
      </template>
    </Window>
    <ChatBodyWindow v-model="chat_window">
      <c-chats-body class="fill-height" v-if="openedChat" :callbacks="{back}" :chat="openedChat"/>
    </ChatBodyWindow>
    <v-col
      cols="12"
      class="pa-0"
      sm="4"
    >
      <c-chats-list :callbacks="{toggleDrawer, openChat}"/>
    </v-col>
    <v-col
      v-if="!$vuetify.breakpoint.xsOnly"
      class="pa-0"
      sm="8"
    >
      <v-sheet
        class="primary lighten-2 fill-height pa-0"
        justify="center"
        dark
      >
        <c-chats-body class="fill-height" v-if="openedChat" :chat="openedChat"/>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Drawer from '@/components/Drawer'
import ChatBodyWindow from '@/components/ChatBodyWindow'
import Window from '@/components/Window'

export default {
  name: 'Home',
  components: {
    ChatBodyWindow,
    Drawer,
    Window
  },
  data () {
    return {
      window: {
        show: false,
        component: ''
      },
      chat_window: false,
      drawer: null,
      openedChat: null
    }
  },
  computed: {
    ...mapGetters('user', {
      getProfile: 'GET_PROFILE'
    }),
  },
  methods: {
    toggleDrawer () {
      this.drawer = !this.drawer
    },
    openChat (chat) {
      this.openedChat = chat
      this.chat_window = true
    },
    showWindow (component) {
      this.window = {
        show: true,
        component: component
      }
    },
    closeWindow () {
      this.window = {
        show: false,
        component: ''
      }
    },
    back () {
      this.chat_window = false
    },
  }
}
</script>

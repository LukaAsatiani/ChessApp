import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Default from './layouts/Default'
import Empty from './layouts/Empty'
import Notifications from './components/Notifications'
import ChessBoard from './components/board/Container'

Vue.use(VueAxios, axios)
Vue.config.productionTip = false

Vue.component('c-alert', Notifications)
Vue.component('c-chess-board', ChessBoard)
Vue.component('default-layout', Default)
Vue.component('empty-layout', Empty)

new Vue({router, store, vuetify, render: (h) => h(App) }).$mount('#app')

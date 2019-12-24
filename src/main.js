import Vue from 'vue'
import store from './store.js'
import router from './router.js'
import App from './App.vue'
import '@/assets/scss/_main.scss'

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')

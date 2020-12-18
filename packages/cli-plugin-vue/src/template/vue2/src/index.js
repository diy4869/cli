/*
 * @Author: last order
 * @Date: 2020-12-14 09:04:45
 * @LastEditTime: 2020-12-18 11:06:31
 */
import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App'

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')

<% if (useVue3) { %>
import { createRouter, createWebHashHistory } from 'vue-router'

export default createRouter({
  history: createWebHashHistory(),
  routes: []
})
<% } else { %>
import VueRouter from 'vue-router'

export default new VueRouter({
  mode: 'history',
  routes: []
})
<% } %>

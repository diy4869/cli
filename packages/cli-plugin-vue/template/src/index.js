<% if (useVue3) { %>
import { createApp } from 'vue'
<% } else { %>
import Vue from 'vue'
<% } %>
import router from './router'
import store from './store'
import App from './App'
<% if (useVue3) { %>
const app = createApp(App)

app.use(router)
app.use(store)
app.$mount('#app')
<% } else { %>
new Vue({
  router,
  store,
  render: () => h(App)
}).$mount('#app')
<% } %>

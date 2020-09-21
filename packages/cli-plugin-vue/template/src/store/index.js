<% if (useVue3) { %>
import { createStore } from 'vuex'

export default createStore({
  state () {
    return {
      count: 1
    }
  }
})
<% } else { %>
import Vuex from 'vuex'

export default new Vuex.Store({
  state: {
  },
  actions: {
  },
  mutations: {
  }
})
<% } %>

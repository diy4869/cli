<template>
  <div class="home">
    <button @click="increment">增加</button>
    <button @click="decrement">减少</button>
  </div>
</template>

<script>
<% if (!useVue3) { %>
export default {
  name: 'App',
  data () {
    return {
      count: 0
    }
  },
  methods: {
    increment () {
      this.count++
    },
    decrement () {
      this.count--
    }
  }
}
<% } else { %>
import { reactive, setup } from 'vue'
export default {
  setup () {
    const count = reactive(0)
    const increment = () => {
      count++
    }
    const decrement = () => {
      count++
    }
    return {
      count,
      increment,
      decrement
    }
  }
}
<% } %>
</script>

<style scoped>
</style>

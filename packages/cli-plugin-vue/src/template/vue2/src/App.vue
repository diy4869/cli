<template>
  <div class="home">
    <button @click="increment">增加</button>
    <button @click="decrement">减少</button>
  </div>
</template>

<script>
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
</script>
<style scoped>
</style>

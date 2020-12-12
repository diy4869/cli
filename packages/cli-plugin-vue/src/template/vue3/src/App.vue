<template>
  <div class="home">
    <button @click="increment">增加</button>
    <button @click="decrement">减少</button>
  </div>
</template>

<script>
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
</script>

<style scoped>
</style>

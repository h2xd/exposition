<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'

const data = ref([])

function load() {
  console.log('Load data')

  fetch('/cart').then(async (apiData) => {
    const jsonData = await apiData.json()

    data.value = jsonData
  })
}

</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />

  <button @click="load">
    Load
  </button>

  <ul>
    <li v-for="item in data" :key="item.id">
      Name: {{ item.name }}
      Price: {{ item.price }}
      Quantity: {{ item.quantity }}
    </li>
  </ul>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

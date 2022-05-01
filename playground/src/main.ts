import { createApp } from 'vue'
import { createExpositionFast } from '../../packages/core'
import expositionDevTools from '../../packages/vue-devtools/src'
import App from './App.vue'

const app = createApp(App)

let exposition = createExpositionFast({
  user: ['Dio', 'Jojo'],
  stand: ['The Worldo', 'Star Platinum'],
  game: ['Oh! That\'s Baseball!!', 'F-Mega'],
})

app.use(expositionDevTools, {
  exposition,
  onUpdate(newExposition: typeof exposition) {
    exposition = newExposition

    console.log('new Exposition', exposition)
  },
})

app.mount('#app')


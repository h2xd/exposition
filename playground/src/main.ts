import { createApp } from 'vue'
import { createExpositionFast } from '../../packages/core'
import expositionDevTools from '../../packages/vue-devtools/src'
import App from './App.vue'

const app = createApp(App)

const exposition = createExpositionFast({
  user: ['Dio', 'Jojo'],
  stand: ['The Worldo', 'Star Platinum'],
  game: ['Oh! That\'s Baseball!!', 'F-Mega'],
})

app.use(expositionDevTools, { exposition })

app.mount('#app')


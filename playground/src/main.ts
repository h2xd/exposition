import { createApp } from 'vue'
import type { ExpositionValues } from '../../packages/core'
import { createExposition, updateExpositionValues } from '../../packages/core'
import expositionDevTools from '../../packages/vue-devtools/src'
import App from './App.vue'

const app = createApp(App)

let exposition = createExposition({
  user: { options: ['Dio', 'Jojo'] },
  stand: { options: ['The Worldo', 'Star Platinum'] },
  game: { options: ['Oh! That\'s Baseball!!', 'F-Mega'] },
})

app.use(expositionDevTools, {
  exposition,
  onUpdate(newExpositionValue: ExpositionValues<typeof exposition>) {
    exposition = updateExpositionValues(exposition, newExpositionValue)

    console.log('new Exposition', exposition)
  },
})

app.mount('#app')


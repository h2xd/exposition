import { createApp } from 'vue'
import expositionDevTools from '../../packages/vue-devtools/src'
import App from './App.vue'
import { seedDatabase } from './mocks/mockDatabase'
import { playgroundExposition } from './mocks/exposition'
import { mockWorker, mswIntegration } from './mocks/mswIntegration'

const app = createApp(App)

seedDatabase()

app.use(expositionDevTools, {
  exposition: playgroundExposition,
  onUpdate: mswIntegration.updateValues,
})

mswIntegration.init()
mockWorker.start()

app.mount('#app')

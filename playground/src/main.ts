import { setupWorker } from 'msw'
import { createApp } from 'vue'
import type { ExpositionValues } from '../../packages/core'
import expositionDevTools from '../../packages/vue-devtools/src'
import { defineMSWIntegration } from '../../packages/msw'
import App from './App.vue'
import { handlerList, seedDatabase } from './mocks/handlers'
import { playgroundExposition } from './mocks/exposition'

const app = createApp(App)

seedDatabase()

const mockClient = setupWorker()

const { updateValues } = defineMSWIntegration({
  exposition: playgroundExposition,
  handlers: handlerList,
  msw: mockClient,
})

app.use(expositionDevTools, {
  exposition: playgroundExposition,
  onUpdate: updateValues,
})

mockClient.start()

app.mount('#app')


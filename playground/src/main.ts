import { createApp } from 'vue'
import { setupDevtools } from '@exposition/integrations/vue-devtools'
import App from './App.vue'
import { seedDatabase } from './mocks/mockDatabase'
import { playgroundExposition } from './mocks/exposition'
import { mockWorker, mswIntegration } from './mocks/mswIntegration'

const app = createApp(App)

seedDatabase()

// #region vue-devtools
mswIntegration.init()
mockWorker.start()

app.use(setupDevtools, {
  exposition: playgroundExposition,
  onUpdate(newValues: any, isEnabled: boolean) {
    if (!isEnabled) {
      mswIntegration.useNoHandlers()
      return
    }

    mswIntegration.updateValues(newValues)
  },
})

app.mount('#app')
// #endregion vue-devtools

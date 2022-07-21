import { createApp } from 'vue'
// import { setupDevtools } from '@exposition/integrations/vue-devtools'
import App from './App.vue'

import { playgroundExposition } from './utils/exposition'

const app = createApp(App)

// #region vue-devtools
playgroundExposition.init()

// app.use(setupDevtools, {
//   exposition: playgroundExposition,
//   onUpdate(newValues: any, isEnabled: boolean) {
//     if (!isEnabled) {
//       mswIntegration.useNoHandlers()
//       return
//     }

//     mswIntegration.updateValues(newValues)
//   },
// })

app.mount('#app')
// #endregion vue-devtools

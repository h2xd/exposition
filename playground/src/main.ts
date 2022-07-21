// #region vue-devtools
import { createApp } from 'vue'
import { setupDevtools } from '@exposition/integrations/vue-devtools'
import App from './App.vue'

import { playgroundExposition } from './utils/exposition'

const app = createApp(App)

app.use(setupDevtools, {
  exposition: playgroundExposition,
})

playgroundExposition.init()

app.mount('#app')
// #endregion vue-devtools

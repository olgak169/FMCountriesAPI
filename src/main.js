import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/styles/main.scss'

const init = async () => {
    const app = createApp(App)
    app.use(router)
    app.use(store)

    await router.isReady()

    app.mount('body')
}

init()

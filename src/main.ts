import { createApp } from 'vue'
import App from './frontend/App.vue'
import { createContext, ctxKey } from './frontend/context'

createContext().then((ctx) => {
	createApp(App).provide(ctxKey, ctx).mount('#app')
})

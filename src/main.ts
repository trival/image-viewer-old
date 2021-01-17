import { createApp } from 'vue'
import App from './frontend/App.vue'
import { createContext, ctxKey } from './frontend/context'
import './frontend/styles/index.css'

createContext().then((ctx) => {
	console.log('starting App with ctx: ', ctx)
	;(window as any).ctx = ctx
	createApp(App).provide(ctxKey, ctx).mount('#app')
})

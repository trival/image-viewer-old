import { createApp } from 'vue'
import App from './frontend/App.vue'
import { createContext } from './frontend/context'

createContext().then((ctx) => {
	createApp(App, { ctx }).mount('#app')
})

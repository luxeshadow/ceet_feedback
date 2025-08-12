import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/route'


const app = createApp(App) // crée l’instance

app.use(router) 

app.mount('#app') 

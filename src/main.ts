import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router/route';
import { createPinia } from 'pinia';
import { useUserStore } from '@/presentation/stores/userStore';

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);
app.use(router);
app.mount('#app');
const userStore = useUserStore();
userStore.loadUser();

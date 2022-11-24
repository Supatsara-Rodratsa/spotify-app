import { createApp } from 'vue';
import { createPinia } from 'pinia';
import AOS from 'aos';
import App from './App.vue';
import router from './router';

import './assets/main.css';

const app = createApp(App);
AOS.init();

app.use(createPinia());
app.use(router);

app.mount('#app');

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import '@/assets/css/style.less';

import router from './router';
import http from '@/api/request';
import App from './App.vue';

const app = createApp(App);
app.config.globalProperties.$http = http;

const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(ElementPlus);

app.mount('#app');

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import '@/assets/css/index.less';

import router from './router';
import http from '@/api/request';
import App from './App.vue';

import { $locale } from '@/utils/service'
const app = createApp(App);

app.config.globalProperties.$http = http;

app.mixin({
    methods: {
      $msg(key) {
        return $locale.MESSAGES[key]
      },
      $field(key) {
        return $locale.FIELDS[key]
      },
      $rollTo(offsetTop, el, behavior) {
        el.scrollTo({ top: Number(offsetTop), behavior, });
      },
    }
  })
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(ElementPlus);

app.mount('#app');

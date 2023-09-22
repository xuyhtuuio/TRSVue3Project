import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)
import globalCmps from '@/utils/globalCmps'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import '@/assets/css/style.less';
import '@/assets/icon/iconfont.css';
import '@/assets/icon/iconfont.js';


import App from './App.vue'
import router from './router'
import http from '@/api/request';
import { $locale } from '@/utils/service'
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
app.config.globalProperties.$http = http;
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.use(ElementPlus);
app.use(globalCmps)
app.mount('#app')
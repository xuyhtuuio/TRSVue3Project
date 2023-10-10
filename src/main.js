/*
 * @Author: nimeimix huo.linchun@trs.com.cn
 * @Date: 2023-09-21 18:39:05
 * @LastEditors: nimeimix huo.linchun@trs.com.cn
 * @LastEditTime: 2023-09-22 12:15:10
 * @FilePath: /protection-treatment/src/main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'echarts-wordcloud'
import globalCmps from '@/utils/globalCmps'
import onceClick from './utils/click-once';
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import '@/assets/css/style.less';
import '@/assets/css/element.less'
import '@/assets/icon/iconfont.css';
import '@/assets/icon/iconfont.js';


import App from './App.vue'
import router from './router'
import http from '@/api/request';
import { $locale } from '@/utils/service'

const app = createApp(App)
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
app.use(onceClick);
app.use(router);
app.use(ElementPlus, {
  locale: zhCn,
})

app.use(globalCmps)
app.mount('#app')
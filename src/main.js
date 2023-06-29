import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import '@/assets/font/font.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueCookies from 'vue-cookies'
import VueNativeSock from 'vue-native-websocket'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(VueCookies)
Vue.use(VueNativeSock, 'ws://26.30.247.224:5000/chat', {
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 3000,
  format: 'json',
  headers: {
    token: window.localStorage.getItem("token") // 替换为你的实际token值
  },
});
new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this //安装全局事件总线
  },
  router,
}).$mount('#app')
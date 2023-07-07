import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import '@/assets/font/font.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueCookies from 'vue-cookies'
import SocketIO from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(VueCookies)
// main.js  
const token = window.localStorage.getItem('token');
Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketIO('ws://api.mewtopia.cn:5000/chat', {
    autoConnect: false,
    extraHeaders: {
      'Access-Control-Allow-Origin': '*',
      'Authorization': token
    },
    // transports: ['websocket'],
  }),

}))



new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this //安装全局事件总线
  },
  router,
  beforeMount(){
    if (/Mobi|Android/i.test(navigator.userAgent)) {
      // 手机端访问，执行跳转操作
      alert("mewww!!我们有对应的App辣，为你跳转...")
      this.$router.push('/download')
    }
  },
  // sockets: {
  //   connecting() {
  //     console.log("正在连接");
  //   },
  //   disconnect() {
  //     console.log("Socket 断开");
  //   },
  //   connect_failed() {
  //     console.log("连接失败");
  //   },
  //   connect() {
  //     console.log("socket connected");
  //   },
  //   response: (data) => {
  //     console.log("我是在App里输出的")
  //     console.log(data);
  //   },
  // },
  
}).$mount('#app')
import Vue from 'vue'
import App from './App.vue'
import router from "@/router";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
// 引入storage工具
import {
  setStore,
  getStore,
  removeStore,
  setLStore,
  getLStore,
  removeLStore
} from './utils/storage'

// 导入样式
import './assets/css/bootstrap.css'
import './index.css'
Vue.prototype.setStore = setStore
Vue.prototype.getStore = getStore
Vue.prototype.removeStore = removeStore
Vue.prototype.setLStore = setLStore
Vue.prototype.getLStore = getLStore
Vue.prototype.removeLStore = removeLStore
Vue.config.productionTip = false
Vue.prototype.$axios=axios
Vue.use(ElementUI,{ size: 'small', zIndex: 3000 });
new Vue({
  render: h => h(App),
  router,
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$img = 'https://rookie-lin.oss-cn-qingdao.aliyuncs.com/auction_company/'
  }
}).$mount('#app')

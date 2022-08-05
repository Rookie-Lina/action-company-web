import Vue from 'vue'
import App from './App.vue'
import router from "@/router";
import ElementUI from 'element-ui';

// 导入样式
import './assets/css/bootstrap.css'
import './index.css'

Vue.config.productionTip = false
Vue.use(ElementUI,{ size: 'small', zIndex: 3000 });
new Vue({
  render: h => h(App),
  router
}).$mount('#app')

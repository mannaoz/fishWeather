import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import echarts from 'echarts'
import jquery from  'jquery'
// 引入utils工具包
import utils from './assets/js/utils'
import vuecookies from 'vue-cookies';

Vue.use(VueAxios,axios)
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.prototype._$=jquery
Vue.prototype.$cookies=vuecookies
Vue.prototype.$utils=utils


// 设置post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

import BaiduMap from 'vue-baidu-map'
 
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'M84eoH8HY49NOxTDDgPGRaAWo0EhpYlR'
})

// 携带cookie
axios.defaults.withCredentials=true;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.prototype.$bus = new Vue()  //透過此行宣告未來所有Vue實例皆可使用$bus方法，對event發送事件或監聽
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

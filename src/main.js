import Vue from 'vue'
import fastclick from 'fastclick'
import App from './App'
import router from './router'
import store from './store'
import 'common/js/flexible';


Vue.config.productionTip = false;
fastclick.attach(document.body);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});

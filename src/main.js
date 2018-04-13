import Vue from 'vue'
import VueLazyLoad from 'vue-lazyload';
import fastclick from 'fastclick'
import App from './App'
import router from './router'
import store from './store'
import 'common/js/flexible';

Vue.config.productionTip = false;
fastclick.attach(document.body);

let defaultImg =require(`./common/images/default@${window.devicePixelRatio!==3?2:3}x.png`);
Vue.use(VueLazyLoad,{
  preLoad: 1.3, //预装高度
  error:defaultImg,
  loading:defaultImg,
});


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});

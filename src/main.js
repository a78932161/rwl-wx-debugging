import Vue from 'vue'
import VConsole from 'vconsole'
import VueLazyLoad from 'vue-lazyload';
import fastclick from 'fastclick';
import Loading from './packages/loading';
import Alert from './packages/alert';
import Msg from './packages/msg';
import App from './App'
import router from './router'
import store from './store'
import 'common/js/flexible';
import {wxShareMixin} from 'common/js/mixin';


Vue.use(Loading);
Vue.prototype.$loading=Loading.service;
Vue.prototype.$alert=Alert;
Vue.prototype.$msg=Msg;

Vue.mixin(wxShareMixin);



Vue.config.productionTip = false;
fastclick.attach(document.body);



let defaultImg =require(`./common/images/default@${window.devicePixelRatio!==3?2:3}x.png`);
Vue.use(VueLazyLoad,{
  preLoad: 1.3, //预装高度
  error:defaultImg,
  loading:defaultImg,
});

process.env.NODE_ENV !== 'production'?new VConsole({maxLogNumber: 5000}):'';//console.log调试工具，发布时需注释

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});

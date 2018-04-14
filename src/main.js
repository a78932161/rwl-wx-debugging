import Vue from 'vue'
import VConsole from 'vconsole'
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

// let vConsole=new VConsole({maxLogNumber: 5000});  //console.log调试工具，发布时需注释


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});

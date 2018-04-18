/**
 * Created by Administrator on 2018/4/9.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import getters from './getters';
import shop from './modules/shop';
import msg from './modules/msg';

Vue.use(Vuex);

const debug=process.env.NODE_ENV !== 'production';
export default new Vuex.Store({
  modules:{
    shop,
    msg
  },
  getters,
  strict:debug,
  plugins:debug?[createLogger()]:[]
});

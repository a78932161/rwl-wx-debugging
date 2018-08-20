/**
 * Created by Administrator on 2018/5/21.
 */
import {getCode} from 'api/user';


const user = {
    state: {
      binding: false,
      bindCard: false,
      cno:'',
      phone: '',
      codeDown: 0
    },
    mutations: {
      SET_BINDING(state, flag){
        state.binding = flag;
      },
      SET_CNO(state, flag){
        state.cno = flag;
      },
      SET_BIND_CARD(state, flag){
        state.bindCard = flag;
      },
      SET_PHONE(state, flag){
        state.phone = flag;
      },
      SET_CODE_DOWN(state, flag){
        state.codeDown = flag;
      }
    },
    actions: {
      setUserInfo({commit}, data){
        commit('SET_BINDING', data.binding);
        commit('SET_PHONE', data.phone);
        commit('SET_BIND_CARD', data.bindingCard);
        commit('SET_CNO', data.cno);
      },
      codeCountDown({commit, state}, phone){
        const countDown = 90;
        commit('SET_CODE_DOWN', countDown);
        getCode(phone); //发送验证码
        let timer = setInterval(() => {
          commit('SET_CODE_DOWN', state.codeDown - 1);
          if (state.codeDown <= 0) {
            clearInterval(timer);
            commit('SET_CODE_DOWN', 0);
          }
        }, 1000)
      }
    }
  }
  ;
export default user;

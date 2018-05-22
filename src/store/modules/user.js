/**
 * Created by Administrator on 2018/5/21.
 */
import {getCode} from 'api/user';


const user = {
    state: {
      binding: false,
      phone: '',
      codeDown: 0
    },
    mutations: {
      SET_BINDING(state, flag){
        state.binding = flag;
      },
      SET_PHONE(state,flag){
        state.phone=flag;
      },
      SET_CODE_DOWN(state, flag){
        state.codeDown = flag;
      }
    },
    actions: {
      codeCountDown({commit, state}, phone){
        const countDown =90;
        commit('SET_CODE_DOWN', countDown);
        getCode(phone); //发送验证码
        let timer = setInterval(() => {
          commit('SET_CODE_DOWN', state.codeDown - 1);
          if (state.codeDown === 0) {
            clearInterval(timer)
          }
        }, 1000)
      }
    }
  }
  ;
export default user;

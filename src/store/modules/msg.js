/**
 * Created by Administrator on 2018/4/18.
 */
const msg={
  state:{
    content:'',
    event:''
  },
  mutations:{
    SET_MSG_CONTENT(state,flag){
      state.content=flag;
    },
    SET_MSG_EVENT(state,flag){
      state.event=flag;
    }
  }
};
export default msg;

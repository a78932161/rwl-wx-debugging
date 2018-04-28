/**
 * Created by Administrator on 2018/4/28.
 */
const order={

  state:{
    selectItem:{},
    isFinish:false
  },
  mutations:{
    SET_SELECT_ITEM(state,flag){
      state.selectItem=flag;
    },
    SET_IS_FINISH(state,flag){
      state.isFinish=flag;
    }
  }

};
export default order;

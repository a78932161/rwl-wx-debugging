/**
 * Created by Administrator on 2018/4/11.
 */
const shop={
 state:{
   barState:false,
   barHeight:0,
   list:[]
 },
  mutations:{
   SET_BAR_HEIGHT(state,flag){
     state.barHeight=flag;
   },
   SET_SHOP_LIST(state,flag){
     state.list=flag;
   },
    SET_BAR_STATE(state,flag){
     state.barState=flag;
    }
  }
};
export default shop;

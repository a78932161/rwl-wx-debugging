/**
 * Created by Administrator on 2018/4/23.
 */
import Vue from 'vue';
import msgVue from './msg.vue';



const MsgConstructor=Vue.extend(msgVue);
MsgConstructor.prototype._show=function(content){
  this.show();
  this.content=content;
};

let instance=new MsgConstructor();
document.body.appendChild(instance.$mount().$el);

let msg=(flag)=>{
  if(flag==null) return;
  flag?instance._show(flag):instance.hide();
  return instance;
};

msg.show=function(content){
  return msg(content);
};
msg.hide=function(){
  return msg(false);
};

msg.setShow=function(content,time){
  instance.content=content||'';
  instance.setShow(time);
  console.log(instance)
};

export default msg;

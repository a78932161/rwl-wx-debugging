/**
 * Created by Administrator on 2018/4/19.
 */
import Vue from 'vue';
import loadingVue from './loading.vue';

const LoadingConstructor=Vue.extend(loadingVue);
LoadingConstructor.prototype._initial=function(){
 this.hide();
 this.screen=true;
};
let instance=new LoadingConstructor();
instance._initial();
document.body.appendChild(instance.$mount().$el);

const Loading=(options={})=>                                                                                                                                                          {
  switch (typeof options){
    case 'boolean':
      options?instance.show():instance.hide();
      break;
    case 'string':
      instance.show(options);
      break;
    default:
      break;
  }
  return instance;
};
Loading.show=(text)=>{
  return Loading(text||true);
};
Loading.hide=()=>{
  instance.title='正在载入...';
  return Loading(false);
};
export default Loading;

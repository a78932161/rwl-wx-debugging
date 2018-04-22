/**
 * Created by Administrator on 2018/4/20.
 */
import Vue from 'vue';
import alertVue from './alert.vue';

const AlertConstructor = Vue.extend(alertVue);
const instance = new AlertConstructor();

AlertConstructor.prototype._callback= function(resolve, reject){

  this.confirm =  ()=> {
    this.hide();
    resolve();
  };
  this.cancel =  ()=> {
    this.hide();
    reject();
  };
};

AlertConstructor.prototype._show=function (content) {
  this.content=content;
  this.show();
};


document.body.appendChild(instance.$mount().$el);

let Alert = (cotntent, options) => {
  if (!cotntent) return;
  instance._show(cotntent);
  options = options || false;
  if (typeof options === 'string') {
    instance.confirmBtnText = options;
  }
  else if (options instanceof Array) {
    instance.confirmBtnText = options[0] || '确定';
    instance.cancelBtnText = options[1] || '';
  }
  if (typeof Promise !== 'undefined') {
    return new Promise((resolve, reject) => {
      instance._callback(resolve, reject);
    })
  }
};


export default Alert;

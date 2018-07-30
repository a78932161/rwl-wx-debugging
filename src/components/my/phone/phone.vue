<template>
  <div class="phone">
    <div class="phone-wrapper">
      <input type="number"
             v-model="phone"
             v-border
             placeholder="输入手机号码"
             :class="['text',phoneBorderClass]"/>
      <span class="get-button" v-text="codeText" @click="getCode"></span>
    </div>
    <input type="number" v-model="code" placeholder="输入验证码" class="code"/>
    <span :style="bindTextStyle" class="bind" v-text="bindText" @click="bindPhone"></span>
    <alert-box title="用户协议" ref="alertBox" :content="userProtocol"
               @cancelClick="cancelClick"></alert-box>
  </div>
</template>

<script>


  import {mapGetters, mapActions, mapMutations} from 'vuex';
  import AlertBox from 'base/alert-box/alert-box';
  import {verifyCode, changePhone} from 'api/user';
  import {getText} from 'api/info';
  import {ERR_OK, platformText} from 'api/config';
  export default {
    data(){
      return {
        bindStatus: 0,//0:未绑定，1:已绑定，2:旧手机验证成功
        phone: '',
        code: '',
        userProtocol: ''
      }
    },
    components: {
      AlertBox
    },
    computed: {
      phoneBorderClass(){
        return this.bindStatus === 1 ? '' : 'border'
      },
      bindTextStyle(){
        return `background-color:${this.phone && this.code ? '#01C6FD' : '#DFDFDF'}`
      },
      bindText(){
        return this.bindStatus === 1 ? '验证旧手机' : '绑定新手机'
      },
      codeText(){
        return this.codeDown ? `${this.codeDown}s` : '获取验证码'
      },
      ...mapGetters([
        'codeDown',
        'binding',
        'mPhone'
      ])
    },
    directives: {
      border: {
        bind(el, binding, vnode){
          el.disabled = (vnode.context.bindStatus === 1) ? 'disabled' : ''
        },
        update(el, binding, vnode){
          el.disabled = (vnode.context.bindStatus === 1) ? 'disabled' : ''
        }
      }
    },
    created(){
      if (this.binding) { //binding存在时，即已经绑定手机
        this.bindStatus = 1;
        this.phone = this.mPhone;
        return;
      }
     this.loadUserProtocol();

    },
    activated(){
      this.loadUserProtocol();
    },
    methods: {
      loadUserProtocol(){
        this.$loading.show();
        this.$nextTick(() => {   //注册前显示用户协议
          getText(platformText.userProtocol).then((ops) => {
            if (ops.code === ERR_OK) {
              this.userProtocol = ops.data.content;
              this.$refs.alertBox.show();
              this.$loading.hide();
            }
          });
        });
      },
      cancelClick(){
        this.$router.back();
        this.$msg.setShow('同意协议以后，才可注册');
      },
      bindPhone(){
        if (this.phone && this.code) {   //手机号码和验证码都有填写的情况下
          this.$loading.show('请稍等');
          verifyCode(this.phone, this.code).then((ops) => {
            this.$loading.hide();
            if (ops.code === ERR_OK) {
              switch (this.bindStatus) {
                case 0:  //未绑定状态，成功后，更改vuex=>binding
                  this.setBinding(true);
                  this.setPhone(this.phone);
                  this.bindStatus = 1;
                  this.code = '';
                  this.$msg.setShow('手机绑定成功');
                  if (this.$route.query.pay) { //query.pay存在时，即从支付页面进来
                    this.$router.back();
                  }
                  break;
                case 1:   //绑定状态，成功后，可以更换手机
                  this.bindStatus = 2;
                  this.phone = '';
                  this.code = '';
                  this.setCodeDown(0);
                  this.$msg.setShow('手机验证成功');
                  break;
                case 2:
                  changePhone(this.phone).then((ops) => {
                    if (ops.code === ERR_OK) {
                      this.setPhone(this.phone);
                      this.bindStatus = 1;
                      this.code = '';
                      this.$msg.setShow('手机修改成功');
                    }
                  }).catch(() => {
                    this.$loading.hide();
                  });
                  break;
              }
            }
            else {
              this.$msg.setShow('验证码错误');
              this.$loading.hide();
            }
          }).catch(() => {
            this.$loading.hide();
          })


        }
      },
      getCode(){
        let phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
        if (phoneReg.test(this.phone)) {
          this.codeDown === 0 ? this.codeCountDown(this.phone) : ''
        }
        else {
          this.$msg.setShow('手机格式错误')
        }

      },
      ...mapMutations({
        setBinding: 'SET_BINDING',
        setPhone: 'SET_PHONE',
        setCodeDown: 'SET_CODE_DOWN'
      }),
      ...mapActions([
        'codeCountDown'
      ])
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~common/css/mixin";
  @import "~common/css/variable";

  .phone {
    z-index: 10;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: $color-background-d;

    .phone-wrapper {
      display: flex;
      align-items: center;
      margin-top: px2rem(59);
      .text {
        display: flex;
        justify-content: center;
        align-items: center;
        width: px2rem(294);
        height: px2rem(60);
        @include font(0);
        margin-right: px2rem(16);
        color: $color-text-l;
        text-indent: px2rem(27);
        border-radius: px2rem(6);
        &.border {
          border: px2rem(2) solid $color-text-l;
        }
      }
      .get-button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: px2rem(172);
        height: px2rem(59);
        color: #fff;;
        background: #6891B4;
        border-radius: px2rem(6);
      }
    }
    .code {
      width: px2rem(482);
      height: px2rem(59);
      @include font(0);
      margin: px2rem(15) 0 px2rem(42) 0;
      color: $color-text-l;
      border: px2rem(2) solid $color-text-l;
      text-indent: px2rem(27);
      border-radius: px2rem(6);
    }
    .bind {
      display: flex;
      justify-content: center;
      align-items: center;
      width: px2rem(482);
      height: px2rem(58);
      color: #fff;
      border-radius: px2rem(6);
    }
  }
</style>

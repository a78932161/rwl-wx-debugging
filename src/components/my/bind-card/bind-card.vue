<template>
  <div class="bind-card">

    <div class="phone-wrapper">
      <input type="number"
             v-model="phone"
             placeholder="请输入手机号码"
             class="text"/>
      <span class="get-button" v-text="codeText" @click="getCode"></span>
    </div>

    <input type="number"
           placeholder="请输入卡号"
           v-model="card"
           class="input card"/>
    <input type="number"
           placeholder="请输入验证码"
           v-model="code"
           class="input code"/>
    <span :style="bindTextStyle"
          v-text="bindText"
          class="bind"
          @click="bindCardClick"></span>
    <span class="card-info" v-show="cid" v-text="cardInfo"></span>

  </div>
</template>


<script>
  import {mapGetters, mapMutations,mapActions} from 'vuex';
  import {bindingCard} from 'api/user';
  import {ERR_OK} from 'api/config';

  export default {
    data(){
      return {
        phone:'',
        card: '',
        code: ''
      }
    },
    computed: {
      cardInfo(){
        return `当前绑定的卡号为：${this.cid}`
      },
      bindText(){
        return this.bindCard ? '更改卡号' : '绑定卡号';
      },
      bindTextStyle(){
        return `background-color:${this.card && this.code && this.phone? '#01C6FD' : '#DFDFDF'}`
      },
      codeText(){
        return this.codeDown ? `${this.codeDown}s` : '获取验证码'
      },
      ...mapGetters([
        'codeDown',
        'bindCard',
        'cid'
      ])
    },
    methods: {
      getCode(){
        let phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
        if (phoneReg.test(this.phone)) {
          this.codeDown === 0 ? this.codeCountDown(this.phone) : ''
        }
        else {
          this.$msg.setShow('手机格式错误')
        }

      },
      bindCardClick(){
        if (this.card && this.code && this.phone) {
          this.$loading.show('请稍等');
          bindingCard(this.phone,this.card, this.code).then((ops) => {
            this.$loading.hide();
            if (ops.code === ERR_OK) {
              this.setBindCard(true);
              this.setCid(this.card);
              this.setCodeDown(0);
              this.card = '';
              this.code = '';
              this.phone='';
              this.$msg.setShow('绑定成功');
              return;
            }
            this.$msg.setShow(ops.msg)
          }).catch(()=>{
            this.$loading.hide();
          })
        }

      },
      ...mapMutations({
        setBindCard: 'SET_BIND_CARD',
        setCid: 'SET_CID',
        setCodeDown:'SET_CODE_DOWN'
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

  .bind-card {
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
      margin-top: px2rem(100);
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
        border: px2rem(2) solid $color-text-l;
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
    .input {
      width: px2rem(482);
      height: px2rem(59);
      @include font(0);
      color: $color-text-l;
      border: px2rem(2) solid $color-text-l;
      text-indent: px2rem(27);
      border-radius: px2rem(6);
      margin-top: px2rem(30);
    }
    .bind {
      display: flex;
      justify-content: center;
      align-items: center;
      width: px2rem(482);
      height: px2rem(58);
      color: #fff;
      border-radius: px2rem(6);
      margin-top: px2rem(42);
    }
    .card-info {
      color: $color-theme;
      margin-top: px2rem(35);
      @include font(2);
    }

  }
</style>

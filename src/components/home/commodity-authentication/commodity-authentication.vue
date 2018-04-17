<template>
  <transition name="cover">
  <div class="commodity-authentication" v-show="showFlag" @touchmove.prevent @click="hide">
    <div class="authentication-container" @click.stop>
      <div class="wrapper">
        <p class="text"><i class="iconfont icon-xuanzhong"></i><span>企业认证</span></p>
        <span class="text-detail">改店铺已通过有赞企业认证，请放心购买</span>
      </div>
      <div class="wrapper">
        <p class="text"><i class="iconfont icon-xuanzhong"></i><span>担保交易</span></p>
        <span class="text-detail">该笔订单享受有赞提供的全程消费保障，请放心购买</span>
      </div>
    </div>
    <B-button content="我知道了"
              bgColor="#FF8854"
              @buttonClick="hide"
    ></B-button>
  </div>
  </transition>
</template>

<script>
  import BButton from 'base/b-button/b-button';
  export default {
      data(){
        return {
            showFlag:false
        }
      },
    components: {
      BButton
    },
    methods:{
     show(){
         this.showFlag=true;
     },
     hide(){
       this.showFlag=false;
     }
    }
  }
</script>


<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~common/css/mixin";
  @import "~common/css/variable";

  .commodity-authentication {
    z-index:10;
    position: fixed;
    top: 0;
    @include px2rem(bottom, $button-height);
    left: 0;
    right: 0;
    background: $color-background-cover;
    &.cover-enter-active,&.cover-leave-active{
      transition: all .3s;
      .authentication-container{
        transition: all .3s;
      }
    }
    &.cover-enter,&.cover-leave-to{
      .authentication-container{
       transform: translate(0,100%);
      }
    }

    .authentication-container {
      position: absolute;
      bottom: 0;
      width: 10rem;
      background:$color-background-d;
      .wrapper{
        display: flex;
        flex-direction: column;
        &:nth-last-child(1){
          @include px2rem(margin-bottom,56);
        }
          .text{
            display: flex;
            align-items: center;
            padding: px2rem(55) 0 px2rem(21) px2rem(50);
            i{
              color:#8FFC96;
              @include font(3);
              @include px2rem(margin-right,25);
            }
          }
        .text-detail{
          color: $color-text-d;
          @include px2rem(margin-left,105);
        }
      }
    }
  }
</style>

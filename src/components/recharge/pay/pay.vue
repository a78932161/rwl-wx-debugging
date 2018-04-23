<template>
  <div class="pay">
    <scroll>
    <div class="scroll-container">
    <ul class="recharge-list">
      <li class="recharge-item"
          @click="selectRecharge(index)"
          v-for="(item,index) in rechargeList">
        <span class="name">充200元</span>
        <span class="give">送5</span>
        <i :class="['icon','iconfont',iconClass(index)]"
           :style="iconStyle(index)"></i>
      </li>

    </ul>
    <div class="info-container">
      <div class="chose-pay">
        <span class="text">当前选择</span>
        <span class="name">充200元送5元</span>
      </div>
      <span class="line"></span>
      <div class="balance">
        <span class="text">充值后余额</span>
        <p class="name"><span class="num">205.00</span>元</p>
      </div>
    </div>
    <span class="button">确定充值</span>
    </div>
    </scroll>
  </div>
</template>

<script>
  import Scroll from 'base/scroll/scroll';
  export default {
      data(){
        return {
            rechargeList:[1,2,3,4],
            index:0
        }
      },
      components:{
          Scroll
      },
    methods:{
      iconStyle(index){
        return `color:${this.index!==index?'#C8C5C5':''}`
      },
      iconClass(index){
        return this.index!==index?'icon-weixuanzhong':'icon-danxuanxuanzhong';
      },
      selectRecharge(index){
         this.index=index;
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~common/css/mixin";
  @import "~common/css/variable";

  .pay {
    z-index: 10;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: $color-background-d;
    .scroll-container{
      display: flex;
      flex-direction: column;
      align-items: center;
      .recharge-list {
        .recharge-item {
          display: flex;
          align-items: center;
          width: px2rem(656);
          height: px2rem(120);
          border-bottom: px2rem(3) solid $color-line-d;
          .name {
            font-weight: 600;
            @include font(12);
            text-indent: px2rem(6);
            margin-right: px2rem(53);
          }
          .give {
            display: flex;
            justify-content: center;
            align-items: center;
            width: px2rem(111);
            height: px2rem(52);
            border-radius: px2rem(10);
            background: $color-theme;
            color: #fff;
            @include font(5);
            margin-right: px2rem(236);
          }
          .icon {
            @include font(11);
            color: $color-theme;
          }
        }
      }
      .info-container {
        display: flex;
        align-items: center;
        @include font(5);
        margin: px2rem(60) 0 px2rem(139) 0;
        .chose-pay {
          display: flex;
          flex-direction: column;
          align-items: center;
          .text {
            margin-bottom: px2rem(18);
          }
        }
        .line {
          width: px2rem(8);
          height: px2rem(115);
          background: #CDD2D5;
          margin: 0 px2rem(94) 0 px2rem(70);
        }
        .balance {
          display: flex;
          flex-direction: column;
          align-items: center;
          .text {
            margin-bottom: px2rem(18);
          }
          .name {
            .num {
              @include font(7);
              color: #CA1400;
            }
          }
        }

      }
      .button{
        display: flex;
        justify-content: center;
        align-items: center;
        width: px2rem(700);
        height: px2rem(89);
        background: $color-theme;
        color:#fff;
        @include font(5);
        border-radius: px2rem(6);
        margin-bottom: px2rem(50);
      }
    }

  }
</style>

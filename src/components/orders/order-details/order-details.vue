<template>
  <div class="order-details">
    <scroll>
    <div>
   <div class="laundry-progress" :style="bgPosition"></div>
  <!--  <mall-progress class="mall-progress"></mall-progress>-->
    <div class="details">
      <div class="title-box">
        <span class="block"></span>
        <span class="title">订单详情</span>
      </div>
      <div class="details-box">
        <p class="item"><span class="text">订单价格</span><span class="val price">￥88.00</span></p>
        <p class="item"><span class="text">付款方式</span><span class="val">微信支付</span></p>
        <p class="item"><span class="text">付款状态</span><span class="val status">已支付</span></p>
        <p class="item"><span class="text">订单编号</span><span class="val">1234567890</span></p>
        <p class="item"><span class="text">联系人</span><span class="val">陈小姐</span></p>
        <p class="item"><span class="text">联系方式</span><span class="val">11112121542</span></p>
        <p class="item"><span class="text">收货地址</span><span class="val">温州市鹿城区广场路12栋110室</span></p>
      </div>
    </div>
    </div>
    </scroll>
    <b-button content="完结订单"></b-button>
  </div>
</template>



<script>
  import MallProgress from 'components/orders/mall-progress/mall-progress';
  import Scroll from 'base/scroll/scroll';
  import BButton from 'base/b-button/b-button';
  export default {
      components:{
        MallProgress,
        BButton,
        Scroll
      },
    computed:{
        bgPosition(){
            return `background-position:-10rem 0`
        }
    }
  }
</script>


<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~common/css/mixin";
  @import "~common/css/variable";

.order-details{
  position: fixed;
  top: 0;
  bottom:px2rem($button-height);
  left: 0;
  right: 0;
  background: $color-background-d;
  .laundry-progress{
      width: 10rem;
      height: px2rem(457);
      @include bg-image('./laundry-img');
      background-size:px2rem(3750) px2rem(457);
  }
  .mall-progress{
    margin-top: px2rem(40);
  }
  .details{
    margin-top: px2rem(120);
    .title-box{
      display: flex;
      align-items: center;
      margin-bottom: px2rem(45);
      .block{
        width: px2rem(19);
        height: px2rem(37);
        background: $color-theme;
        margin-right: px2rem(20);
      }
      .title{
        @include font(5);
      }
    }
    .details-box{
      margin-left:px2rem(42);
      padding-bottom: 80px;
      .item{
        display: flex;
        align-items: center;
        margin-bottom: px2rem(26);
        .text{
          color: $color-text-ll;
          @include font(2);
          margin-right:px2rem(60);
        }
        .val{
          @include font(2);
          &.price{
            color: #FE3D38;
            @include font(7);
          }
          &.status{
            color:$color-theme;
          }
        }
      }


    }
  }
}

</style>

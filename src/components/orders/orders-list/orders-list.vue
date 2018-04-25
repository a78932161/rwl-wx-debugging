<template>
  <div class="orders-list">
    <scroll>
    <ul>
      <li class="item">
        <div class="item-info">
          <img src=""  />
          <div class="wrapper">
          <div class="price-container">
            <span class="name">高级光面皮鞋维多利亚膏</span>
            <span class="price">￥30</span>
          </div>
          <div class="number-container">
            <span class="name">净含量：75ml</span>
            <span class="number">x1</span>
          </div>
        </div>
        </div>
        <p class="price-sum"><span class="text">共一件商品合计：</span><span class="sum">￥30.9</span></p>
        <div class="button-container">
          <span class="cancel">取消订单</span>
          <span class="check">查看进度</span>
          <span class="finish">完结订单</span>
        </div>
      </li>
    </ul>
    </scroll>
  </div>
</template>

<script>
  import Scroll from 'base/scroll/scroll';
  export default {
      components:{
          Scroll
      }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~common/css/mixin";
  @import "~common/css/variable";

  .orders-list {
    position: absolute;
    top: 0;
    bottom: px2rem($tab-height);
    left: 0;
    right: 0;
    background: $color-background-d;
    .item{
      width: 10rem;
      .item-info{
        display: flex;
        align-items: center;
        width: 100%;
        height: px2rem(185);
        background: #FAFAFA;
        img{
          width: px2rem(160);
          height: px2rem(157);
          margin-left:px2rem(25);
        }
        .wrapper{
          margin-left: px2rem(33);
          .price-container{
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: px2rem(565);
            @include font(2);
            margin-bottom: px2rem(63);
            .name{
              flex-grow: 1;
              font-weight: 600;
            }
            .price{

              font-weight: 600;
              margin-right: px2rem(27);
            }
          }
          .number-container{
            display: flex;
            justify-content: space-between;
            align-items: center;
            @include font(-1);
            color: $color-text-d;
            .net-content{
              flex-grow: 1;
            }
            .number{
              margin-right: px2rem(27);
            }
          }
        }


      }
      .price-sum{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-right:px2rem(27);
        height: px2rem(85);
        border-bottom:px2rem(4) solid #F0F0F0;
        .text{
          @include font(-1);
        }
        .sum{
          @include font(2);
        }
      }
      .button-container{
        display: flex;
        align-items: center;
        width: 10rem;
        height:px2rem(93);
        border-bottom: px2rem(15) solid #F4F4F4;
        .button{
          display: flex;
          justify-content:center;
          align-items: center;
          width: px2rem(158);
          height: px2rem(58);
          @include font(-1);
          box-sizing: border-box;
          border-radius: px2rem(30);
          border:px2rem(2) solid #000;
        }
        .cancel{
          @extend .button;
          margin-left: px2rem(203);
        }
        .check{
          @extend .button;
          margin: 0 px2rem(26);
        }
        .finish{
          @extend .button;
          color: $color-theme;
          border:px2rem(2) solid $color-theme;
        }
      }

    }
  }
</style>

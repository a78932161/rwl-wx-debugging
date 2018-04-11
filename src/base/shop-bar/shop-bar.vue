<template>
  <div class="shop-bar">
    <div class="left-box">
      <div class="logo"></div>
      <span class="price">¥ 398.00</span>
    </div>
    <span class="right-button">去结算</span>
  </div>
</template>


<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~common/css/mixin";
  @import "~common/css/variable";

  .shop-bar {
    display: flex;
    justify-content: space-between;
    width: 10rem;
    @include px2rem(height, $tab-height);
    position: fixed;
    bottom: 0;
    background: #313236;
    z-index: 100;
    .left-box {
      display: flex;
      align-items: center;
      height: 100%;
      .logo {
        @include px2rem(width, 88);
        @include px2rem(height, 88);
        background-size:px2rem(88) px2rem(88);
        @include px2rem(margin-left, 31);
        @include bg-image('./logo');
      }
      .price {
        font-weight: 600;
        color: $color-theme;
        @include font(10);
        @include px2rem(margin-left, 26);

      }

    }
    .right-button{
      display: flex;
      justify-content: center;
      align-items: center;
      @include px2rem(width,224);
      height:100%;
      @include font(5);
      background: $color-theme;
      color: #fff;
    }
  }

</style>


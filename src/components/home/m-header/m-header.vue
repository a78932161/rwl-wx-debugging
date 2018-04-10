<template>
  <div class="m-header">
    <div class="header-container">
      <div class="logo"></div>
      <div class="right-box">
        <div class="position item">
          <i class="icon iconfont icon-dingwei"></i>
          <span class="text">浙江杭州</span>
        </div>
        <div class="service item">
          <i class="icon iconfont icon-dianhua"></i>
          <span class="text">联系客服</span>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~common/css/mixin";
  @import "~common/css/variable";
  .m-header{
    width: 10rem;
    @include px2rem(height,93);
    background: $color-background-d;
    .header-container{
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 9rem;
      margin-left: 0.5rem;
      height: 100%;
      .logo{
        @include px2rem(width,130);
        @include px2rem(height,27);
        background-size:px2rem(130) px2rem(27);
        @include bg-image('./name')
      }
      .right-box{
        display: flex;
          .item{
            display: flex;
            align-items: center;
            .icon{
              @include font(4);
              @include px2rem(margin-right,16);
            }
          .icon,.text{
            color: $color-theme;
          }
          }
        .position{
          @include px2rem(margin-right,40);
        }
      }
    }
  }
</style>

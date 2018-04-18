<template>
  <div class="tab">
    <div class="item">
      <div class="left-box">
        <i class="icon iconfont icon-shouji01"></i>
        <span class="text">更改绑定</span>
      </div>
      <div class="right-box">
        <i class="icon iconfont  icon-iconfonticonfonti2copycopy"></i>
      </div>
    </div>

    <router-link tag="div" to="/my/address" class="item">
      <div class="left-box">
        <i class="icon iconfont icon-dizhi"></i>
        <span class="text">地址管理</span>
      </div>
      <div class="right-box">
        <i class="icon iconfont  icon-iconfonticonfonti2copycopy"></i>
      </div>
    </router-link>

    <div class="item">
      <div class="left-box">
        <i class="icon iconfont icon-icon-test1"></i>
        <span class="text">余额</span>
      </div>
      <div class="right-box">
        <i class="icon iconfont  icon-iconfonticonfonti2copycopy"></i>
      </div>
    </div>

    <div class="item">
      <div class="left-box">
        <i class="icon iconfont icon-gengduo2"></i>
        <span class="text">更多</span>
      </div>
      <div class="right-box">
        <i class="icon iconfont  icon-iconfonticonfonti2copycopy"></i>
      </div>
    </div>
  </div>
</template>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~common/css/mixin";
  @import "~common/css/variable";
  .tab {
    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: px2rem(63);
      &:nth-child(1){
        margin-top: 0;
      }
      &:nth-child(3) {
        .left-box i, span, .right-box i, span {
          color: $color-theme !important;

        }
      }
      .left-box {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: px2rem(35);
        .icon {
          @include font(10);
          margin-right: px2rem(30);
          color: $color-text-l;
        }
        .text {
          @include font(3);
        }
      }
      .right-box {
        margin-right: px2rem(35);
        .icon {
          @include font(3);
          color: $color-text-l;
        }
      }

    }

  }


</style>

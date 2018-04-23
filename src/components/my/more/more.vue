<template>
  <div class="more">
    <div class="item">
      <span class="text">关于小让</span>
      <i class="icon iconfont icon-iconfonticonfonti2copycopy"></i>
    </div>
    <div class="item">
      <span class="text">加入小让</span>
      <i class="icon iconfont icon-iconfonticonfonti2copycopy"></i>
    </div>
    <div class="item">
      <span class="text">加盟小让</span>
      <i class="icon iconfont icon-iconfonticonfonti2copycopy"></i>
    </div>
    <div class="item">
      <span class="text">用户协议</span>
      <i class="icon iconfont icon-iconfonticonfonti2copycopy"></i>
    </div>
    <router-link tag="div" to="/my/more/suggest" class="item">
      <span class="text">意见反馈</span>
      <i class="icon iconfont icon-iconfonticonfonti2copycopy"></i>
    </router-link>
    <div class="item">
      <span class="text">beta测试版</span>
      <i class="icon iconfont icon-iconfonticonfonti2copycopy"></i>
    </div>
    <router-view></router-view>

  </div>
</template>


<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~common/css/mixin";
  @import "~common/css/variable";
  .more {
    z-index: 10;
    position: fixed;
    top: 0;
    bottom: 0;
    left:0;
    right: 0;
    background:$color-background-d;
    .item{
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: px2rem(119);
      border-bottom:px2rem(8) solid $color-line;
      .text{
        @include font(2);
        margin-left: px2rem(45);
      }
      .icon{
        @include font(3);
        margin-right:px2rem(40);
        color: $color-text-l;
      }
    }
  }
</style>

<template>
  <div class="m-menu" @click.stop>
    <div class="menu-item">
      <div class="icon-box bg-xy">
        <i class="iconfont icon-yifu"></i>
      </div>
      <div class="name-box">
        <span class="name">洗衣</span>
        <span class="introduce">8元/件起</span>
      </div>
    </div>

    <div class="menu-item">
      <div class="icon-box bg-jj">
        <i class="iconfont icon-shafa"></i>
      </div>
      <div class="name-box">
        <span class="name">小让家居</span>
        <span class="introduce">沙发/床垫/地毯</span>
      </div>
    </div>

    <div class="menu-item">
      <div class="icon-box bg-xh">
        <i class="iconfont icon-baobao"></i>
      </div>
      <div class="name-box">
        <span class="name ">高端洗护</span>
        <span class="introduce">箱包/皮具/皮革</span>
      </div>
    </div>

    <div class="menu-item">
      <div class="icon-box bg-sc">
        <i class="iconfont icon-shangdian"></i>
      </div>
      <div class="name-box">
        <span class="name">小让商城</span>
        <span class="introduce">箱包/皮具/皮革</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~common/css/mixin";
  @import "~common/css/variable";

  .m-menu {
    display: flex;
    flex-wrap: wrap;
    @include px2rem(width, 726);
    @include px2rem(height, 327);
    @include px2rem(margin-top, 25);
    background: #fff;
    .menu-item {
      display: flex;
      align-items: center;
      box-sizing: border-box;
      width: 50%;
      height: 50%;
      &:nth-child(1) {
        border-bottom: px2rem(3) solid $color-line-d;
        border-right: px2rem(3) solid $color-line-d;
      }
      &:nth-child(2) {
        border-bottom: px2rem(3) solid $color-line-d;
      }
      &:nth-child(3) {
        border-right: px2rem(3) solid $color-line-d;
      }

      .icon-box {
        display: flex;
        justify-content: center;
        align-items: center;
        @include px2rem(width, 87);
        @include px2rem(height, 87);
        margin: 0 px2rem(36);
        border-radius: 50%;
        i {
          color: #fff;
          font-size: 70px;
        }
        &.bg-xy {
          background: #00C6FF;
        }
        &.bg-jj, &.bg-xh {
          background: #35ABF5;
        }
        &.bg-sc {
          background: #FE5D86;
        }
      }
      .name-box {
        display: flex;
        flex-direction: column;
        .name {
          font-weight: 600;
          @include font(2);
          color: $color-text;
          @include px2rem(margin-bottom, 11);
        }
        .introduce {
          @include font(-1);
          color: $color-text-l;
        }
      }
    }
  }
</style>

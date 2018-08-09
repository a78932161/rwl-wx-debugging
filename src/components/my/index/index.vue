<template>
  <div class="my">
    <scroll>
      <div class="scroll-wrapper">
        <div class="img"></div>
        <tab></tab>
        <span class="phone">联系客服 400-0878-315</span>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>


<script>
  import Tab from 'components/my/tab/tab'
  import Scroll from 'base/scroll/scroll'
  export default {
    components: {
      Tab,
      Scroll
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~common/css/mixin";
  @import "~common/css/variable";

  .my {
    position: absolute;
    top: 0;
    @include px2rem(bottom, $tab-height);
    left: 0;
    right: 0;
    background: $color-background-d;
    .scroll-wrapper{
      height: 125%;
      .img{
        width:10rem;
        height:px2rem(423);
        background-size:px2rem(200) px2rem(200);
        background-repeat:no-repeat;
        background-position:50% 50%;
        @include bg-image('./logo');
      }
      .phone {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 10rem;
        @include font(3);
        font-weight: 600;
        margin-top: px2rem(200);
        color: $color-text-l;
      }
    }

  }
</style>

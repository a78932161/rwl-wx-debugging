<template>
  <div class="no-result">
    <div class="no-result-icon"></div>
    <p class="no-result-text" v-text="title"></p>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: '抱歉，暂无搜索结果'
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~common/css/mixin";
  @import "~common/css/variable";
  .no-result{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .no-result-icon{
      @include px2rem(width,86);
      @include px2rem(height,90);
      @include bg-image('~common/images/default');
    }
    .no-result-text{
      @include px2rem(margin-top,30);
      @include font(2);
    }
  }
</style>

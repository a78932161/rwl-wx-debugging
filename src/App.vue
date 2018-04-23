<template>
  <div id="app">
    <keep-alive>
      <router-view class="router-view"></router-view>
    </keep-alive>
    <tab></tab>
  </div>
</template>

<script>
  import Tab from 'components/tab/tab'
  export default {
    name: 'App',
    components: {
      Tab
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "~common/css/base";
  @import "~common/css/mixin";
  @import "~common/css/variable";

  #app {
    height: 100%;
    .router-view {
      overflow-x: hidden;
      height: calc(100% - #{px2rem($tab-height)});
    }
  }
</style>

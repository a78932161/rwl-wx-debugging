<template>
  <div id="app">
    <keep-alive>
     <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "~common/css/base";
</style>

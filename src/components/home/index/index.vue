<template>
  <div class="home">
    <m-header></m-header>
  </div>
</template>


<script>
  import MHeader from 'components/home/m-header/m-header';
  export default {
      data(){
          return {

          }
      },
    components:{
          MHeader
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~common/css/mixin";
  @import "~common/css/variable";
</style>

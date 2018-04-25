<template>
  <div class="orders">

    <orders-list></orders-list>
    <o-switch @switchItem="switchItem"></o-switch>
  </div>
</template>


<script>
  import OrdersList from 'components/orders/orders-list/orders-list'
  import OSwitch from 'components/orders/switch/switch'
  export default {
     name:'orders',
    data(){
      return {

      }
    },
    components:{
      OrdersList,
      OSwitch
    },
    methods:{
      switchItem(index){
          if(index===0){
              this.$router.back();
          }
          console.log('switch:'+index);
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~common/css/mixin";
  @import "~common/css/variable";
  .orders{
    z-index:10;
    position: fixed;
    top: 0;
    bottom:px2rem(-$tab-height);
    left: 0;
    right: 0;
    height:100%!important;
  }
</style>

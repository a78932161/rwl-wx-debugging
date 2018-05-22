<template>
  <div id="app">
    <keep-alive exclude="orders">
      <router-view class="router-view"></router-view>
    </keep-alive>
    <tab></tab>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex';
  import Tab from 'components/tab/tab';
  import {getPostage} from 'api/orders';
  import {getUserInfo} from 'api/user';
  import {ERR_OK} from 'api/config';
  export default {
    name: 'App',
    components: {
      Tab
    },
    created(){
      this._getUserInfo();
      this._getPostage();
    },
    methods:{
      _getPostage(){
        getPostage().then((ops)=>{
          if(ops.code===ERR_OK){
            this.setExpress(ops.data);
          }
        })
      },
      _getUserInfo(){
          getUserInfo().then((ops)=>{
              if(ops.code===ERR_OK){
                this.setBinding(ops.data.binding);
                this.setPhone(ops.data.phone);
              }
          })
      },
      ...mapMutations({
          setExpress:'SET_EXPRESS',
          setBinding:'SET_BINDING',
          setPhone:'SET_PHONE'
      })
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

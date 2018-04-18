<template>
  <div id="app">
    <keep-alive>
      <router-view class="router-view"></router-view>
    </keep-alive>
    <tab></tab>
    <msg ref="msg" :content="msgContent"></msg>
  </div>
</template>

<script>
  import {mapGetters,mapMutations} from 'vuex';
  import Msg from 'base/msg/msg'
  import Tab from 'components/tab/tab'
  export default {
    name: 'App',
    components: {
      Tab,
      Msg
    },
    computed: {
      CMsgEvent(){
          return this.msgEvent;
        },
      ...mapGetters([
        'msgContent',
        'msgEvent'
      ])
    },
    methods:{
      ...mapMutations({
        setMsgEvent:'SET_MSG_EVENT'
      })
    },
    watch:{
      CMsgEvent(newValue){
          switch (newValue){
            case 'setShow':
                this.$refs.msg.setShow();
                this.setMsgEvent('');
                break;
            case 'show':
              this.$refs.msg.show();
              break;
            case 'hide':
              this.$refs.msg.hide();
              break;

          }
      }
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

<template>
  <div class="more-info">
    <scroll :data="text">
      <div class="text-container" v-html="text">

      </div>
    </scroll>
  </div>
</template>

<script>
  import Scroll from 'base/scroll/scroll';
  import {getText} from 'api/info';
  import {ERR_OK} from 'api/config';
  export default {
      data(){
        return {
            text:''
        }
      },
      components:{
          Scroll
      },
    created(){
      this._getText();
    },
    methods:{
        _getText(){
          let type=this.$route.query.type;
          getText(type).then((ops)=>{
            if(ops.code===ERR_OK){
            this.text=ops.data.content;
          }
        });
        }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~common/css/mixin";
  @import "~common/css/variable";

  .more-info{
    z-index: 10;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: $color-background-d;
    .text-container{
      display: flex;
      flex-direction: column;
      // align-items:center;
      width:px2rem(700);
      margin: 0 auto;
      padding: px2rem(32) 0;
      text-align:justify;
    }
  }
</style>

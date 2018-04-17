<template>
  <div class="msg zh-center"
       v-show="showFlag"
       v-text="content"></div>
</template>

<script>
  import {debounce} from 'common/js/util';
  export default {
    data(){
      return {
        showFlag: false,
        timer: null
      }
    },
    props: {
      content: {
        type: String,
        default: ''
      }
    },
    methods: {
      setShow(flag){
        let time = flag || 1500;
        this.showFlag = true;
        if(this.timer){
            clearTimeout(this.timer);
        }
        this.timer=setTimeout(()=>{
            this.showFlag=false;
        },time)

      },
      show(){
        this.showFlag = true;
      },
      hide(){
        this.showFlag = false;
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~common/css/mixin";
  @import "~common/css/variable";

  .msg {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    background: $color-background-cover;
    padding: 0 px2rem(30);
    @include px2rem(height, 50);
    @include px2rem(border-radius, 9);
    color: #fff;
    @include font(2);

  }
</style>

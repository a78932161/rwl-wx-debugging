<template>
  <div class="more">

    <div class="item" v-for="item in list"  @click="toMoreInfo(item.type)">
      <span class="text" v-text="item.name"></span>
      <i class="icon iconfont icon-iconfonticonfonti2copycopy"></i>
    </div>


    <router-link tag="div" to="/my/more/suggest" class="item">
      <span class="text">意见反馈</span>
      <i class="icon iconfont icon-iconfonticonfonti2copycopy"></i>
    </router-link>


    <router-view></router-view>

  </div>
</template>

<script>
  import {platformText} from 'api/config';
  export default {
      data(){
        return {
            list:[
              {name:'关于小让',type:platformText.about},
              {name:'加入小让',type:platformText.accede},
              {name:'加盟小让',type:platformText.joinIn},
              {name:'用户协议',type:platformText.userProtocol}
            ]
        }
      },
      methods:{
        toMoreInfo(type){
            this.$router.push({path:'/my/more/info',query:{type}});
        }
      }
  }
</script>


<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~common/css/mixin";
  @import "~common/css/variable";
  .more {
    z-index: 10;
    position: fixed;
    top: 0;
    bottom: 0;
    left:0;
    right: 0;
    background:$color-background-d;
    .item{
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: px2rem(119);
      border-bottom:px2rem(8) solid $color-line;
      .text{
        @include font(2);
        margin-left: px2rem(45);
      }
      .icon{
        @include font(3);
        margin-right:px2rem(40);
        color: $color-text-l;
      }
    }
  }
</style>

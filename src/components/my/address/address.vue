<template>
  <div class="address">
    <span class="no-result">没有可用地址，点击下方按钮添加</span>
    <b-button content="＋新增地址" @buttonClick="addAddress"></b-button>
    <router-view></router-view>
  </div>
</template>

<script>
  import BButton from 'base/b-button/b-button';
  export default {
      components:{
          BButton
      },
    methods:{
      addAddress(){
         this.$router.push('/my/address/add')
      }
    }
  }
</script>


<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~common/css/mixin";
  @import "~common/css/variable";
  .address{
    z-index:10;
    position: fixed;
    top:0;
    bottom: 0;
    left:0;
    right: 0;
    background: $color-background;
    .no-result{
      display: inline-block;
      width: 10rem;
      @include font(5);
      color: #FF6A03;
      text-align: center;
      margin-top: px2rem(40);
    }
  }
  </style>

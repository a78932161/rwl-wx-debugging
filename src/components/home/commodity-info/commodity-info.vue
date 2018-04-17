<template>
  <transition name="cover">
  <div v-show="showFlag" class="commodity-info" @click="hide">
    <div class="info-container" @click.stop>
      <span class="title">产品参数</span>
      <ul class="info-list">
        <li class="info-item">
          <span class="key">体积(ml)：</span>
          <span class="val">150</span>
        </li>
        <li class="info-item">
          <span class="key">品牌：</span>
          <span class="val">FENIKEY/芬尼奇</span>
        </li>
        <li class="info-item">
          <span class="key">物理形态：</span>
          <span class="val">液体</span>
        </li>
        <li class="info-item">
          <span class="key">适用空间：家用</span>
          <span class="val">家用</span>
        </li>
        <li class="info-item">
          <span class="key">产品PH值：</span>
          <span class="val">PH>7</span>
        </li>

      </ul>
    </div>
    <B-button content="完成"
              bgColor="#FF8854"
              @buttonClick="hide"
    ></B-button>
  </div>
  </transition>
</template>

<script>
  import BButton from 'base/b-button/b-button';
  export default {
      data(){
        return {
            showFlag:false
        }
      },
      components:{
          BButton
      },
    methods:{
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

  .commodity-info{
    z-index: 10;
    position: fixed;
    top: 0;
    @include px2rem(bottom, $button-height);
    left: 0;
    right: 0;
    background: $color-background-cover;
    &.cover-enter-active,&.cover-leave-active{
      transition: all .3s;
      .info-container{
        transition: all .3s;
      }
    }
    &.cover-enter,&.cover-leave-to{
      .info-container{
        opacity: 0;
        transform: translate(0,100%);
      }
    }
    .info-container{
      position: absolute;
      bottom: 0;
      background: $color-background-d;
      .title{
        display: block;
        width: 10rem;
        text-align: center;
        @include font(5);
        padding: px2rem(58) 0 px2rem(32) 0;
      }
      .info-list{
        width: 10rem;
        display: flex;
        flex-direction:column;
        .info-item{
          display: flex;
          align-items: center;
          border-bottom:px2rem(3) solid #d5d5d5;
          @include font(2);
          @include px2rem(height,89);
         .key{
           @include px2rem(margin-left,24);
         }
          &:nth-last-child(1){
            border-bottom: 0;
          }
        }
      }
    }
  }
</style>

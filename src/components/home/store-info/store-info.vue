<template>
  <div class="store-info">
    <scroll>
      <div class="flex-wrapper">
    <div class="wrapper">
      <div class="wrapper-head">
        <p class="text-info">
          <i class="iconfont icon-xuanzhong"></i>
          <span>认证说明</span>
        </p>
        <span class="text">店铺已通过实名认证</span>
      </div>
      <ul class="wrapper-content">
        <li class="content-item">
          <i class="iconfont icon-liebiao"></i>
          <div class="text-box">
            <span class="key">店铺名称</span>
            <span class="val">小让商城</span>
          </div>
        </li>
        <li class="content-item">
          <div class="text-box">
            <span class="key">创建时间</span>
            <span class="val">2015-10-15</span>
          </div>
        </li>
        <li class="content-item">
          <div class="text-box">
            <span class="key">认证类型</span>
            <span class="val">企业</span>
          </div>
        </li>
        <li class="content-item">
          <div class="text-box">
            <span class="key">企业名称</span>
            <span class="val">温州市莫好可洗涤服务有限公司</span>
          </div>
        </li>
        <li class="content-item">
          <div class="text-box">
            <span class="key">相关证件</span>
           <img src="" />
          </div>
        </li>
      </ul>

    </div>
      </div>
    </scroll>
  </div>
</template>


<script>
  import Scroll from 'base/scroll/scroll'
  export default {
      components:{
          Scroll
      }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~common/css/mixin";
  @import "~common/css/variable";

  .store-info {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: $color-background-d;

      .flex-wrapper{
        display: flex;
        justify-content: flex-end;
        .wrapper {
          @include px2rem(width, 729);
          .wrapper-head {
            @include px2rem(padding-bottom, 31);
            border-bottom: px2rem(4) solid #D5D5D5;
            .text-info {
              padding: px2rem(41) 0 px2rem(14) 0;
              i {
                color: #E36154;
                @include px2rem(margin-right, 21);
                @include font(3);
              }
              span {
                @include font(2);
              }
            }
            .text {
              @include px2rem(margin-left, 56);
              color: $color-text-d;
            }
          }
          .wrapper-content {
            .content-item{
              position: relative;
              @include px2rem(margin-top,42);
              @include font(2);
              i{
                position: absolute;
                top:0;
                left:0;
                @include font(3);
                color: $color-theme;
              }
              .text-box{
                display: flex;
                flex-direction: column;
                @include px2rem(margin-left,52);
                img{
                  @include px2rem(width,470);
                  @include px2rem(height,562);
                  @include px2rem(margin-top,36);
                }
                .key{
                  @include font(2);
                }
                .val{
                  @include px2rem(margin-top,18);
                  color: $color-text-d;
                }
              }
              &:nth-last-child(1){
                @include px2rem(margin-bottom,50);
              }
            }
          }
        }
      }

  }
</style>

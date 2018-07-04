<template>
  <div class="tab">
    <router-link tag="div" to="/my/phone" class="item">
      <div class="left-box">
        <i class="icon iconfont icon-shouji01"></i>
        <span class="text">更改注册手机号</span>
      </div>
      <div class="right-box">
        <i class="icon iconfont  icon-iconfonticonfonti2copycopy"></i>
      </div>
    </router-link>


    <router-link tag="div" to="/my/bindcard" class="item">
      <div class="left-box">
        <i class="icon iconfont icon-shouji01"></i>
        <span class="text">绑定会员卡</span>
      </div>
      <div class="right-box">
        <i class="icon iconfont  icon-iconfonticonfonti2copycopy"></i>
      </div>
    </router-link>



    <router-link tag="div" to="/my/address" class="item">
      <div class="left-box">
        <i class="icon iconfont icon-dizhi"></i>
        <span class="text">地址管理</span>
      </div>
      <div class="right-box">
        <i class="icon iconfont  icon-iconfonticonfonti2copycopy"></i>
      </div>
    </router-link>

    <div class="item" @click="toRechargePay">
      <div class="left-box">
        <i class="icon iconfont icon-icon-test1"></i>
        <span class="text">余额</span>
      </div>
      <div class="right-box">
        <span class="button">充余额</span>
        <i class="icon iconfont  icon-iconfonticonfonti2copycopy"></i>
      </div>
    </div>

    <router-link tag="div" to="/my/more" class="item">
      <div class="left-box">
        <i class="icon iconfont icon-gengduo2"></i>
        <span class="text">更多</span>
      </div>
      <div class="right-box">
        <i class="icon iconfont  icon-iconfonticonfonti2copycopy"></i>
      </div>
    </router-link>
  </div>
</template>


<script>
  import {getUserInfo} from 'api/user';
  import {ERR_OK} from 'api/config';
  export default {
    methods: {
      toRechargePay(){
        this.$loading.show();
        getUserInfo().then((ops) => {
          if (ops.code === ERR_OK) {
            this.balance = ops.data.balance;
            this.$loading.hide();
            this.$router.push(`/recharge/${this.balance}`)
          }
        }).catch(() => {
          this.$loading.hide();
        });
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~common/css/mixin";
  @import "~common/css/variable";

  .tab {
    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: px2rem(63);
      &:nth-child(1) {
        margin-top: 0;
      }
      &:nth-child(4) {
        .left-box i, span, .right-box i, span {
          color: $color-theme !important;

        }
      }
      .left-box {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: px2rem(35);
        .icon {
          @include font(10);
          margin-right: px2rem(30);
          color: $color-text-l;
        }
        .text {
          @include font(3);
        }
      }
      .right-box {
        display: flex;
        align-items: center;
        margin-right: px2rem(35);
        .button {
          display: flex;
          justify-content: center;
          align-items: center;
          width: px2rem(134);
          height: px2rem(53);
          border: px2rem(2) solid $color-theme;
          border-radius: px2rem(25);
          margin-right: px2rem(20);
        }
        .icon {
          @include font(3);
          color: $color-text-l;
        }
      }

    }

  }


</style>

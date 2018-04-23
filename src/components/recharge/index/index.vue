<template>
  <div class="recharge" @touchmove.prevent>
    <div class="balance-container">
      <span class="text">当前余额（元）</span>
      <span class="val">0.00</span>
      <router-link class="button" to="/recharge/pay">我要充值</router-link>
    </div>
    <span class="title">交易记录</span>
    <div class="scroll-container">
      <scroll>
        <ul class="consume-list">
          <li class="consume-item">
            <div class="info-box">
              <span class="name">微信余额充值</span>
              <span class="time">3月11日 22:00</span>
            </div>
            <span class="num">+200</span>
          </li>
        </ul>
      </scroll>
    </div>
    <router-view></router-view>
  </div>
</template>


<script>
  import Scroll from 'base/scroll/scroll';
  import {payCreate, rechargeCreate, findRecharge} from 'api/pay';
  export default {
    data(){
      return {}
    },
    components: {
      Scroll
    },
    activated(){
      findRecharge().then((ops) => {
        console.log(ops)
      })
    },
    methods: {
      a(){
        rechargeCreate('rwlRecharge1').then((ops) => {

          payCreate(ops.data.id).then((ops1) => {
            console.log(ops1);
            WeixinJSBridge.invoke(
              'getBrandWCPayRequest', {
                "appId": ops1.appId,     //公众号名称，由商户传入
                "timeStamp": ops1.timeStamp,         //时间戳，自1970年以来的秒数
                "nonceStr": ops1.nonceStr, //随机串
                "package": ops1.package,
                "signType": ops1.signType,         //微信签名方式：
                "paySign": ops1.paySign //微信签名
              },
              function (res) {
                if (res.err_msg == "get_brand_wcpay_request:ok") {
                }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
              }
            );
          })


        })
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~common/css/mixin";
  @import "~common/css/variable";

  .recharge {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 0;
    @include px2rem(bottom, $tab-height);
    left: 0;
    right: 0;
    background: $color-background-d;
    .balance-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: $color-theme;
      .text {
        @include font(3);
        margin: px2rem(43) 0 px2rem(56) 0;
      }
      .val {
        @include font(57);
      }
      .button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: px2rem(697);
        height: px2rem(75);
        background: $color-theme;
        color: #fff;
        @include font(5);
        margin: px2rem(62) 0 px2rem(31) 0;
        border-radius: px2rem(7);
      }
    }
    .title {
      display: inline-block;
      width: px2rem(711);
      color: #D5D5D5;
      @include font(2);
      text-indent: px2rem(30);
      padding-bottom: px2rem(7);
      border-bottom: px2rem(4) solid #D5D5D5;
      margin-left: px2rem(19.5);
    }
    .scroll-container {
      position: fixed;
      top: px2rem(486);
      bottom: px2rem($tab-height);
      display: flex;
      justify-content: center;
    }
    .consume-list {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: px2rem(667);
      .consume-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: px2rem(140);
        box-sizing: border-box;
        border-bottom: px2rem(4) solid #D5D5D5;
        &:nth-last-child(1) {
          border-bottom: 0;
        }
        .info-box {
          display: flex;
          flex-direction: column;
          margin-left: px2rem(28);
          .name {
            @include font(3);
            margin-bottom: px2rem(29);
          }
          .time {
            @include font(-1);
            color: $color-text-l;
          }
        }
        .num {
          margin-right: px2rem(28);
          @include font(11);
          color: $color-theme;
        }
      }
    }
  }
</style>

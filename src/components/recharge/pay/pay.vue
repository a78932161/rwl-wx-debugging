<template>
  <div class="pay">
    <loading :screen="true" v-if="!rechargeList.length>0"></loading>
    <div v-else>
      <scroll v-if="isPayShow">
        <div class="scroll-container">
          <ul class="recharge-list">
            <li class="recharge-item"
                @click="selectRecharge(index)"
                v-for="(item,index) in rechargeList">
              <div class="wrapper">
                <span class="name" v-text="payMoney(item.payMoney)"></span>
                <span class="give" v-text="rewardMoney(item.rewardMoney)"></span>
              </div>
              <i :class="['icon','iconfont',iconClass(index)]"
                 :style="iconStyle(index)"></i>
            </li>
          </ul>
          <div class="info-container">
            <div class="chose-pay">
              <span class="text">当前选择</span>
              <span class="name" v-text="selectText"></span>
            </div>
            <span class="line"></span>
            <div class="balance">
              <span class="text">充值后余额</span>
              <p class="name"><span class="num">{{rechargeAfterText | fixed}}</span>元</p>
            </div>
          </div>
          <span class="button" @click="onPayClick">确定充值</span>
        </div>
      </scroll>
      <pay-success v-else
                   :text="success.text"
                   :val="success.val"
                   :nextButton="success.nextButton"
                   :backButton="success.backButton"
                   @afterNext="nextPay"
                   @afterBack="toHome"
      ></pay-success>
    </div>

  </div>
</template>

<script>
  import PaySuccess from 'base/pay-success/pay-success'
  import Scroll from 'base/scroll/scroll';
  import {getUserInfo} from 'api/user';
  import {payCreate,rechargeCreate,findRecharge} from 'api/pay';
  import {ERR_OK} from 'api/config';
  import {wxPay} from 'common/js/util';
  export default {
    data(){
      return {
        isPayShow: true,
        success: {
          text: '充值成功',
          val: '',
          nextButton: '继续充值',
          backButton: '返回首页'
        },
        rechargeList: [],
        index: 0
      }
    },
    components: {
      PaySuccess,
      Scroll
    },
    created(){
      this._findRecharge();
    },
    computed: {
      selectText(){  //选中的充值档位
        let currentItem = this.rechargeList[this.index];
        return this.payMoney(currentItem.payMoney) + this.rewardMoney(currentItem.rewardMoney);
      },
      rechargeAfterText(){  //充值后余额计算
        let currentItem = this.rechargeList[this.index];
        let balance = Number(this.$route.params.balance);
        return this.num(balance) + this.num(currentItem.payMoney) + this.num(currentItem.rewardMoney);
      }
    },
    filters: {
      fixed(flag){
        return flag.toFixed(2);
      }
    },
    methods: {
      toHome(){
        this.$router.replace('/home')
      },
      nextPay(){
          this.$loading.show();
        getUserInfo().then((ops) => {
          if (ops.code === ERR_OK) {
            this.$loading.hide();
            this.isPayShow=true;
            this.$router.replace(`/recharge/${ops.data.balance}`);
          }
        })
      },
/*      wxPay(data){  //调用微信付款
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest', {
            "appId": data.appId,
            "timeStamp": data.timeStamp,
            "nonceStr": data.nonceStr,
            "package": data.package,
            "signType": data.signType,
            "paySign": data.paySign
          },
          (res) => {// 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
            if (res.err_msg == "get_brand_wcpay_request:ok") {
              this.success.val = `￥${this.num(this.rechargeList[this.index].payMoney)}`;
              this.isPayShow = false;
            }
          }
        );
      },*/
      onPayClick(){
        this.$loading.show('正在加载');
        let item = this.rechargeList[this.index];
        rechargeCreate(item.key).then((ops) => {   //创建充值订单
          if(ops.code===ERR_OK){
            payCreate(ops.data.id).then((data) => {   //创建支付订单
              this.$loading.hide();
              wxPay(data,()=>{
                this.success.val = `￥${this.num(this.rechargeList[this.index].payMoney)}`;
                this.isPayShow = false;
              });
            })
          }
        }).catch(()=>{
          this.$loading.hide();
          this.$msg.setShow('支付失败');
        })
      },
      _findRecharge(){
        findRecharge().then((ops) => {
          if (ops.code === ERR_OK) {
            ops.data.sort((a, b) => {
              return a.payMoney - b.payMoney
            });
            this.rechargeList = ops.data;
            console.log(ops.data)
          }
        })
      },
      num(number){
        return number / 100;
      },
      payMoney(number){
        return `充${this.num(number)}元`
      },
      rewardMoney(number){
        return `送${this.num(number)}`
      },
      iconStyle(index){
        return `color:${this.index !== index ? '#C8C5C5' : ''}`
      },
      iconClass(index){
        return this.index !== index ? 'icon-weixuanzhong' : 'icon-danxuanxuanzhong';
      },
      selectRecharge(index){
        this.index = index;
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~common/css/mixin";
  @import "~common/css/variable";

  .pay {
    z-index: 10;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: $color-background-d;
    .scroll-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      .recharge-list {
        .recharge-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: px2rem(656);
          height: px2rem(120);
          border-bottom: px2rem(3) solid $color-line-d;
          .wrapper {
            display: flex;
            .name {
              width: px2rem(260);
              font-weight: 600;
              @include font(12);
              text-indent: px2rem(6);
            }
            .give {
              display: flex;
              justify-content: center;
              align-items: center;
              padding: 0 px2rem(27);
              height: px2rem(52);
              border-radius: px2rem(10);
              background: $color-theme;
              color: #fff;
              @include font(5);

            }
          }
          .icon {
            @include font(11);
            color: $color-theme;
          }
        }
      }
      .info-container {
        display: flex;
        align-items: center;
        @include font(5);
        margin: px2rem(60) 0 px2rem(139) 0;
        .chose-pay {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: px2rem(300);
          .text {
            margin-bottom: px2rem(18);
          }
        }
        .line {
          width: px2rem(8);
          height: px2rem(115);
          background: #CDD2D5;
          margin: 0 px2rem(15) 0 px2rem(20);
        }
        .balance {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: px2rem(300);
          .text {
            margin-bottom: px2rem(18);
          }
          .name {
            .num {
              @include font(7);
              color: #CA1400;
            }
          }
        }

      }
      .button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: px2rem(700);
        height: px2rem(89);
        background: $color-theme;
        color: #fff;
        @include font(5);
        border-radius: px2rem(6);
        margin-bottom: px2rem(50);
      }
    }

  }
</style>

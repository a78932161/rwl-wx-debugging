<template>
  <div class="pay-chose">
    <scroll v-if="isPayShow">
      <div>
        <div class="price-container">
          <div class="text-box h-center">
            <span class="text">本次消费金额</span>
            <span class="price" v-text="totalPrice"></span>
          </div>
        </div>
        <div class="chose-container">
          <div class="pay-mode" data-mode="1" @click="chosePayMode">
            <i class="wx-icon iconfont icon-weixin"></i>
            <div class="text-box">
              <span class="text">微信支付</span>
              <span class="tip">推荐安装微信5.0及以上版本用户使用</span>
            </div>
            <i :style="iconStyle(1)" :class="['icon','z-center','iconfont',iconClass(1)]"></i>
          </div>
          <div class="pay-mode" data-mode="2" @click="chosePayMode">
            <i class="balance-icon iconfont icon-balance"></i>
            <div class="text-box">
              <span class="text">余额支付</span>
              <span class="tip">使用账户余额支付</span>
            </div>
            <i :style="iconStyle(2)" :class="['icon','z-center','iconfont',iconClass(2)]"></i>
          </div>
          <div class="pay-mode"
               data-mode="3"
               @click="chosePayMode"
               v-if="bindCard">
            <i class="card-icon iconfont icon-cardb-copy"></i>
            <div class="text-box">
              <span class="text">会员卡支付</span>
              <span class="tip">使用会员卡余额支付</span>
            </div>
            <i :style="iconStyle(3)" :class="['icon','z-center','iconfont',iconClass(3)]"></i>
          </div>


        </div>
        <div class="button" @click="onPayClick">确认支付</div>
      </div>
    </scroll>
    <pay-success v-else
                 :text="success.text"
                 :val="totalPrice"
                 :nextButton="success.nextButton"
                 @afterNext="toHome"
    ></pay-success>
  </div>
</template>

<script>
  import {mapGetters,mapMutations} from 'vuex';
  import Scroll from 'base/scroll/scroll'
  import PaySuccess from 'base/pay-success/pay-success'
  import {payMoney} from 'api/pay';
  import {ERR_OK} from 'api/config';
  import {wxPay} from 'common/js/util';

  export default {
    data(){
      return {
        isPayShow: true,
        mode: 1,
        success: {
          text: '支付成功',
          nextButton: '返回首页'
        }
      }
    },
    components: {
      PaySuccess,
      Scroll
    },
    computed: {
      totalPrice(){
        return `¥ ${this.$route.query.totalPrice}`
      },
      ...mapGetters([
        'bindCard'
      ])
    },
    created(){

      if (!this.$route.params.id) {  //id不存在，退出页面
        this.$router.back();
      }
    },
    methods: {
      toHome(){
        this.$router.push('/home')
      },
      _payMoney(mode, id, callback){
        this.$loading.show('正在加载');
        payMoney(mode, id).then((ops) => {
          ops.code === ERR_OK ? callback && callback(ops) : this.$alert('支付失败');
          this.$loading.hide();
        }).catch(() => {
          this.$alert('支付失败');
          this.$loading.hide();
        })
      },
      PaySuccess(){
        this.isPayShow = false;
        let query = this.$route.query;
        switch (query.type) {
          case 'laundry':
            if (query.top) {
              this.setTopLaundryList([]);
              return;
            }
            this.setLaundryList([]);
            break;
          case 'furnishing':
            this.setFurnishList([]);
            break;
          case 'mall':
            this.setMallList([]);
            break;
        }
        this.setShopList([]);
      },
      onPayClick(){
        let mode = (this.mode === 1) ? 'wechatpay' :
          (this.mode === 2) ? 'balancepay':'cardpay';
        if (mode !== 'wechatpay') {
          let text= (mode==='balancepay')?'余额':'会员卡';
          this.$alert(`您确定使用${text}进行支付吗?`, ['确定', '取消']).then(() => {
            this._payMoney(mode, this.$route.params.id, () => {
              this.PaySuccess();
            });
          })
        }
        else {
          this._payMoney(mode, this.$route.params.id, (ops) => {

            wxPay(ops, () => {
              this.PaySuccess();
            });
          });
        }
      },
      chosePayMode(el){
        let mode = el.currentTarget.dataset.mode;
        this.mode = Number(mode);
      },
      iconStyle(flag){
        return `color:${this.mode === flag ? '#09BB07' : '#c7c7c7'}`;
      },
      iconClass(flag){
        return this.mode === flag ? 'icon-selected' : 'icon-unselected';
      },
      ...mapMutations({
        setShopList: 'SET_SHOP_LIST',
        setLaundryList: 'SET_LAUNDRY_LIST',
        setTopLaundryList: 'SET_TOP_LAUNDRY_LIST',
        setFurnishList: 'SET_FURNISH_LIST',
        setMallList: 'SET_MALL_LIST'
      })
    }

  }
</script>


<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~common/css/mixin";
  @import "~common/css/variable";

  .pay-chose {
    z-index: 100;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: $color-background-d;
    .price-container {
      position: relative;
      width: 10rem;
      height: px2rem(434);
      @include bg-image('./pay-chose');
      background-size: 10rem px2rem(434);
      color: #fff;
      .text-box {
        position: absolute;
        top: px2rem(214);
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 10rem;
        .text {
          @include font(2);
          margin-bottom: px2rem(20);
        }
        .price {
          @include font(27);
        }
      }
    }
    .chose-container {
      width: px2rem(722);
      height: px2rem(243);
      margin: px2rem(45) 0 0 px2rem(28);
      .pay-mode {
        position: relative;
        display: flex;
        align-items: center;
        height: px2rem(116);
        border-top: px2rem(4) solid $color-line-d;

        &:nth-last-child(1) {
          border-bottom: px2rem(4) solid $color-line-d;
        }
        .icon-font {
          @include font(7);
        }
        .wx-icon {
          @extend .icon-font;
          color: #11B578;
        }
        .balance-icon {
          @extend .icon-font;
          color: $color-theme;
        }
        .card-icon{
          @extend .icon-font;
          color: #F56C6C;
        }
        .text-box {
          display: flex;
          flex-direction: column;
          margin-left: px2rem(29);
          .text {
            @include font(2);
            margin-bottom: px2rem(12);
          }
          .tip {
            color: #8D8D8D;
          }
        }
        .icon {
          @include font(8);
          position: absolute;
          right: px2rem(40);
        }

      }

    }
    .button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: px2rem(700);
      height: px2rem(90);
      background: $color-theme;
      color: #fff;
      margin: px2rem(316) px2rem(25) 0 px2rem(25);
      border-radius: px2rem(10);
    }
  }
</style>

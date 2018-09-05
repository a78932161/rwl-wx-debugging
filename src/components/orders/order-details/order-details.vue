<template>
  <div class="order-details">
    <scroll>
      <div>

        <div class="laundry-progress" :style="bgPosition" v-if="isLaundryProgress">
          <div :class="['clothes-location',clothesText]"  @click="toClothesDetails"></div>
        </div>
        <mall-progress class="mall-progress"
                       :progress="mallProgress"
                       v-else></mall-progress>
        <span class="count-down" v-text="countDownText" v-show="countDownText"></span>
        <div class="details">
          <div class="title-box">
            <span class="block"></span>
            <span class="title">订单详情</span>
          </div>
          <div class="details-box">
            <p class="item"><span class="text">订单价格</span><span class="val price">¥ {{totalPrice}}</span></p>
            <p class="item"><span class="text">付款方式</span><span class="val" v-text="payMode"></span></p>
            <p class="item"><span class="text">付款状态</span><span class="val status" v-text="payStatus"></span></p>
            <p class="item"><span class="text">下单时间</span><span class="val" v-text="timeFormat(obj.createtime)"></span></p>
            <p class="item"><span class="text">订单编号</span><span class="val" v-text="obj.number"></span></p>
            <p class="item"><span class="text">联系人</span><span class="val" v-text="obj.name"></span></p>
            <p class="item"><span class="text">联系方式</span><span class="val" v-text="obj.phone"></span></p>
            <p class="item"><span class="text">收货地址</span><span class="val" v-text="obj.address"></span></p>
            <p class="item express" v-if="obj.waybillImage">
              <span class="text">顺丰单号</span>
              <img :src="imgUrl(obj.waybillImage)"/>
            </p>
          </div>
        </div>
      </div>
    </scroll>
    <b-button :content="buttonContent" @buttonClick="buttonClick"></b-button>
    <router-view></router-view>
  </div>
</template>


<script>
  import {mapGetters, mapMutations} from 'vuex';
  import MallProgress from 'components/orders/mall-progress/mall-progress';
  import Scroll from 'base/scroll/scroll';
  import BButton from 'base/b-button/b-button';
  import {finishOrderMixin} from 'common/js/mixin';
  import {getCurrentTime} from 'api/user';
  import {ERR_OK, baseURL,idType} from 'api/config'
  export default {
    data(){
      return {
        countDownText: '',
        obj: {},
        totalPrice: '',
        isLaundryProgress: false
      }
    },
    components: {
      MallProgress,
      BButton,
      Scroll
    },
    mixins: [finishOrderMixin],
    created(){
      this.isLaundryProgress = (this.$route.query.type === 'laundryProduct') ? true : false;
      this.obj = this.orderSelectItem;
      this.isOldOrder=this.judgeType(this.obj.id)==='oldProduct';
      this.totalPrice = this.$route.query.totalPrice;
      if (this.obj.payStatus === 0 && this.obj.status !== 6) { //订单未被取消且未被付款
        this.getCountDown(); //倒计时时间获取
      }
    },
    destroyed(){
      this.timer && clearInterval(this.timer);
    },
    computed: {
      buttonContent(){
        let status = this.obj.status;
        let type=this.judgeType(this.obj.id);
        if (this.obj.payStatus === 0 && status !== 6) { //订单未被取消且未被付款
          return '去付款';
        }
        if(type==='laundryProduct'&&status===4){  //判断为洗衣订单且状态为4时
          return '返回'
        }
        switch (status) {
          case 4:
          case 7:
            return '完结订单';
            break;
          case 5:
            return '已完结';
            break;
          default:
            return '返回';
            break;
        }
      },
      mallProgress(){
        if(this.isOldOrder)return 2; //老订单全部默认完结
        switch (this.obj.status) {
          case 0:
          case 6:
            return 0;
          case 1:
          case 2:
          case 3:
          case 4:
            return 1;
          case 5:
            return 2;

        }
      },
      clothesText(){
         return this.obj.status===5?'complete':'problem';
      },
      bgPosition(){  //(0, 新订单)(1,已派订单)(2,已收订单)(3,入站订单)(4,上挂订单)(7,送还订单)(5,完结订单)(6,取消订单);
        switch (this.obj.status) {
          case 0:
          case 6:
            return `background-position:0 0`;
            break;
          case 1:
          case 2:
            return `background-position:-10rem 0`;
            break;
          case 3:
            return `background-position:-20rem 0`;
            break;
          case 4:
            return `background-position:-30rem 0`;
            break;
          case 7:
            return `background-position:-40rem 0`;
            break;
          case 5:
            return `background-position:-50rem 0`;
            break;
        }
      },
      payMode(){
        if (this.obj.payStatus === 0) {
          return '无';
        }
        let payMode=this.obj.payMode;
        return (payMode === 1|| payMode==='BALANCE') ? '余额支付' :(payMode===0||payMode==='WXPAY') ?'微信支付':'卡支付';
      },
      payStatus(){  //老订单全部默认已支付
        return this.obj.payStatus === 1 ||this.isOldOrder? '已支付' : this.obj.payStatus === 2 ? '已退款' : '未支付';
      },
      ...mapGetters([
        'orderSelectItem'
      ])
    },
    methods: {
      timeFormat(time){
          return new Date(parseInt(time)).toLocaleString()
      },
      toClothesDetails(){
          let result=this.orderSelectItem.items.some((item)=>{
              if(item.problemImage!=null){
                this.$router.push('/orders/details/clothesdetails');
                return true;
              }
          })
        if(!result)this.$msg.setShow('暂无问题衣物');

      },
      judgeType(id){
        let type = id.slice(-3);
        switch (type) {
          case idType.laundry:
            return 'laundryProduct';
            break;
          case idType.mall:
            return 'mallProduct';
            break;
          case idType.furniture:
            return 'furnitureProduct';
            break;
          case idType.old:
              return 'oldProduct';
              break;
        }
      },
      getCountDown(){
        getCurrentTime().then((ops) => {
          if (ops.code === ERR_OK) {
            let oneHour = 3600 * 1000;
            let diff = ops.data - this.obj.createtime;
            let countDown = parseInt((oneHour - diff) / 1000); //倒计时的毫秒数
            this.countDownText = this.countDown(countDown);//定时器未加载时显示格式化时间
            this.timer = setInterval(() => {
              countDown--;
              if (countDown < 0) { //倒计时小于0，清除定时器
                this.countDownText = '订单已被关闭';
                clearInterval(this.timer);
                return;
              }
              this.countDownText = this.countDown(countDown)
            }, 1000);
          }
        })
      },
      countDown(num){
        let minute = num / 60 | 0;
        minute = minute < 10 ? '0' + minute : minute;
        let second = num - minute * 60;
        second = second < 10 ? '0' + second : second;
        return `${minute}分${second}秒后订单将被关闭`
      },
      buttonClick(){
        if (this.obj.payStatus === 0 && this.obj.status !== 6) {  //订单未被取消且未被付款
          this.$router.push({
            name: 'orders-payChose',
            query: {totalPrice: this.totalPrice},
            params: {id: this.orderSelectItem.id}
          });
          return;
        }
        let status = this.obj.status;
        let type=this.judgeType(this.obj.id);
        if (status === 4&&type!=='laundryProduct'||status===7) {  //处于可以完结订单的状态
          this.$alert('您确定完结该订单吗', ['确定', '取消']).then(() => {
            this._finishOrder(this.judgeTypeUrl(this.obj.id), this.obj.id).then(() => {
              this.setIsFinish(true);
              this.$router.back();
            });
          });
          return;
        }
        this.$router.back(); //其它情况，一律返回至上一个历史记录
      },
      imgUrl(url){
        return url != null ? `${baseURL}/${url}` : '';
      },
      ...mapMutations({
        setSelectItem: 'SET_SELECT_ITEM'
      })
    }
  }
</script>


<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~common/css/mixin";
  @import "~common/css/variable";

  .order-details {
    position: fixed;
    top: 0;
    bottom: px2rem($button-height);
    left: 0;
    right: 0;
    background: $color-background-d;
    .laundry-progress {
      position: relative;
      width: 10rem;
      height: px2rem(457);
      @include bg-image('./laundry-img');
      background-size: px2rem(4500) px2rem(457);
      .clothes-location{
        position: absolute;
        top: px2rem(326);
        left: px2rem(195);
        width: px2rem(361);
        height: px2rem(82);
        background-size: px2rem(361) px2rem(82);
        &.problem{
          @include bg-image('./problem-text');
        }
        &.complete{
          @include bg-image('./complete-text');
        }
      }
    }
    .mall-progress {
      margin-top: px2rem(40);
    }
    .count-down {
      display: flex;
      justify-content: center;
      width: 100%;
      @include font(3);
      margin-top: px2rem(90);
      color: $color-theme;
    }
    .details {
      margin-top: px2rem(120);
      .title-box {
        display: flex;
        align-items: center;
        margin-bottom: px2rem(45);
        .block {
          width: px2rem(19);
          height: px2rem(37);
          background: $color-theme;
          margin-right: px2rem(20);
        }
        .title {
          @include font(5);
        }
      }
      .details-box {
        margin-left: px2rem(42);
        padding-bottom: 80px;
        .item {
          display: flex;
          align-items: center;
          margin-bottom: px2rem(26);
          &.express {
            align-items: flex-start;
          }
          .text {
            width: px2rem(190);
            color: $color-text-ll;
            @include font(2);
            margin-right: px2rem(10);
          }
          .val {
            @include font(2);
            &.price {
              color: #FE3D38;
              @include font(7);
            }
            &.status {
              color: $color-theme;
            }
          }
          img {
            width: px2rem(400);
            height: px2rem(256);
            background: #DCDCDC;
          }
        }

      }
    }
  }

</style>

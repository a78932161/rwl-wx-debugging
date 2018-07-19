<template>
  <div class="pay">

    <div class="pay-wrapper">
      <div class="user-info" @click="toAddress">
        <p class="user">
          <i class="img"></i>
          <span class="name" v-text="address.consignee||''"></span>
          <span class="phone" v-text="address.phone||''"></span>
        </p>
        <p class="address">
          <i class="img"></i>
          <span class="text" v-text="address.address||''"></span>
        </p>
        <i class="icon-right iconfont icon-iconfonticonfonti2copycopy"></i>
      </div>

      <div class="picker-container" v-show="urlType!=='mall'">
        <popup-picker class="picker" confirm-text="确定" :title="date.title"
                      v-model="date.value" :data='date.list'></popup-picker>
        <i class="icon-right iconfont icon-iconfonticonfonti2copycopy"></i>
      </div>
      <div class="picker-container" v-show="urlType!=='mall'">
        <popup-picker class="picker line" confirm-text="确定" :title="time.title"
                      v-model="time.value" :data='time.list'></popup-picker>
        <i class="icon-right iconfont icon-iconfonticonfonti2copycopy"></i>
      </div>


      <div class="shop-list">
        <div class="shop-container">
          <span class="title" v-text="category"></span>
          <transition-group name="list" tag="ul" class="details-list">
            <li class="shop-item" v-for="item in shopList" :key="item.id">
              <span class="name" v-text="item.name"></span>
              <span class="price" v-text="'¥' +item.price"></span>
              <number @numberChange="numChange"
                      :id="item.id"
                      :number="item.number"
                      :alertShow="alert.state"
                      :alertText="alert.text"
                      :cancelBtnText="alert.cancelBtnText"></number>
            </li>
          </transition-group>
          <span v-show="postageTip" class="postageText" v-text="postageText"></span>
        </div>
      </div>
      <!--    <div class="official-info">
            <span class="text">小让官方物流</span>
            <i class="icon iconfont icon-selected"></i>
          </div>-->
      <div class="remarks">
        <span class="text">备注:</span>
        <input type="text"
               v-model="remark"
               class="content"
               placeholder="洗衣等要求(请勿填写手机)"/>
      </div>
      <div class="space"></div>


    </div>
    <div class="bottom-button">
      <div class="price-sum">
        <span class="price">¥ {{totalPrice}}</span>
      </div>
      <span class="text" @click="onCreatePayClick">去支付</span>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex';
  import {PopupPicker} from 'vux';
  import Number from 'base/number/number';
  import {setListMixin,expressTipMixin} from 'common/js/mixin';
  import {changeShopNumber} from 'common/js/util';
  import {getCurrentTime} from 'api/user';
  import {orderCreate} from 'api/pay';
  import {ERR_OK} from 'api/config';
  export  default {
    data(){
      return {
        remark: '',
        alert: {
          state: true,
          text: '您确定从购物车中移除该商品吗？',
          cancelBtnText: '取消'
        },
        date: {
          title: "选择日期",
          list: [],
          value: []
        },
        time: {
          title: "选择时间",
          list: [[
            {name: '9:00 至 11:00', value: '9:00 至 11:00'},
            {name: '11:00 至 13:00', value: '11:00 至 13:00'},
            {name: '13:00 至 15:00', value: '13:00 至 15:00'},
            {name: '15:00 至 17:30', value: '15:00 至 17:30'}
          ]],
          value: ['9:00 至 11:00']
        }
      }
    },
    components: {
      PopupPicker,
      Number
    },
    computed: {
      totalPrice(){
        let totalPrice = 0;
        this.shopList.forEach((item) => {
          totalPrice += item.number * item.price;
        });
        if(this.$route.params.name==='laundry'){
          let express=this.express;
          totalPrice=(totalPrice>=express.threshold/100)?totalPrice:totalPrice+express.freight/100;
        }
        return totalPrice;
      },
      address(){
        return this.currentAddress || {}
      },
      ...mapGetters([
        'shopList',
        'currentAddress',
        'express',
        'binding'
      ])
    },
    mixins: [setListMixin,expressTipMixin],
    created(){
      this.postageTip=(this.$route.params.name==='laundry')?true:false;
        console.log(this.$route.params.name)
      this._getCurrentTime();
    },
    methods: {
      onCreatePayClick(){

        if(this.binding){   //判断用法是否绑定手机
          if (this.currentAddress != null) {     //地址是否为空
            if (this.shopList.length !== 0) {   //购物车是否有商品存在
              this.$loading.show('正在创建订单');
              let data = this.submitData();
              orderCreate(this.urlType, data).then((ops) => {
                if (ops.code === ERR_OK) {
                let route = this.$route;
                let top = route.query.top || '';
                this.$loading.hide();
                this.$router.push({
                  name: 'payChose',
                  query: {totalPrice: this.totalPrice, type: route.params.name, top},
                  params: {id: ops.data.id}
                });
                return;
              }
              this.$loading.hide();
              this.$msg.setShow(ops.msg);
            }).catch(() => {
                this.$loading.hide();
              this.$msg.setShow('网络异常');
            })
            }
            else {
              this.$alert('您的购物车目前没有商品')
            }
          }
          else {
            this.$alert('请选择地址')
          }
        }
        else{
          this.$msg.setShow('需要先绑定手机');
          this.$router.push({path:'/my/phone',query:{pay:true}});
        }

      },
      submitData(){
        let items = [];
        this.shopList.map((item) => {
          items.push({[`${this.urlType}Product`]: {id: item.id}, count: item.number});
        });
        let date = this.date.value[0].replace(/(今天|明天|后天)|年|月|日/g, ',');
        date = date.split(',');
        date.shift();
        date.pop();
        let time = this.time.value[0];
        time = time.match(/[0-9]+(:|：)[0-9]+/)[0];
        let deliveryDate = `${date[0]}-${date[1]}-${date[2]} ${time}`;
        let address = this.currentAddress;

        console.log(address)

        let data = {
          name: address.consignee,
          phone: address.phone,
          province: address.province,
          city: address.city,
          area: address.area||address.city,
          address: address.address,
          deliveryDate,
          remark: this.remark,
          type: this.type||'',
          items
        };
        return data;
      },
      toAddress(){
        this.$router.push({path: '/my/address', query: {pay: true}});
      },
      numChange(number, id){
        let shopList = changeShopNumber(this.shopList, number, id);
        this.setShopList(shopList);
        this.setList(shopList, this.$route.params.name);
        if (shopList.length === 0) {  //购物车长度为0时，返回到上一页
          this.$router.back();
        }
      },
      _getCurrentTime(){
         this.$loading.show() ;
        getCurrentTime().then((ops) => {
          if (ops.code === ERR_OK) {
            this.$loading.hide();
            this.timeFormat(ops.data)
          }
        })
      },
      timeFormat(data){
        let time = new Date(data);
        let year = time.getFullYear();
        let month = time.getMonth() + 1;
        let date = time.getDate();
        month = month < 10 ? '0' + month : month;
        date = date < 10 ? '0' + date : date;
        let arr = [];
        let format = `今天${year}年${month}月${date}日`;
        arr.push({name: format, value: format});
        for (let i = 1; i < 3; i++) {
          let text = (i === 1) ? '明天' : '后天';
          let format = `${text}${year}年${month}月${date + i}日`;
          arr.push({name: format, value: format});
        }
        this.date.value = [arr[0].value];
        this.date.list = [arr];
      },
      ...mapMutations({
        setShopList: 'SET_SHOP_LIST'
      })
    }

  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~common/css/mixin";
  @import "~common/css/variable";

  .pay {
    z-index: 10;
    overflow-y: auto;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: $color-background;

    .pay-wrapper {
      overflow-y: auto;
      position: absolute;
      top: 0;
      bottom: px2rem($tab-height);
      left: 0;
      right: 0;
    }
    .user-info {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 10rem;
      @include px2rem(height, 175);
      @include bg-image('./address-bg');
      background-size: 10rem px2rem(175);
      margin: px2rem(29) 0 px2rem(14) 0;
      .user {
        display: flex;
        align-items: center;
        .img {
          display: inline-block;
          @include px2rem(width, 46);
          @include px2rem(height, 43);
          @include bg-image('./user');
          background-size: px2rem(46) px2rem(43);
          margin: 0 px2rem(26);
        }
        .name {
          @include font(2);
          @include px2rem(margin-right, 33);
        }
        .phone {
          @include font(2);
        }

      }
      .address {
        @include px2rem(margin-top, 24);
        .img {
          display: inline-block;
          @include px2rem(width, 40);
          @include px2rem(height, 37);
          @include bg-image('./address');
          background-size: px2rem(40) px2rem(37);
          margin: 0 px2rem(26);
        }
        .text {
          @include font(2);
          color: $color-text-d;
        }
      }
      .icon-right {
        position: absolute;
        top: 50%;
        @include px2rem(right, 23);
        transform: translate(0, -50%);
        color: $color-text-d;
        @include font(2);
      }
    }
    .picker-container {
      position: relative;
      display: flex;
      justify-content: flex-end;
      @include px2rem(height, 88);
      background: $color-background-d;
      .picker {
        display: flex;
        align-items: center;
        @include px2rem(width, 729);
        height: 100%;
        @include font(2);
        &.line {
          border-top: px2rem(3) solid $color-line-d;
        }
      }
      .icon-right {
        position: absolute;
        top: 50%;
        @include px2rem(right, 23);
        transform: translate(0, -50%);
        color: $color-text-d;
        @include font(2);
      }
    }
    .shop-list {
      display: flex;
      justify-content: flex-end;
      width: 10rem;
      background: $color-background-d;
      @include px2rem(margin-top, 18);
      .shop-container {
        display: flex;
        flex-direction: column;
        @include px2rem(width, 729);
        .title {
          display: flex;
          align-items: center;
          width: 100%;
          @include px2rem(height, 87);
          @include font(2);
          box-sizing: border-box;
          border-bottom: px2rem(4) solid $color-line-d;
          @include px2rem(text-indent, 5);

        }
        ul {
          .shop-item {
            display: flex;
            align-items: center;
            width: 100%;
            margin: px2rem(25) 0;
            &.list-enter-active, &.list-leave-active {
              transition: all .5s;
            }
            &.list-enter, &.list-leave-to {
              width: 0;
              opacity: 0;
            }
            .name {
              @include px2rem(width, 360);
              white-space: nowrap;
              @include font(2);
              color: $color-text-ll;
            }
            .price {
              @include px2rem(width, 170);
              color: #FB4F43;
              white-space: nowrap;
            }
          }
        }
        .postageText{
          display: flex;
          align-items: center;
          height:px2rem(46);
          @include font(-3);
          color: $color-theme;
        }
      }

    }
    .official-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 10rem;
      @include px2rem(height, 125);
      margin-top: px2rem(13);
      background: $color-background-d;
      .text {
        @include font(2);
        margin-left: px2rem(26);
      }
      .icon {
        @include font(8);
        margin-right: px2rem(26);
        color: #47D63C;
      }

    }
    .remarks {
      display: flex;
      align-items: center;
      width: 10rem;
      height: px2rem(92);
      background: $color-background-d;
      margin-top: px2rem(19);
      @include font(2);
      .text {
        margin: 0 px2rem(25);
      }
      .content {
        flex-grow: 1;
        @include font(2);
        color: $color-text-l;
        margin-bottom: px2rem(7);
      }
    }
    .space {
      width: 10rem;
      height: px2rem(80);
    }

    .bottom-button {
      position: fixed;
      bottom: 0;
      width: 10rem;
      display: flex;
      height: px2rem($tab-height);
      .price-sum {
        display: flex;
        align-items: center;
        width: px2rem(425);
        height: 100%;
        background: #313236;
        .price {
          @include font(10);
          color: $color-theme;
          margin-left: px2rem(26);
        }
      }
      .text {
        display: flex;
        flex-grow: 1;
        justify-content: center;
        align-items: center;
        @include font(5);
        color: #fff;
        background: $color-theme;
      }
    }

  }
</style>

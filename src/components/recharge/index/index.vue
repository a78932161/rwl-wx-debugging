<template>
  <div class="recharge" @touchmove.prevent>
    <loading :screen="true" v-show="!load.isBalance&&!load.isConsumeList"></loading>

    <div class="wrapper" v-show="load.isBalance&&load.isConsumeList">
      <div class="balance-container">
        <span class="text">当前余额（元）</span>
        <span class="val">{{balance | numFormat}}</span>
        <span class="button" @click="toPay">我要充值</span>
      </div>
      <span class="title">交易记录</span>
      <div class="scroll-container">
        <scroll v-if="consumeList.length>0" :data="consumeList">
          <ul class="consume-list">
            <li class="consume-item" v-for="item in consumeList">
              <div class="info-box">
                <span class="name" v-text="item.category"></span>
                <span class="time">{{timeFormat(item.time)}}</span>
              </div>
              <span class="num" v-text="money(item.money,item.category)"></span>
            </li>
          </ul>
        </scroll>
        <no-result v-else title="暂无交易记录"></no-result>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>


<script>
  import NoResult from 'base/no-result/no-result';
  import Scroll from 'base/scroll/scroll';
  import {getUserInfo,getUserConsumeList} from 'api/user';
  import {ERR_OK} from 'api/config';
  export default {
    data(){
      return {
        balance: 0,
        consumeList: [],
        load: {
          isBalance: false,
          isConsumeList: false
        }
      }
    },
    components: {
      Scroll,
      NoResult
    },
    activated(){
      this._getBalance();
      this._getUserConsumeList();
    },
    filters: {
      numFormat(flag){
        return (flag / 100).toFixed(2)
      }
    },
    methods: {
      timeFormat(flag){
        let time=new Date(Number(flag));
        let year=time.getFullYear();
        let month=time.getMonth()+1;
        let date=this.timeAddZero(time.getDate());
        let hour=this.timeAddZero(time.getHours());
        let minute=this.timeAddZero(time.getMinutes());
        return `${month}月${date}日 ${hour}:${minute}`
      },
       timeAddZero(flag){
           return flag<10?'0'+flag:flag;
       },
      _getUserConsumeList(){
        getUserConsumeList().then((ops) => {
          if (ops.code === ERR_OK) {
            this.consumeList = ops.data;
            this.load.isConsumeList = true;
          }
        }).catch(() => {
          this.load.isConsumeList = true;
        })
      },
      _getBalance(){
        getUserInfo().then((ops) => {
          if (ops.code === ERR_OK) {
            this.balance = ops.data.balance;
            this.load.isBalance = true;
          }
        }).catch(() => {
          this.load.isBalance = true;
        });
      },
      money(number, category){
        let symbol = category === '充值' ? '+' : '-';
        return symbol + number / 100;
      },
      toPay(){
        this.$router.push(`/recharge/${this.balance}`)
      }
    },
    watch:{
        '$route'(to,from){
          if(from.name==='rechargePay'){  //当从地址添加页回来时，刷新页面
            this._getBalance();
            this._getUserConsumeList();
          }
        }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~common/css/mixin";
  @import "~common/css/variable";

  .recharge {
    position: absolute;
    top: 0;
    @include px2rem(bottom, $tab-height);
    left: 0;
    right: 0;
    background: $color-background-d;
    .wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
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
    }
  }
</style>

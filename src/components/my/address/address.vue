<template>
  <div class="address" v-show="fetchLoad">
    <span class="no-result" v-show="!addressList.length>0">没有可用地址，点击下方按钮添加</span>
    <div class="scroll-container">
      <scroll>
        <ul class="result">
          <li class="result-item" v-for="item in addressList" :key="item.id">
            <div class="wrapper">
              <span class="default">默认</span>
              <div class="info-box">
                <span class="name" v-text="item.consignee"></span>
                <span class="phone" v-text="item.phone">13750000000</span>
              </div>
              <span class="address-text" v-text="item.address"></span>
              <div class="set-container">
                <div class="left-box">
                  <i class="icon iconfont icon-selected"></i>
                  <span class="text">设为默认地址</span>
                </div>
                <div class="right-box">
                  <div class="edit-box">
                    <i class="icon-edit iconfont icon-bianji1"></i>
                    <span class="edit-text">编辑</span>
                  </div>
                  <div @click="removeAddress(item.id)">
                    <i class="icon-remove iconfont icon-105"></i>
                    <span class="remove-text">删除</span>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </scroll>
    </div>
    <b-button content="＋新增地址" @buttonClick="addAddress"></b-button>
    <alert ref="alert" content="确认要删除收货地址吗？"></alert>
    <router-view></router-view>
  </div>
</template>

<script>
  import Alert from 'base/alert/alert';
  import Scroll from 'base/scroll/scroll';
  import BButton from 'base/b-button/b-button';
  import {findAddress, removeAddress} from 'api/address';
  import {ERR_OK} from 'api/config';
  export default {
    data(){
      return {
        fetchLoad: false,
        addressList: []
      }
    },
    components: {
      BButton,
      Scroll,
      Alert
    },
    created(){
      this._findAddress();
    },
    methods: {
      _findAddress(){
        findAddress().then((ops) => {
          if (ops.code === ERR_OK) {
            this.addressList = ops.data;
            console.log(ops.data)
          }
          this.fetchLoad = true;
        }).catch(() => {
          this.fetchLoad = true;
        })
      },
      removeAddress(id){
          this.$refs.alert.show();
      /*  removeAddress(id).then((ops) => {
          if (ops.code === ERR_OK) {
            this._findAddress();
          }
        })*/
      },
      addAddress(){
        this.$router.push('/my/address/add');
      }
    }
  }
</script>


<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~common/css/mixin";
  @import "~common/css/variable";

  .address {
    z-index: 10;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: $color-background;
    .no-result {
      display: inline-block;
      width: 10rem;
      @include font(5);
      color: #FF6A03;
      text-align: center;
      margin-top: px2rem(40);
    }
    .scroll-container {
      position: fixed;
      top: 0;
      bottom: px2rem($button-height);
      left: 0;
      right: 0;
    }
    .result {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      width: 10rem;
      .result-item {
        display: flex;
        justify-content: flex-end;
        width: 10rem;
        height: px2rem(236);
        box-sizing: border-box;
        margin-top: px2rem(28);
        background: $color-background-d;
        &:nth-last-child(1) {
          margin-bottom: px2rem(28);
        }
        .wrapper {
          position: relative;
          display: flex;
          flex-direction: column;
          width: px2rem(726);
          .default {
            position: absolute;
            top: px2rem(30);
            right: px2rem(35);
            display: flex;
            justify-content: center;
            align-items: center;
            width: px2rem(91);
            height: px2rem(44);
            border-radius: px2rem(5);
            background: $color-theme;
            color: #fff;
          }
          .info-box {
            margin: px2rem(38) 0 0 px2rem(26);
            @include font(2);
            .name {
              margin-right: px2rem(32);
            }
          }
          .address-text {
            @include font(2);
            color: $color-text-d;
            margin: px2rem(29) 0 px2rem(28) px2rem(26);
          }
          .set-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: px2rem(96);
            box-sizing: border-box;
            border-top: px2rem(3) solid $color-text-l;
            .left-box {
              display: flex;
              align-items: center;
              color: $color-theme;
              .text {
                font-weight: 600;
              }
              .icon {
                @include font(5);
                margin-right: px2rem(24);
              }
            }
            .right-box {
              display: flex;
              align-items: center;
              color: $color-text-ll;
              margin-right: px2rem(28);
              .edit-box {
                margin-right: px2rem(47);
              }
              i {
                @include font(3);
                margin-right: px2rem(13);
              }
            }
          }
        }

      }

    }
  }
</style>

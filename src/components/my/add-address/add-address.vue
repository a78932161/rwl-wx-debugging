<template>
  <div class="add-address">
    <span class="title">联系人信息</span>
    <div class="info-container">
      <div class="box">
        <div class="box-item line">
          <span class="text">姓名：</span>
          <input type="text" placeholder="请填写联系人姓名"/>
        </div>
        <div class="box-item">
          <span class="text">电话：</span>
          <input type="text" placeholder="请填写手机号码"/>
        </div>
      </div>
    </div>
    <span class="title">联系人地址</span>
    <div class="info-container">
      <div class="box">
        <div class="picker-container">
          <popup-picker @on-change=""
                        class="picker line"
                        confirm-text="确定"
                        :title="address.title"
                        v-model="address.value"
                        :columns="3"
                        :data='address.list'></popup-picker>
          <i class="icon-right iconfont icon-iconfonticonfonti2copycopy"></i>
        </div>
        <div class="box-item">
          <span class="text">详细地址：</span>
          <input type="text" placeholder="例：浙江农林大学A4楼512号"/>
        </div>
      </div>
    </div>
    <span class="tip">各高校下单：请注明学校生活区号楼栋号和寝室号</span>
    <div class="button">保存地址</div>
  </div>
</template>

<script>
  import cityData from 'components/my/address/citydata'
  import {PopupPicker} from 'vux';

  export default {
    data(){
      return {
        address: {
          title: "选择省市区",
          list: [{
            name: '中国',
            value: 'china',
            parent: 0
          }, {
            name: '美国',
            value: 'USA',
            parent: 0
          }, {
            name: '广东',
            value: 'china001',
            parent: 'china'
          }, {
            name: '广西',
            value: 'china002',
            parent: 'china'
          }, {
            name: '美国001',
            value: 'usa001',
            parent: 'USA'
          }, {
            name: '美国002',
            value: 'usa002',
            parent: 'USA'
          }, {
            name: '广州',
            value: 'gz',
            parent: 'china001'
          }, {
            name: '深圳',
            value: 'sz',
            parent: 'china001'
          }, {
            name: '广西001',
            value: 'gx001',
            parent: 'china002'
          }, {
            name: '广西002',
            value: 'gx002',
            parent: 'china002'
          }, {
            name: '美国001_001',
            value: '0003',
            parent: 'usa001'
          }, {
            name: '美国001_002',
            value: '0004',
            parent: 'usa001'
          }, {
            name: '美国002_001',
            value: '0005',
            parent: 'usa002'
          }, {
            name: '美国002_002',
            value: '0006',
            parent: 'usa002'
          }],
          value: []
        }
      }
    },
    created(){
      console.log(cityData)
      let arr = [];
      cityData.forEach((item) => {
        arr.push({
          name: item.name,
          value: item.name,
          parent: 0
        });
        if (item.children && item.children.length > 0) {
          item.children.forEach((aItem) => {

            arr.push({
              name: aItem.name,
              value:aItem.name,
              parent:item.name
            });
            if(aItem.children&&aItem.children.length>0){
                aItem.children.forEach((bItem)=>{
                  arr.push({
                    name: bItem.name,
                    value:bItem.name,
                    parent:aItem.name
                  });
                })
            }
          })
        }
      })
      console.log(arr);
      this.address.list=arr;
    },
    components: {
      PopupPicker
    }
  }

</script>


<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~common/css/mixin";
  @import "~common/css/variable";

  .add-address {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: $color-background;
    .title {
      display: inline-block;
      margin: px2rem(32) 0 px2rem(21) px2rem(26);
      font-weight: 600;
    }
    .info-container {
      display: flex;
      justify-content: flex-end;
      width: 10rem;
      background: $color-background-d;
      .box {
        @include px2rem(width, 726);
        .picker-container {
          position: relative;
          height: px2rem(88);
          .picker {
            display: flex;
            align-items: center;
            @include px2rem(width, 729);
            height: 100%;
            @include font(2);
            box-sizing: border-box;
            &.line {
              border-bottom: px2rem(3) solid $color-line-d;
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
        .box-item {
          display: flex;
          height: px2rem(88);
          box-sizing: border-box;
          &.line {
            border-bottom: px2rem(3) solid $color-line-d;
          }
          .text {
            display: flex;
            align-items: center;
            width: px2rem(185);
            height: 100%;
            @include font(2);
            margin: 0 px2rem(21) 0 0;
            padding-top: px2rem(3);
          }
          input {
            display: flex;
            align-items: center;
            flex-grow: 1;
            height: 100%;
            @include font(2);
            color: #B0B0B0;
            box-sizing: border-box;
            outline: 0;
          }
        }
      }
    }
    .tip {
      display: inline-block;
      color: #636363;
      margin: px2rem(16) 0 0 px2rem(24);
    }
    .button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 93%;
      height: px2rem(90);
      margin-left: 3.5%;
      margin-top: px2rem(44);
      @include font(2);
      border-radius: px2rem(8);
      background: $color-theme;
      color: #fff;
    }
  }
</style>

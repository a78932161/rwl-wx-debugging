<template>
  <div class="m-header">
    <div class="header-container">
      <div :class="[move,'logo']" @click="moveClick"></div>
      <div class="right-box">
        <div class="position item" @click="getLocation">
          <i class="icon iconfont icon-dingwei"></i>
          <span class="text" v-text="positionText"></span>
        </div>
        <a class="service item" :href="phone" >
          <i class="icon iconfont icon-dianhua"></i>
          <span class="text">联系客服</span>
        </a>
      </div>
    </div>
    <Loading v-show="load.showFlag"
             :screen="load.screen"
             :title="load.title"></Loading>
    <alert ref="alert" :content="content"></alert>
  </div>
</template>

<script>
  import Alert from 'base/alert/alert';
  import Loading from 'base/loading/loading';
  export default {
    data(){
      return {
        timer: '',
        content: '定位失败',
        load: {
          showFlag: false,
          screen: true,
          title: '正在定位中'
        },
        firstLoad: true,
        position: '',
        animation: true
      }
    },
    components: {
      Loading,
      Alert
    },
    computed: {
       phone(){
        return `tel:${4000878315}`;
       },
      positionText(){
        return this.position ? this.position : '手动定位';
      },
      move(){
        return this.animation ? 'move' : '';
      }
    },
    created(){
      this.getLocation();
    },
    methods: {
      onComplete(data){
        let location = data.addressComponent;
        this.position = `${location.province}${location.city}`;
        this.load.showFlag = false;
        clearTimeout(this.timer);
      },
      onError(error){
        this.load.showFlag = false;
        this.$refs.alert.show();
        clearTimeout(this.timer);
      },
      getLocation(){
        let mapObj = new AMap.Map('');
        mapObj.plugin('AMap.Geolocation', () => {
          this.timer=setTimeout(() => {          //网络异常时，无法走通，关闭定位
            this.$refs.alert.show();
            this.load.showFlag = false;
          }, 15000);
          this.load.showFlag = this.firstLoad ? false : true;  //第一次加载不显示加载动画
          this.firstLoad = false;
          let geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
            maximumAge: 0,           //定位结果缓存0毫秒，默认：0
            convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
          });
          geolocation.getCurrentPosition();
          AMap.event.addListener(geolocation, 'complete', this.onComplete);//返回定位信息
          AMap.event.addListener(geolocation, 'error', this.onError);      //返回定位出错信息
        });
      },
      moveClick(){
        this.animation = !this.animation;
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~common/css/mixin";
  @import "~common/css/variable";

  .m-header {
    width: 10rem;
    @include px2rem(height, 93);
    background: $color-background-d;
    .header-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 9rem;
      margin-left: 0.5rem;
      height: 100%;
      .logo {
        @include px2rem(width, 130);
        @include px2rem(height, 27);
        background-size: px2rem(130) px2rem(27);
        @include bg-image('./name');
        &.move {
          animation: mymove 2s;
        }
      }
      @keyframes mymove {
        10% {
          transform: translate(0, 20%);
        }
        20% {
          transform: translate(0, -20%);
        }
        30% {
          transform: translate(0, 20%);
        }
        40% {
          transform: translate(0, -20%);
        }
        50% {
          transform: translate(0, 20%);
        }
        60% {
          transform: translate(0, -20%);
        }
        70% {
          transform: translate(0, 20%);
        }
        80% {
          transform: translate(0, -20%);
        }
        90% {
          transform: translate(0, 20%);
        }
      }

      .right-box {
        display: flex;
        .item {
          display: flex;
          align-items: center;
          .icon {
            @include font(4);
            @include px2rem(margin-right, 16);
          }
          .icon, .text {
            color: $color-theme;
          }
        }
        .position {
          @include px2rem(margin-right, 40);
        }
      }
    }
  }
</style>

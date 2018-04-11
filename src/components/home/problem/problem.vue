<template>
  <div class="problem-container">
    <scroll>
    <div class="text-container">
      <div class="box">
        <span class="ask">
          1.下单成功后，是谁上门收衣服？需要多久上门？
        </span>
        <span class="answer">
          答：小主下单成功后，就会收到顺丰快递的短信，随后就会接到顺丰小哥的电话，并会在一小时内上门，邮费到付，满50元洗衣费包邮。
        </span>
      </div>
      <div class="box">
        <span class="ask">
          2.清洗时间需要多久？
        </span>
        <span class="answer">
         答：小主，加上物流时间，您基本上会在4天内即可收到已洗好的衣物，奢侈品护理类7~15天。
        </span>
      </div>
      <div class="box">
        <span class="ask">
         3.如何保证衣物的安全性？
        </span>
        <span class="answer">
        答：小主，您的衣服到我们公司后，会在监控下拆包，并由专业人员检查每件衣服的规格、污渍区域、原本起球起皱破损等问题并拍照，照片会同时发送到您手机上（在我的订单中查看）您也可以查看到您衣服的件数和整个洗涤的进度。入站后会自动生成价格发到您手机，小主微信付款就可以了，小让洗衣团队稳重专业，有着19年的洗衣经验，小让承诺绝无外包，全部在小让中央工厂洗涤。小主也可以在微信平台视频当中直接了解小让，小主如有发现洗好送回的衣服有质量问题，小让公司会根据【洗染行业条列】进行售后服务和赔偿。
        </span>
      </div>
      <div class="box">
        <span class="ask">
          4.怎么付款？
        </span>
        <span class="answer">
       答：小主，您的衣服到达中央洗涤工厂后会由专业人员检查每件衣服的规格、污渍区域、原本起球起皱破损等问题并拍照，检查完会自动生成价格发到您手机，小主直接点击收到付款信息即可完成付款。
        </span>
      </div>
    </div>
    </scroll>
  </div>
</template>
<script>
  import Scroll from 'base/scroll/scroll'
  export default {
    components:{
        Scroll
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "~common/css/mixin";
  @import "~common/css/variable";
  .problem-container{
    z-index:10;
    overflow-y: auto;
    position: fixed;
    top: 0;
    bottom:0;
    left: 0;
    right: 0;
    background: #fff;

      .text-container {
        display: flex;
        flex-direction: column;
        align-items:center;
        width: 10rem;
        padding: px2rem(32) 0;
        .box {
          @include px2rem(width, 700);
          display: flex;
          flex-direction: column;
          @include px2rem(margin-bottom, 40);
          .ask {
            @include font(4);
            color: $color-theme;
            @include px2rem(line-height, 42);
            @include px2rem(margin-bottom, 30);
          }
          .answer {
            @include font(2);
            @include px2rem(line-height, 42);
            color: $color-text;
          }
        }
      }
  }
</style>

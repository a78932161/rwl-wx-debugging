<template>
  <div ref="wrapper" class="scroll">
    <slot></slot>
  </div>
</template>
<script>
  import BScroll from 'better-scroll';
  export default {
    mounted(){
      setTimeout(() => {
        this._initScroll();
      }, 20)
    },
    props: {
      probeType: {
        type: Number,
        default: 3
      },
      click: {
        type: Boolean,
        default: true
      },
      listenScroll: {
        type: Boolean,
        default: false
      },
      pullUpLoad:{
        default:false
      },
      data: {
        type: Array,
        default: null
      }
    },
    methods: {
      _initScroll(){
        if (!this.$refs.wrapper) {
          return
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click,
          pullUpLoad:this.pullUpLoad
        });
        if (this.listenScroll) {   //派发滚动事件
          this.scroll.on('scroll', (pos) => {
            this.$emit('scroll', pos.y)
          })
        }
        if(this.pullUpLoad){
            this.scroll.on('pullingUp',()=>{
                this.$emit('pullingUp');
                this.$nextTick(()=>{
                  this.refresh();
                  this.scroll.scrollTo(0,this.scroll.maxScrollY);   /*写成this.scrollTo无法使用，原因不详*/
                  this.finishPullUp();
                });


            })
        }
      },
      scrollTo(){
        this.scroll&&this.scroll.scrollTo()
      },
      finishPullUp(){
        this.scroll&&this.scroll.finishPullUp()
      },
      disable() {
        // 代理better-scroll的disable方法
        this.scroll && this.scroll.disable()
      },
      enable() {
        // 代理better-scroll的enable方法
        this.scroll && this.scroll.enable()
      },
      refresh() {
        // 代理better-scroll的refresh方法
        this.scroll && this.scroll.refresh()
      }
    },
    watch:{
        data(){
          this.$nextTick(() => {
            this.refresh();
          })
        }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .scroll {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>

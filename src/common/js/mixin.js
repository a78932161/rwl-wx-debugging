/**
 * Created by Administrator on 2018/4/12.
 */
import {mapMutations, mapGetters} from 'vuex';
import {payType,idType,ERR_OK} from 'api/config';

export const shopBarMixin = {
  created(){
    this.setBarState(true);  //设置下方购物车为显示（当shopList长度大于0时显示购物车）
    this.handleShopBar(this.shopList); //每次进入页面，当有shopList时，scroll需要加bottom适应滚动
  },
  destroyed(){
    this.setBarState(false);
  },
  activated(){
    this.setBarState(true);
    this.handleShopBar(this.shopList);
  },
  deactivated(){
    this.setBarState(false);

  },
  computed: {
    ...mapGetters([
      'shopList'
    ])
  },
  methods: {
    handleShopBar(){
      throw new Error('component must implement handlePlaylist method')
    },
    ...mapMutations({
      setBarState: 'SET_BAR_STATE'
    })
  },
  watch: {
    shopList(newVal){
      this.handleShopBar(newVal);
    }
  }
};

let perpage = 12;
export const searchMoreMixin = {
  data(){
    return {
      result: [],
      hasMore: true,
      page: 0
    }
  },
  methods: {
    searchMore(){
      if (!this.hasMore) {
        return;
      }
      this.page++;
      this.result = this.result.concat(this.list.slice((this.page - 1) * perpage, this.page * perpage));
      this.hasMore = (this.result.length >= this.list.length) ? false : true;
    }
  }
};

export const setListMixin = {
  data(){
    return {
      category: ''
    }
  },
  created(){
    this.setCategoryText();
  },
  activated(){
    this.setCategoryText();
  },
  methods: {
    setCategoryText(){
      let route = this.$route;
      switch (route.params.name) {
        case 'laundry':
          if (route.query.top) {
            this.category = '高端洗护';
            this.type=payType.topLaundry;
            return;
          }
          this.category = '洗护';
          this.type=payType.laundry;
          break;
        case 'furnishing':
          this.category = '小让家居';
          break;
        case 'mall':
          this.category = '小让商城';
          break;
        case 'single':
          if (route.query.category === 'furnishing') {
            this.category = '小让家居';
            return;
          }
          this.category = '小让商城';
          break;

      }
    },
    setList(list, flag){
      let route = this.$route;
      switch (flag) {
        case 'laundry':
          if (route.query.top) {
            this.setTopLaundryList(list);
            return;
          }
          this.setLaundryList(list);
          break;
        case 'furnishing':
          this.setFurnishList(list);
          break;
        case 'mall':
          this.setMallList(list);
          break;
      }
    },
    ...mapMutations({
      setLaundryList: 'SET_LAUNDRY_LIST',
      setTopLaundryList: 'SET_TOP_LAUNDRY_LIST',
      setFurnishList: 'SET_FURNISH_LIST',
      setMallList: 'SET_MALL_LIST'
    })
  }
};


import {finishOrder} from 'api/orders';
export const finishOrderMixin={
  methods:{
    _finishOrder(url,id){
      let promise=new Promise((resolve,reject)=>{
        finishOrder(url,id).then((ops)=>{
          if(ops.code===ERR_OK){
            this.$msg.setShow('操作成功');
            resolve();
          }
        })
      });
      return promise;
    },
    judgeTypeUrl(id){ //判断当前订单的类型，api加上相应的订单return值
      let type = id.slice(-3);
      switch (type) {
        case idType.laundry:
          return 'laundryorder';
          break;
        case idType.mall:
          return 'mallorder';
          break;
        case idType.furniture:
          return 'furnitureorder';
          break;
      }
    },
    ...mapMutations({
      setIsFinish:'SET_IS_FINISH'
    })
  }
};

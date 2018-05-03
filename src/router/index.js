/**
 * Created by Administrator on 2018/4/9.
 */
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);


const _import = require('./_import_' + process.env.NODE_ENV);


let constantRouterMap = [
  {path: '/', redirect: '/home'},
  {
    path: '/home', component: _import('home/index/index'), children: [
    {path: 'problem', component: _import('home/problem/problem')},
    {name: 'laundry', path: 'laundry', component: _import('home/laundry/laundry')},
    {
      name: 'furnishing', path: 'furnishing', component: _import('home/furnishing/furnishing'), children: [
      {name: 'furnishing-commodity', path: 'commodity/:id', component: _import('home/commodity-details/commodity-details'),
        children: [
          {name:'details-image',path: 'image', component: _import('home/details-image/details-image')},
          {name:'storeinfo',path: 'storeinfo', component: _import('home/store-info/store-info')}
        ]
      },
    ]
    },
    {
      name: 'mall', path: 'mall', component: _import('home/mall/mall'), children: [
      {name: 'mall-commodity', path: 'commodity/:id', component: _import('home/commodity-details/commodity-details'),
        children: [
        {path: 'storeinfo', component: _import('home/store-info/store-info')}
      ]},
    ]
    },
    {name:'pay',path:'pay/:name', component: _import('home/pay/pay'),children:[
      {name:'payChose',path:'payChose:id',component:_import('home/pay-chose/pay-chose')}
    ]}
  ]
  },
  {path: '/recharge', component: _import('recharge/index/index'),children:[
    {name:'rechargePay',path:':balance',component: _import('recharge/pay/pay')}
  ]},
  {path: '/orders', component: _import('orders/index/index'),children:[
    {path:'details',component:_import('orders/order-details/order-details')}
  ]},
  {path: '/my', component: _import('my/index/index'), children: [
    {path: 'address', component: _import('my/address/address'), children: [
      {path: 'add', component: _import('my/add-address/add-address')}
    ]},
    {path: 'more', component: _import('my/more/more'),children:[
      {path:'suggest',component:_import('my/more-suggest/more-suggest')}
    ]}
  ]
  },
];

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
});


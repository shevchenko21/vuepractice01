// 入口文件
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import Vuex from 'vuex'
Vue.use(Vuex)

// 每次刚打开页面的时候获取localStorage中的购物车内容，然后加入store中
var cart = JSON.parse(localStorage.getItem('cart') || '[]')

var store = new Vuex.Store({
    state: {    //this.$store.state
        cart: cart //存储购物车中商品的数据 {id: id, count: 数量, price: 单价, selected: 被选中}
    },
    mutations: {//this.$store.mutations
        addToCart(state, obj){    //点击加入购物车，把商品信息保存到store中的Cart
            var flag = false;   
            
            state.cart.some(item=>{
                if(item.id == obj.id){
                    item.count += parseInt(obj.count)
                    flag = true
                    return true
                }
            })

            if(!flag){
                state.cart.push(obj)
            }

            // 更新Cart之后把Cart存储到本地的localStorage中
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        updateGoodsInfo(state, goodsinfo){ // 修改购物车中商品数量
           
            state.cart.some(item=>{
                if(item.id == goodsinfo.id){
                    item.count = parseInt(goodsinfo.count)
                    return true
                }
            })
            // 修改完商品数量之后把最新购物车数据保存到本地存储中
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        removeGoods(state, id){  //根据id从store中的购物车中删除对应商品数据
            state.cart.some((item, i)=>{
                if(item.id == id) {
                    state.cart.splice(i, 1);
                    return true
                }
            })
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        updateGoodsSelected(state, info){   //根据传入的{id: id, selected: true/false}把选中情况同步到cart中
            state.cart.some(item=>{
                if(item.id == info.id){
                    item.selected = info.selected
                }
            })
            localStorage.setItem('cart', JSON.stringify(state.cart));

        }
    },
    getters: {//this.$store.getters
        getSum(state) {
            var sum = 0;
            state.cart.forEach(item => {
                sum += item.count
            });
            
            return sum;
        },
        getGoodsCount(state) {
            var obj = {}
            state.cart.forEach(item=>{
                obj[item.id] = item.count
            })
            return obj
        },
        getGoodsSelected(state){    //查询商品列表选中的情况并且返回一个对象{id: true/false}
            var obj = {}
            state.cart.forEach(item=>{
                obj[item.id] = item.selected;
            })
            return obj
        },
        getGoodsCountAndAmount(state){
            var obj = {
                count: 0,   //勾选的数量
                amount: 0   //勾选的总价
            }
            state.cart.forEach(item=>{
                if(item.selected){
                    obj.count += item.count
                    obj.amount += item.price * item.count 
                }
            })
            return obj
        }
    }
})

import moment from 'moment'
Vue.filter('dateFormat', function(dataStr, pattern="YYYY-MM-DD HH:mm:ss"){
    return moment(dataStr).format(pattern)
})
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.root = 'http://www.liulongbin.top:3005';
Vue.http.options.emulateJSON = true;    //设置post表单数据格式形式

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

import VuePreview from 'vue-preview'
Vue.use(VuePreview)
/* Vue.use(preview, {
    mainClass: 'pswp--minimal--dark',
    barsSize: {top: 0, bottom: 0},
    captionEl: false,
    fullscreenEl: false,
    shareEl: false,
    bgOpacity: 0.85,
    tapToClose: true,
    tapToToggleControls: false
  }) */

import router from './router.js'
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
import './lib/mui/fonts/mui-icons-extra.ttf'

// 导入app根组件
import app from './App.vue'

var vm = new Vue({
    el: "#app",
    data: {
        msg: 'sdddddddd'
    },
    methods: {

    },
    render: c=>c(app),
    router: router,
    store
})
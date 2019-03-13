// 入口文件
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import VueResource from 'vue-resource'
Vue.use(VueResource)
import { Header } from 'mint-ui'
Vue.component(Header.name, Header);
import { Swipe, SwipeItem } from 'mint-ui';

Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
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
    router: router
})
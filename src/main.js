// 入口文件
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import { Header } from 'mint-ui'
Vue.component(Header.name, Header);
import './lib/mui/css/mui.min.css'

// 导入app根组件
import app from './App.vue'

var vm = new Vue({
    el: "#app",
    data: {
        msg: 'sdddddddd'
    },
    methods: {

    },
    render: c=>c(app)
})
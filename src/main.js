// 入口文件
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import moment from 'moment'
Vue.filter('dateFormat', function(dataStr, pattern="YYYY-MM-DD HH:mm:ss"){
    return moment(dataStr).format(pattern)
})
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.root = 'http://www.liulongbin.top:3005';
Vue.http.options.emulateJSON = true;    //设置post表单数据格式形式

/* import { Header,Button } from 'mint-ui'
import { Swipe, SwipeItem } from 'mint-ui';
import { Lazyload } from 'mint-ui';

Vue.use(Lazyload);
Vue.component(Header.name, Header);
Vue.component(Button.name, Button);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem); */
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

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
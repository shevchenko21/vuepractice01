import VueRouter from 'vue-router'


// 3. 创建路由对象
var router = new VueRouter({
  routes: [
    {path: '/', redirect: '/home'}
  ]
})

// 把路由对象暴露出去
export default router
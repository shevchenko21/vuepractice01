<template>
  <div class="cart-container">
    <!-- 商品列表区域 -->
    <div class="goods-list" v-for="(item, i) in goodslist" :key="item.id">
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch
             v-model="$store.getters.getGoodsSelected[item.id]"
             @change="selectedChanged(item.id, $store.getters.getGoodsSelected[item.id])"></mt-switch>
            <img :src="item.thumb_path" alt="">
            <div class="info">
              <h1>{{ item.title }}</h1>
              <p class="info-bottom">
                <span class="price">￥{{ item.sell_price }}</span>
                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                <a href="#" @click.prevent="remove(item.id, i)">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>


    <!-- 结算区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner counter">
          <div class="left">
            <p>总计（不含运费）</p>
            <p>已勾选商品 <span class="red">{{ $store.getters.getGoodsCountAndAmount.count }}</span> 件，总价￥ <span class="red">{{ $store.getters.getGoodsCountAndAmount.amount }}</span></p>
          </div>
          <mt-button type="danger">去结算</mt-button>
        </div>

      </div>
    </div>
    {{ this.$store.state.cart }}
  </div>
</template>

<script>
import "../../lib/mui/css/mui.min.css";
import numbox from '../subcomponents/shopcar_numbox.vue'
export default {
  data() {
    return {
      goodslist: []     //购物车中所有商品的数据
    };
  },
  created() {
    this.getGoodsList()
  },
  methods: {
    getGoodsList(){   // 获取购物车商品列表
     
      var idArr = []
      this.$store.state.cart.forEach(item=>{
        idArr.push(item.id)
      })
      // 如果购物车中没有东西则直接返回
      if( idArr.length <=0 ) {
        return 
      }
      this.$http.get('api/goods/getshopcarlist/' + idArr.join(',')).then(result=>{
        if(result.body.status === 0){
          this.goodslist = result.body.message
        }
      })
    },
    remove(id, index){  //点击删除 把商品从store中根据id删除 把当前组件中goodslist中要删除的商品使用index来删除
      this.goodslist.splice(index, 1);
      this.$store.commit('removeGoods', id);
    },
    selectedChanged(id, val){ //点击开关，把最新的开关状态同步到store中
      console.log(id + '---' + val);
      this.$store.commit('updateGoodsSelected', {
        id: id,
        selected: val
      })
      
    }
  },
  components: {
    numbox
  }
};
</script>

<style lang="scss" scoped>
.cart-container {
  background-color: #eee;
  overflow: hidden;
  .goods-list {
    .mui-card-content-inner{
      display: flex;
      align-items: center;
    }
    img {
      width: 60px;
      height: 60px;
      margin: 0 8px;
    }
    h1 {
      font-size: 13px;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .price {
        color: red;
        font-weight: bold;
      }
      .info-bottom {
        display: flex;
        justify-content: space-between;
      }
    }
  }
  .counter{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .red {
      color: red;
      font-size: 16px;
      font-weight: bold;
    }
  }
}
</style>
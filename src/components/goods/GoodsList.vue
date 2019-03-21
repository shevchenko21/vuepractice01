<template>
    <div class="goods-list">
        <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)">
            <img :src="item.img_url" alt="">
            <h1 class="title"> {{ item.title }} </h1>
            <div class="info">
                <p class="price">
                    <span class="now"> {{ item.sell_price }} </span>
                    <span class="old"> {{ item.market_price }}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩余 {{ item.stock_quantity }} 件</span>
                </p>
            </div>
        </div>
        
        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            pageindex: 1,
            goodslist: []   //存放商品列表
        }
    },
    created() {
        this.getGoodsList();
    },
    methods: {
        getGoodsList(){
            this.$http.get('api/getgoods?pageindex=' + this.pageindex).then(result=>{
                if(result.body.status === 0){
                    this.goodslist = this.goodslist.concat(result.body.message);
                }
            })
        },
        getMore(){
            this.pageindex++;
            this.getGoodsList();
        },
        goDetail(id){   //使用js的形式进行路由导航
            this.$router.push("/home/goodsinfo/" + id)
        }
    },
}
</script>

<style lang="scss" scoped>
.goods-list {
    padding: 6px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .goods-item {
        width: 49%;
        border: 1px solid #dbdada;
        box-shadow: 0 0 8px #ccc;
        margin: 3px 0;
        padding: 2px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 293px;
        img {
            width: 100%;
        }
        h1 {
            font-size: 14px;
        }
        .info {
            background-color: #eee;
            width: 100%;
            p {
                margin: 0;
                padding: 5px;
            }
            .now {
                color: red;
                font-size: 16px;
                font-weight: bold;
            }
            .old {
                color: #ccc;
                font-size: 12px;
                text-decoration: line-through;
            }
            .sell {
                display: flex;
                justify-content: space-between;
                font-size: 12px;
            }
        }
    }
}
</style>

<template>
    <div>
        <!-- 顶部滑动条区域 -->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item', item.id == 0 ? 'mui-active' : null]" v-for="item in cates" :key="item.id" @click="getPhotoList(item.id)">
                        {{ item.title }}
                    </a>
                </div>
            </div>
        </div>
        <!-- 中间的图片区域 -->
        <ul class="photo-list">
            <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/' + item.id" tag="li">
                <img v-lazy="item.img_url">
                <div class="info">
                    <h1 class="info-title"> {{ item.title }} </h1>
                    <div class="info-body"> {{ item.zhaiyao }} </div>
                </div>
            </router-link>
        </ul>
    </div>
</template>

<script>
import mui from '../../lib/mui/js/mui.js'
import { Toast } from 'mint-ui'
export default {
    data() {
        return {
            cates: [],   //所有分类的列表数组
            list: []
        }
    },
    created() {
        this.getAllCategory();
        this.getPhotoList(0);
    },
    mounted() {     //组件已经被渲染好了并放到页面中之后执行
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005
        })
    },
    methods: {
        getAllCategory(){
            // 获取所有图片分类
            this.$http.get('api/getimgcategory').then(result=>{
                console.log(result);
                
                if(result.body.status === 0){
                    // 手动拼接一个完整分类列表
                    result.body.message.unshift({title: "全部", id: 0})
                    this.cates = result.body.message
                }else {
                    Toast("获取数据失败")
                }
            })
        },
        getPhotoList(cateId){
            this.$http.get("api/getimages/"+cateId).then(result=>{
                console.log(result);
                if(result.body.status === 0){
                    this.list = result.body.message
                }
            })
        }
    },
}
</script>

<style lang="scss" scoped>
* {
    touch-action: pan-y;
}
image[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}
.photo-list {
    list-style: none;
    margin: 0;
    padding: 10px;
    padding-bottom: 0;
    li {
        margin-bottom: 10px;
        background-color: #ccc;
        text-align: center;
        box-shadow: 0 0 6px #999;
        position: relative;
        img {
            width: 100%;
            vertical-align: middle;
        }
        image[lazy=loading] {
            width: 40px;
            height: 300px;
            margin: auto;
        }
        .info {
            background-color: rgba(0, 0, 0, 0.4);
            color: white;
            text-align: left;
            position: absolute;
            bottom: 0;
            max-height: 84px;
            .info-title {
                font-size: 14px;
            }
            .info-body {
                font-size: 13px;
            }
        }
    }
}
</style>


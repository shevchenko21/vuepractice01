<template>
    <div class="photoinfo-container">
        <h3> {{ photoinfo.title }} </h3>
        <p class="subtitle">
            <span>发表时间：{{ photoinfo.add_time | dateFormat }} </span>
            <span>点击数：{{ photoinfo.click }} </span>
        </p>

        <hr>


        <!-- 缩略图区域 -->

        <!-- 图片内容区域 -->
        <div class="content" v-html="photoinfo.content"></div>

        <!-- 评论子组件 -->
        <cmt-box :id="id"></cmt-box>
    </div>
</template>

<script>
import comment from '../subcomponents/comment.vue'

export default {
    data() {
        return {
            id: this.$route.params.id,     //从路由中获取到的图片id
            photoinfo: {}
        }
    },
    created() {
        this.getPhotoInfo();
    },
    methods: {
        getPhotoInfo(){
            this.$http.get('api/getimageInfo/'+ this.id).then(result=>{
                console.log(result);
                
                if(result.body.status === 0){
                    this.photoinfo = result.body.message[0]
                }
            })
        }
    },
    components: {
        'cmt-box': comment
    }
}
</script>

<style lang="scss" scoped>
.photoinfo-container {
    padding: 3px;
    h3 {
        color: #26A2ff;
        font-size: 15px;
        text-align: center;
        margin: 15px 0;
    }
    .subtitle {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
    }
    .content {
        font-size: 13px;
        line-height: 30px;

    }
}
</style>

<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入要评论的内容（最多120字）" maxlength="120" v-model="comment"></textarea>
        <mt-button type="primary" size="large" @click="this.addComment">发表评论</mt-button>
            <div class="cmt-list">
                <div class="cmt-item" v-for="(item, i) in comments" :key="item.add_time">
                    <div class="cmt-title">
                        第{{ i+1 }}楼&nbsp;&nbsp;用户:{{ item.user_name }}&nbsp;&nbsp;发表时间:{{ item.add_time | dateFormat }}
                    </div>
                    <div class="cmt-body">
                        {{ item.content === 'undefined' ? '此用户很懒，什么也没说' : item.content }}
                    </div>
                </div>
            </div>
        <mt-button type="danger" size="large" plain @click="this.getMore">加载更多</mt-button>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
    data(){ 
        return {
            comments: [],
            pageIndex: 1,        //页码，默认为第一页数据
            comment: "",
            // id: this.id
        }
    },
    created() {
        this.getComments()
    },
    methods: {
        getComments(){
            this.$http.get('api/getcomments/'+this.id+'?pageindex='+this.pageIndex).then(result=>{
                if(result.body.status === 0){
                    this.comments = this.comments.concat(result.body.message)
                }else {
                    Toast("获取数据失败")
                }
            })
        },
        getMore(){
            this.pageIndex++;
            this.getComments();
        },
        addComment(){
            if(this.comment.trim().length === 0){
                return Toast("评论内容不能为空！")
            }
            this.$http.post('api/postcomment/'+ this.$route.params.id, {content: this.comment.trim()}).then(result=>{
                console.log(result);
                if(result.body.status === 0){
                    var cmt = { 
                        user_name: '匿名用户', 
                        add_time: Date.now(), 
                        content: this.comment.trim() 
                    }
                    this.comments.unshift(cmt)
                    this.comment = ""
                }
            }) 
        }
    },
    props: ["id"]       //父组件向子组件传值
}
</script>

<style lang="scss" scoped>
.cmt-container {
    h3 {
        font-size: 18px;
    }
    textarea {
        font-size: 14px;
        height: 85px;
        margin: 0;
    }
    .cmt-list {
        margin-top: 5px;
        .cmt-item {
            font-size: 13px;
            .cmt-title {
                line-height: 30px;
                background-color: #ccc;
            }
            .cmt-body {
                line-height: 35px;
                text-indent: 2em;
            }
        }
    }
}
</style>

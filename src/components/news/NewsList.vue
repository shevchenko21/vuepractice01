<template>
  <div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
        <router-link :to="'/home/newsinfo/' + item.id">
          <img
            class="mui-media-object mui-pull-left"
            :src="item.img_url"
          >
          <h1>{{ item.title }}</h1>
          <p class="mui-ellipsis">
            <span>发表时间:{{ item.add_time | dateFormat }}</span>
            <span>点击数:{{ item.click }}</span>
          </p>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import comment from "../subcomponents/comment.vue"

export default {
  data() {
    return {
      newslist: []
    };
  },
  created() {
    this.getNewsList();
  },
  methods: {
    getNewsList() {
      this.$http.get("api/getnewslist").then(result => {
        console.log(result);

        if (result.body.status === 0) {
          this.newslist = result.body.message;
        } else {
          Toast("获取列表失败");
        }
      });
    }
  },
  components: { //用来注册子组件的节点
    "comment-box": comment
  }
};
</script>
<style lang="scss" scoped>
.mui-table-view {
  h1 {
    font-size: 14px;
  }
  .mui-ellipsis {
    font-size: 12px;
    color: #226aff;
    display: flex;
    justify-content: space-between;
  }
}
</style>
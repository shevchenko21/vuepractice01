<template>
  <div>
      <!-- 将来谁使用此轮播图组件 谁为我们传递Lunbotulist -->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
        <img :src="item.img" :class="{'full': isfull}">
      </mt-swipe-item>
    </mt-swipe>
  </div>

  <!--  -->
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    methods: {
        
    },
    props: ['lunbotuList', 'isfull']
};
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 200px;
  .mint-swipe-item {
       text-align: center;
       img {
            // width: 100%;
            height: 100%;
        }
  }
 
}
.full {
    width: 100%;
}
</style>

<template>
  <div class="root">
    <!-- 背景图片 -->
    <div class="background">
      <img
        src="../assets/homeImage/homeBackground.png"
        width="100%"
        height="100%"
      />
    </div>

    <!-- 消息按钮 -->
    <button class="message"></button>

    <!-- 搜索框 -->
    <div class="searchbox">
      <input class="search" type="text" />
      <img src="../assets/homeImage/搜索.png" class="searchbtn" />
    </div>
    <!-- 一些顶部的标题图片 -->
    <div style="display: flex">
      <img
        src="../assets/homeImage/标题.png"
        alt=""
        class="label"
        style="margin-left: 10rem"
      />
      <img
        src="../assets/homeImage/简要标题.png"
        alt=""
        class="label"
        style="margin-left: 9rem"
      />
      <img
        src="../assets/homeImage/价格.png"
        alt=""
        class="label"
        style="margin-left: 45rem"
      />
    </div>
    <!-- 一个底部的挡板，使商品描述更清楚 -->
    <img
      src="../assets/homeImage/背景@2x(1).png"
      style="position: absolute; z-index: -1; width: 105.5rem; height: 39.46rem"
    />

    <!-- 轮播图 -->
    <el-carousel interval=5000 trigger="click" style=" width:105rem;" height="41rem">
      <el-carousel-item v-for="item in 4" :key="item">
        <!-- 商品列表分页展示 -->
        <div class="goodslist" v-for="i in 4" :key="i">
          <li @click="comein((item - 1) * 4 + i)">
            <img
              src="../assets/homeImage/图层 8.png"
              alt=""
              style="
                width: 105rem;
                height: 8.5rem;
                position: relative;
                z-index: 0;
              "
            />
            <div class="content">
              <div class="title">第{{ (item - 1) * 4 + i }}个商品</div>
              <div class="brief">
                这是一条简要介绍，欢迎光临MewStore!!!!!ヾ(≧▽≦*)o
                这是一条简要介绍，欢迎光临MewStore!!!!!ヾ(≧▽≦*)o
                这是一条简要介绍，欢迎光临MewStore!!!!!ヾ(≧▽≦*)o
              </div>
              <div class="price">￥114514</div>
            </div>
          </li>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import NavMenu from "../components/NavMenu.vue";
import Hello from "../components/Hello.vue";
import router from "@/router";
export default {
  components: {
    NavMenu,
    Hello,
  },
  methods: {
    comein(id) {
      alert("进入商品详情页" + id);
      var url = "/detail/"+id;
      this.$router.push({
         path: url
      });
    },
  },
};
</script>

<style scoped>
.background {
  left: 0;
  top: 0;
  width: 106.5rem;
  height: 56.96rem;
  z-index: -1;
  position: absolute;
}

.message {
  height: 3.2rem;
  margin-top: 3.5rem;
  margin-left: 96.55rem;
  padding-left: 2rem;
  padding-right: 3.87rem;
  font-size: 1.7rem;
  border-radius: 1.5rem;
  border-width: 0;
  background: url(../assets/homeImage/组\ 1.png);
}
button:hover {
  opacity: 92%;
  cursor: pointer;
}
.search {
  width: 25rem;
  border-radius: 2rem;
  font-size: 1.7rem;
  padding: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
}
.searchbox {
  width: fit-content;
  margin-left: 65rem;
  margin-top: -4.5rem;
  display: flex;
}
.searchbtn {
  position: absolute;
  margin-top: 0.4rem;
  margin-left: 23.5rem;
}
.searchbtn:hover {
  cursor: pointer;
}
.label {
  height: 2.7rem;
  margin-top: 2.6rem;
}

.content {
  margin-left: 4rem;
  font-size: 3rem;
  margin-top: -7rem;
  position: absolute;
  display: flex;
  cursor: pointer;
}
.title {
  width: 18rem;
  text-align: center;
}
.brief {
  width: 55rem;
  margin-left: 2rem;
  font-size: 1.7rem;
  margin-top: -1rem;
  text-align: left;
}
.price {
  width: 18rem;
  margin-left: 2rem;
  text-align: left;
  color: red;
}
</style>

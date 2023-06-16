<template>
  <div>
    <div class="header">
      <NavMenu class="navMenu" />
      <hello class="hello" />
    </div>
    <div class="root">
      <!-- 背景图片 -->
      <div class="background">
        <img
          src="../assets/homeImage/homeBackground.png"
          width="100%"
          height="100%"
        />
      </div>
      <router-link to="/message">
        <!-- 消息按钮 -->
        <button class="message" @click="onMessageBtn"></button>
      </router-link>

      <!-- 搜索框 -->
      <div class="searchbox">
        <input class="search" type="text" v-model="keyword" @keyup.enter="search" />
        <img src="../assets/homeImage/搜索.png" class="searchbtn" @click="search" />
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
        style="
          position: absolute;
          z-index: -1;
          width: 105.5rem;
          height: 39.46rem;
        "
      />

      <!-- 轮播图 -->
      <el-carousel
        :interval="3000"
        trigger="click"
        style="width: 105rem"
        height="41rem"
      >
        <el-carousel-item
          v-for="page in Math.ceil(goods.length / 4)"
          :key="page"
        >
          <!-- 商品列表分页展示 -->
          <div
            class="goodslist"
            v-for="good in goods.slice((page - 1) * 4, page * 4)"
            :key="good.id"
          >
            <li @click="comein(good)">
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
                <div class="title">{{ good.title }}</div>
                <div class="brief">
                  {{
                    good.content.length > 175
                      ? good.content.substring(0, 175) + "..."
                      : good.content
                  }}
                </div>
                <div class="price">￥{{ good.price }}</div>
              </div>
            </li>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import NavMenu from "../components/NavMenu.vue";
import Hello from "../components/Hello.vue";
import router from "@/router";
import { HomeInfo, HomeSearch } from "@/api/api";
export default {
  data() {
    return {
      goods: [
        // {
        //   id: 1,
        //   title: "第一个商品",
        //   price: 100,
        //   brief:
        //     "这是一条简要介绍，欢迎光临MewStore!!!!!ヾ(≧▽≦*)o\
        //         这是一条简要介绍，欢迎光临MewStore!!!!!ヾ(≧▽≦*)o\
        //         这是一条简要介绍，欢迎光临MewStore!!!!!ヾ(≧▽≦*)o\
        //         这是一条简要介绍，欢迎光临MewStore!!!!!ヾ(≧▽≦*)o\
        //         这是一条简要介绍，欢迎光临MewStore!!!!!ヾ(≧▽≦*)o",
        // },
        // {
        //   id: 2,
        //   title: "第二个商品",
        //   price: 100,
        //   brief:
        //     "这是一条简要介绍，欢迎光临MewStore!!!!!ヾ(≧▽≦*)o\
        //         这是一条简要介绍，欢迎光临MewStore!!!!!ヾ(≧▽≦*)o\
        //         这是一条简要介绍，欢迎光临MewStore!!!!!ヾ(≧▽≦*)o\
        //         这是一条简要介绍，欢迎光临MewStore!!!!!ヾ(≧▽≦*)o\
        //         这是一条简要介绍，欢迎光临MewStore!!!!!ヾ(≧▽≦*)o",
        // },
      ],
      good: null,
      keyword: "",
    };
  },
  components: {
    NavMenu,
    Hello,
  },
  mounted() {
    let homeParams = {
      page: 1,
      size: 114514,
    };
    HomeInfo(homeParams).then((res) => {
      console.log(res.data);
      this.goods = res.data;
    });
  },
  beforeDestroy() {
    this.$bus.$emit("detailInfo", this.good);
  },
  methods: {
    comein(good) {
      // alert("进入商品详情页" + good.id);
      this.$bus.$emit("detailInfo", good);
      this.good = good;
      var url = "/detail/" + good.id;
      this.$router.push({
        path: url,
      });
    },
    search()
    {
      let homeParams = {
        page: 1,
        size: 114514,
        keyword: this.keyword,
        apipost_id:"d7f83c"
      };
      HomeSearch(homeParams).then((res) => {
        console.log(res.data);
        this.goods = res.data;
      });
    },
    onMessageBtn() {
      this.$cookies.set("activeNum", "0");
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

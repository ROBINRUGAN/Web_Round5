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
      <!-- 消息按钮 -->
      <button class="message"></button>

      <!-- 搜索框 -->
      <div class="searchbox">
        <input class="search" type="text" />
        <img src="../assets/homeImage/搜索.png" class="searchbtn" />
      </div>

      <!-- 一个底部的挡板，使商品描述更清楚 -->
      <img
        src="../assets/homeImage/背景@2x(1).png"
        style="
          position: absolute;
          z-index: -1;
          width: 105.5rem;
          height: 39.46rem;
          margin-top: 5rem;
        "
      />
    </div>
  </div>
</template>

<script>
import NavMenu from "../components/NavMenu.vue";
import Hello from "../components/Hello.vue";
import router from "@/router";
export default {
  data() {
    return {

    };
  },
  components: {
    NavMenu,
    Hello,
  },
  methods: {
    comein(id) {
      alert("进入商品详情页" + id);
      var url = "/detail/" + id;
      this.$router.push({
        path: url,
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

</style>

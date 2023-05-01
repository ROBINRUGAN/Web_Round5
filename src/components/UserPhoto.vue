<template>
  <el-row>
    <div class="avatar">
      <el-avatar :size="50" :src="circleUrl" fit="fill"></el-avatar>
      <div class="nickName">{{ nickname }}</div>
    </div>
  </el-row>
</template>
<script>
import image from "../assets/homeImage/用户中心.png";
export default {
  data() {
    return {
      circleUrl: image,
      nickname: "MEWWW",
    };
  },
};
</script>
<style scoped>
.nickName {
  margin-top: 0.5rem;
  margin-left: 0.5rem;
  font-family: "HanYiDieYuTiJian-1";
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
}
.avatar {
  display: flex;
}
</style>
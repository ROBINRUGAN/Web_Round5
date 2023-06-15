<template>
  <el-row>
    <div class="avatar">
      <el-avatar :size="120" :src="circleUrl" fit="fill"></el-avatar>
    </div>
  </el-row>
</template>
<script>
import image from "../assets/homeImage/用户中心.png";
export default {
  data() {
    return {
      circleUrl: image,
    };
  },
  mounted() {
    const userInfoString = window.localStorage.getItem("userInfo");
    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString);
      this.nickname = userInfo.username;
      this.circleUrl = userInfo.profile_photo;
    }
  },
};
</script>
<style scoped>
.avatar {
  display: flex;
}
</style>
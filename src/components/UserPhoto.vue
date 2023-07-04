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
import { UserInfo } from "@/api/api";
export default {
  data() {
    return {
      circleUrl: image,
      nickname: "游客用户",
    };
  },
  mounted() {
    console.log("你好");

    UserInfo()
      .then((userRes) => {
        console.log(userRes);
        if (userRes.code == 200) {
          window.localStorage.setItem("userInfo", JSON.stringify(userRes.user));
          window.localStorage.setItem("userId", userRes.user.id);
        } else {
          alert("登录已过期，请重新登录...");
          window.localStorage.removeItem("token");
          window.localStorage.removeItem("userInfo");
          window.localStorage.removeItem("userId");

          this.$router.push("/login");
        }
      })
      .catch((userErr) => {
        console.log(userErr);
        alert(userErr.message);
      });
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
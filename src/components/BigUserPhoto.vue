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
};
</script>
<style scoped>
.avatar {
  display: flex;
}
</style>
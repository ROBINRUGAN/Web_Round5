<template>
  <el-dropdown>
    <div class="el-dropdown-link">
      <user-photo />
      <i
        class="el-icon-arrow-down el-icon--right"
        style="margin-top: 0.3rem"
      ></i>
    </div>

    <el-dropdown-menu slot="dropdown" class="menu">
      <router-link to="/userCenter" style="text-decoration: none;">
              <el-dropdown-item icon="el-icon-user" >个人中心</el-dropdown-item>
      </router-link>

      <router-link to="/login" style="text-decoration: none;">
              <el-dropdown-item icon="el-icon-switch-button">退出登录</el-dropdown-item>
      </router-link>

    </el-dropdown-menu>
  </el-dropdown>
</template>
 
<script>
import UserPhoto from "../components/UserPhoto";
export default {
  components: {
    UserPhoto,
  },
  data() {
    return {};
  },
  methods:{

  }
};
</script>

<style scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #000000;
  display: flex;
}
.el-icon-arrow-down {
  font-size: 30px;
  color: white;
}
.menu {
  margin-left: 5rem;
  width: 10rem;
}
li {
    margin-left: 0.1rem;
  height: 2.5rem;
  font-size: 1.1rem;
}
</style>
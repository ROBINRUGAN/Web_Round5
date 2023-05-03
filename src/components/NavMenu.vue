<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="navMenu"
      mode="horizontal"
      background-color="transparent"
      text-color="white"
      active-text-color="#F2ABA7"
      @select="handleSelect"
    >
      <router-link to="/" style="text-decoration: none;">
         <el-menu-item index="1">首页</el-menu-item>
      </router-link>
     <router-link to="/sell" style="text-decoration: none;">
         <el-menu-item index="2">我要出售 </el-menu-item>
         </router-link>
      
      <!-- <el-menu-item index="3" disabled>消息中心</el-menu-item> -->
      <router-link to="/contactUs" style="text-decoration: none;">
         <el-menu-item index="3">关于我们</el-menu-item>
      </router-link>
    </el-menu>
  
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      activeIndex: "",
    };
  },
  mounted() {
    if(this.$cookies.get("activeNum")!=null)
    {
        this.activeIndex=this.$cookies.get("activeNum");
    }
  
  },
  
  methods: {
    handleSelect(key, keyPath) {
      this.$cookies.remove("activeNum");
    this.$cookies.set("activeNum",key);
    },
  },
};
</script>

<style scoped>
*{
    font-family: 'HanYiDieYuTiJian-1';
    display: flex;   
    justify-content: center;
}
.el-menu
{
  margin: 1rem !important;
  margin-top: 0rem !important;
  margin-bottom: 0rem !important;
}
.el-menu-item{
  height: 3rem;
    font-size: 1.7rem;
    border-radius: 0.5rem;
}
.el-menu.el-menu--horizontal {
    border-bottom: solid 3px #ffffff;  
    height: 3rem;
}
.el-menu--horizontal>.el-menu-item
{
    height: 3rem;
    width: 10rem;

}
.el-menu-item:hover {
  border-radius: 0.5rem !important;
  background-color: rgba(82, 148, 210, 0.678)!important;
}

</style>
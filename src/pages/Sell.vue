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
        src="../assets/sellImage/商品发布页1.jpg"
        width="100%"
        height="100%"
      />
    </div>
    <!-- 消息按钮 -->
    <button class="message"></button>
    <!-- <div class="headTitle">
        <div class="first">
        账号资料填写
      </div>
      <div class="second">
        账号图片展示
      </div>
      <div class="third">
        完成商品发布
      </div>
    </div> -->

    <UploadForm class="uploadForm" />
  </div>
        </div>
</template>
    
    <script>
import NavMenu from "../components/NavMenu.vue";
import Hello from "../components/Hello.vue";
import UploadForm from "@/components/UploadForm.vue";
import BigUserPhoto from "../components/BigUserPhoto.vue";
export default {
  components: {
    NavMenu,
    Hello,
    BigUserPhoto,
    UploadForm,
  },
  methods: {},

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
.headTitle {
  width: 103rem;
  font-size: 4rem;
  margin-top: 4rem;
  color: rgb(105, 105, 105);
  text-decoration: underline;
  display: flex;
  position: relative;
}
.first {
  padding-left: 10rem;
  padding-right: 3rem;
}
.second {
  padding-right: 3rem;
}
.uploadForm {
margin-left: 15rem;
margin-top: 5rem;
  display: flex;
  position: absolute;
}
</style>
    
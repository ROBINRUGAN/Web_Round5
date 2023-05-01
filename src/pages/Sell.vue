<template>
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
          <!-- 一个底部的挡板，使商品描述更清楚 -->


    </div>
  </template>
    
    <script>
  import NavMenu from "../components/NavMenu.vue";
  import Hello from "../components/Hello.vue";
  import BigUserPhoto from "../components/BigUserPhoto.vue";
  export default {
    components: {
      NavMenu,
      Hello,
      BigUserPhoto,
    },
    methods: {
      
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
  

  
  </style>
    
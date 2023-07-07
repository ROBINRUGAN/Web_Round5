<template>
  <div>
    <button class="download" @click="android">
      <i class="el-icon-download"></i>
      MewStore For Android
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    android() {
      //这里写下载链接
      window.location.href = "http://www.baidu.com";
    },
  },
};
</script>

<style scoped>
div {
  position: absolute;
  margin: 0;
  padding: 0;
  left: 0;
  right: 0;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100%;
  width: 100%;
  justify-content: center;
  background-image: url("../assets/download.png");
  display: flex;
}
.download {

  position: relative;;
  text-align: center;
  align-content: center;
  top: 60%;  
  width: 80%;
  height: 7%;
  font-size: 120%;
  color: rgb(255, 255, 255);
  border-radius: 0.8rem;
  background-color: #ff9c8b;
}
</style>
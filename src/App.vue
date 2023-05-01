<template>
  <div>
    <div class="header">
      <NavMenu class="navMenu" />
      <hello class="hello" />
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import NavMenu from "./components/NavMenu.vue";
import Hello from "./components/Hello.vue";
export default {
  name: "App",
  components: {
    NavMenu,
    Hello,
  },
};
</script>

<style>
*{
  font-family: 'HanYiDieYuTiJian-1';
}
.navMenu {
  width: 26.5rem;
  height: 100%;
  margin-left: 54rem;
  margin-top: 0.7rem;
  display: flex;
}
.hello {
  margin-left: 4rem;
  margin-top: 0.7rem;
  display: flex;
  position: relative;
}
.header {
  height: auto;
  display: flex;
}
.topUpButton {
    background: #ed8360 !important;
    border-color: #ed8360 !important;
}
.withdrawButton {
    background: #ed8360 !important;
    border-color: #ed8360 !important;
}
.el-message-box__title
{
  font-size: 1.4rem !important; 
  color: #d34212 !important;
}
.el-message-box__message
{
  font-size: 1.2rem !important; 
}
.el-button--small
{
  font-size: 1rem !important;
}
.el-message__content
{
  font-size: 1rem !important;
}
.el-collapse-item__header
{
  padding-left: 0.8rem;
  background-color: rgba(255, 191, 185, 0.365) !important;
  color: #4a4a4a !important;

  font-size: 1.7rem !important;
}
.el-collapse-item__content
{
  background-color: rgba(244, 161, 154, 0.365) !important;
  padding-left: 0.8rem;
  color: #4a4a4a !important;
  font-size: 1.5rem !important;
}
</style>

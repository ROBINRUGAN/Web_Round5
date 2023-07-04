<template>
  <div>
    <div class="header">
      <NavMenu class="navMenu" />
      <hello class="hello" />
    </div>
    <div class="root">
      <div class="background">
        <img src="../assets/Canvas(1).jpg" width="100%" height="100%" />
      </div>

      <el-collapse class="info" v-model="activeName" accordion>
        <el-collapse-item title="闲猫 MewStore" name="1">
          <div>
            这是福州大学西二在线工作室合作轮考核作业，本轮的考核要求是实现一个二手游戏账号交易平台。闲猫
            (MewStore)
            是我们的项目名称，支持网页端和安卓端。本项目为闲猫网页端。
          </div>
          <div style="color: #df0000">
            我们的团队名为闲猫，由MEWWW、Kikikisum、呼呼狐、LRD.Abner、Arthur.Wang组成。
          </div>
        </el-collapse-item>
        <el-collapse-item title="分工 Work" name="2">
          <div>网页端分工如下：</div>
          <div>组长：MEWWW</div>
          <div>美术：呼呼狐 前端：MEWWW</div>
          <div>后端：Kikikisum，Arthur.Wang</div>
        </el-collapse-item>
        <el-collapse-item title="联系我们 Contact" name="3">
          <div>MewStore闲猫总部 QQ群: 740361356</div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import Hello from "@/components/Hello.vue";
import NavMenu from "@/components/NavMenu.vue";
export default {
  data() {
    return {
      activeName: "1",
    };
  },
  components: { Hello, NavMenu },
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
.info {
  width: 50rem;
  height: 20rem;
  margin-left: 50rem;
  margin-top: 12rem;
  border-width: 0;
}
</style>

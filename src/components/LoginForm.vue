<template>
  <div>
    <input
      type="text"
      v-model="telephone"
      placeholder="请输入手机号"
      v-show="flag"
    />
    <input
      type="text"
      v-model="account"
      placeholder="请输入账号"
      v-show="!flag"
    />
    <br /><br />
    <input
      type="password"
      v-model="password"
      placeholder="请输入密码"
      v-show="!flag"
    />
    <input
      type="text"
      v-model="code"
      placeholder="请输入验证码"
      v-show="flag"
    />
    <br />
    <a class="getCode" v-show="flag">获取验证码</a>
    <br />
    <a @click="changeLoginWay()" class="changeLoginWay">{{ LoginType }}</a>
    <br /><br />
    <router-link to="/">
      <button class="loginBtn">登录</button>
    </router-link>
    <router-link to="/register">
      <button class="registerBtn">注册</button>
    </router-link>
  </div>
</template>

<script>
import { watch } from "vue";
export default {
  data() {
    return {
      telephone: "",
      account: "",
      password: "",
      code: "",
      LoginType: "手机验证码登录",
      flag: false,
    };
  },
  methods: {
    changeLoginWay() {
      this.flag = !this.flag;
      //console.log(this.flag)
    },
  },
  watch: {
    flag: {
      immediate: true,
      handler(newValue) {
        this.LoginType = newValue ? "账号密码登录" : "手机验证码登录";
      },
    },
  },
};
</script>

<style scoped>
* {
  font-family: "HanYiDieYuTiJian-1";
}
body {
  width: 40rem;
}
input {
  width: 35rem;
  font-size: 1.7rem;
  padding: 0.7rem;
  margin-bottom: 1rem;
  border-radius: 0.7rem;
  border-width: 0.01rem;
}
button {
  height: 3rem;
  width: 16rem;
  margin: 0.2rem;
  padding-left: 2rem;
  padding-right: 2rem;
  font-size: 1.7rem;
  border-radius: 1rem;
  border-width: 0.01rem;
}
button:hover {
  background-color: rgb(142, 196, 254);
}

.loginBtn {
  margin-right: 4rem;
  background-color: #5593cc;
  color: white;
}
.changeLoginWay {
  text-decoration: underline;
  margin-left: 24rem;
  color: #5593cc;
  font-size: 1.4rem;
  cursor: pointer;
}
.getCode {
  text-decoration: underline;

  color: #5593cc;
  font-size: 1.4rem;
  margin-top: -3.2rem;
  margin-left: 27rem;
  width: 7rem;
  cursor: pointer;
  position: absolute;
}
</style>
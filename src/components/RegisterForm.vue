<template>
  <div>
    <input
      type="text"
      v-model="telephone"
      placeholder="请输入手机号"
    />
      <input
      type="text"
      v-model="code"
      placeholder="请输入验证码"
    />
    <a class="getCode">获取验证码</a>
    <br>
    <input
      type="text"
      v-model="account"
      placeholder="请输入账号"
    />
    <input
      type="password"
      v-model="password"
      placeholder="请输入密码"
    />
    <input
      type="password"
      v-model="rePassword"
      placeholder="请再次输入密码"
    />
    <br /><br />
    <router-link to="/login">
      <button class="loginBtn">返回登录</button>
    </router-link>

    <button class="registerBtn">注册</button>
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
      rePassword:"",
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
.getCode
{
  text-decoration: underline;

  color: #5593cc;
  font-size: 1.4rem;
  margin-top: 1rem;
  margin-left: -9rem;
  width: 7rem;
  cursor: pointer;
  position: absolute;
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

</style>
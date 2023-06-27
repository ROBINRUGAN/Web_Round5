<template>
  <div>
    <input type="text" v-model="telephone" placeholder="请输入手机号" />
    <br />
    <span v-show="errorPhoneflag" class="errorPhoneMsg"
      >请输入正确的手机号码！</span
    >

    <input type="text" v-model="code" placeholder="请输入验证码" />
    <el-button
            style="width: 14rem; margin-left: -14.5rem; font-size: 1.3rem; margin-top: 0.59rem;position: absolute;"
            :disabled="countdown > 0"
            @click="getCode"
            :loading="countdown > 0"
            v-show="!flag"
            >{{
              countdown > 0 ? `${countdown} 秒后重新获取` : "获取验证码"
            }}
            </el-button>
    <br />
    <span v-show="errorCodeflag" class="errorPhoneMsg">验证码为六位数字！</span>

    <input type="text" v-model="account" placeholder="请输入账号" /> <br />
    <span v-show="errorUsernameflag" class="errorPhoneMsg"
      >用户名不能为空！</span
    >

    <input type="password" v-model="password" placeholder="请输入密码" /> <br />
    <span v-show="errorPasswordflag" class="errorPhoneMsg">密码不能为空！</span>

    <input type="password" v-model="rePassword" placeholder="请再次输入密码" />
    <br />
    <span v-show="errorRePasswordflag" class="errorPhoneMsg"
      >两次密码不一致！</span
    >

    <br /><br />
    <router-link to="/login">
      <button class="loginBtn">返回登录</button>
    </router-link>

    <button class="registerBtn">注册</button>
  </div>
</template>

<script>
import { watch } from "vue";
import { RegisterGetCode } from '@/api/api';
export default {
  data() {
    return {
      telephone: "",
      account: "",
      password: "",
      rePassword: "",
      code: "",
      LoginType: "手机验证码登录",
      flag: false,
      errorPhoneflag: false,
      errorCodeMsg: false,
      errorUsernameflag: false,
      errorPasswordflag: false,
      errorRePasswordflag: false,
      countdown: 0,
    };
  },
  methods: {
    changeLoginWay() {
      this.flag = !this.flag;
      //console.log(this.flag)
    },
    async getCode() {
      if (this.countdown > 0) {
        return;
      }
      if (!/^1[3456789]\d{9}$/.test(this.telephone)) {
        this.errorPhoneflag = true;
        return;
      }
      //TODO：这里就写获取验证码的逻辑
      let registerGetCodeData = {
        type: 'register',
        phone_number: this.telephone,
      };
      RegisterGetCode(registerGetCodeData)
      .then((res) => {
        console.log(res);
        alert(res.data.code);
      })

      this.errorPhoneflag = false;
      this.countdown = 60;
      const timer = setInterval(() => {
        this.countdown--;
        if (this.countdown <= 0) {
          clearInterval(timer);
        }
      }, 1000);
    },
  },
  watch: {
    telephone: {
      immediate: true,
      handler(newValue) {
        if (newValue && !/^1[3456789]\d{9}$/.test(newValue)) {
          this.errorPhoneflag = true;
        } else {
          this.errorPhoneflag = false;
        }
      },
    },
    code: {
      immediate: true,
      handler(newValue) {
        if (newValue && !/^\d{6}$/.test(newValue)) {
          this.errorCodeflag = true;
        } else {
          this.errorCodeflag = false;
        }
      },
    },
    account: {
      immediate: false,
      handler(newValue) {
        if (newValue) {
          this.errorUsernameflag = false;
        } else {
          this.errorUsernameflag = true;
        }
      },
    },
    password: {
      immediate: false,
      handler(newValue) {
        if (newValue) {
          this.errorPasswordflag = false;
        } else {
          this.errorPasswordflag = true;
        }
      },
    },
    rePassword: {
      immediate: true,
      handler(newValue) {
        if (newValue && newValue != this.password) {
          this.errorRePasswordflag = true;
        } else {
          this.errorRePasswordflag = false;
        }
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
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
  border-radius: 0.7rem;
  border-width: 0.01rem;
}
.getCode {
  text-decoration: underline;

  color: #5593cc;
  font-size: 1.4rem;
  margin-top: 1.5rem;
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
  cursor: pointer;
}
button:hover {
  background-color: rgb(142, 196, 254);
}

.loginBtn {
  margin-right: 4rem;
  background-color: #5593cc;
  color: white;
}
.errorPhoneMsg {
  color: rgb(223, 46, 46);
}
.errorCodeMsg {
  color: rgb(223, 46, 46);
}
.errorUsernameMsg {
  color: rgb(223, 46, 46);
}
.errorPasswordMsg {
  color: rgb(223, 46, 46);
}
</style>
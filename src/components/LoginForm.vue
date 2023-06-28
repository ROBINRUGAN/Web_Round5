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
    <br />
    <span v-show="errorPhoneflag & flag" class="errorPhoneMsg"
      >请输入正确的手机号码！</span
    >
    <span v-show="errorUsernameflag & !flag" class="errorUsernameMsg"
      >用户名不能为空！</span
    >
    <br />
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
    <el-button
      style="
        width: 14rem;
        margin-left: 22rem;
        font-size: 1.3rem;
        margin-top: -3.56rem;
        position: absolute;
      "
      :disabled="countdown > 0"
      @click="getCode"
      :loading="countdown > 0"
      v-show="flag"
      >{{ countdown > 0 ? `${countdown} 秒后重新获取` : "获取验证码" }}
    </el-button>

    <span v-show="errorPasswordflag & !flag" class="errorPasswordMsg"
      >密码不能为空！</span
    >
    <span v-show="errorCodeflag & flag" class="errorCodeMsg"
      >验证码为六位数字！</span
    >
    <br />
    <a @click="changeLoginWay()" class="changeLoginWay">{{ LoginType }}</a>
    <br /><br />

    <button class="loginBtn" @click="loginBtn">登录</button>

    <router-link to="/register">
      <button class="registerBtn">注册</button>
    </router-link>
  </div>
</template>

<script>
import {
  LoginByTelephone,
  LoginByUsername,
  LoginGetCode,
  UserInfo,
} from "@/api/api";
import { watch } from "vue";
export default {
  data() {
    return {
      telephone: "",
      account: "",
      password: "",
      code: "",
      LoginType: "手机验证码登录",
      flag: false, //账号密码登录的时候是false，手机号登录的时候是true
      errorPhoneflag: false,
      errorCodeflag: false,
      errorUsernameflag: false,
      errorPasswordflag: false,
      countdown: 0,
    };
  },
  methods: {
    async getCode() {
      if (this.countdown > 0) {
        return;
      }
      if (!/^1[3456789]\d{9}$/.test(this.telephone)) {
        this.errorPhoneflag = true;
        return;
      }
      //TODO：这里就写获取验证码的逻辑
      let loginGetCodeData = {
        type: "login",
        phone_number: this.telephone,
      };
      LoginGetCode(loginGetCodeData).then((res) => {
        console.log(res);
        alert(res.message);
      });

      this.errorPhoneflag = false;
      this.countdown = 60;
      const timer = setInterval(() => {
        this.countdown--;
        if (this.countdown <= 0) {
          clearInterval(timer);
        }
      }, 1000);
    },
    changeLoginWay() {
      this.flag = !this.flag;
      //console.log(this.flag)
    },
    loginBtn() {
      let loginByUsernameData = {
        username: this.account,
        password: this.password,
      };
      let loginByTelephoneData = {
        phone_number: this.telephone,
        code: this.code,
      };
      if (this.flag) {
        //手机号登录
        if (
          this.telephone &&
          this.code &&
          !this.errorCodeflag &&
          !this.errorPhoneflag
        ) {
          LoginByTelephone(loginByTelephoneData)
            .then((res) => {
              console.log(res);

              //处理一下登录逻辑
              if (res.code == 200) {
                alert("登录成功！");
                window.localStorage.setItem("token", res.token);
                this.$router.push("/");
              } else {
                alert("手机号或验证码错误，请重新登录！");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          alert("请输入手机号和验证码！");
        }
      } else {
        //账号密码登录
        if (
          this.account &&
          this.password &&
          !this.errorUsernameflag &&
          !this.errorPasswordflag
        ) {
          LoginByUsername(loginByUsernameData)
            .then((res) => {
              console.log(res);

              //处理一下登录逻辑
              if (res.code == 200) {
                this.$cookies.set("activeNum", "1");
                window.localStorage.setItem("token", res.token);

                //获取用户信息并缓存，提升效率
                UserInfo()
                  .then((userRes) => {
                    console.log(userRes);
                    if (userRes.code == 200) {
                      window.localStorage.setItem(
                        "userInfo",
                        JSON.stringify(userRes.user)
                      );
                      alert("登录成功！");
                      this.$router.push("/");
                    }
                  })
                  .catch((userErr) => {
                    console.log(userErr);
                  });
              } else {
                alert("账号或密码错误，请重新登录！");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          alert("请输入账号和密码！");
        }
      }
    },
  },
  watch: {
    flag: {
      immediate: true,
      handler(newValue) {
        this.LoginType = newValue ? "账号密码登录" : "手机验证码登录";
      },
    },
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
  cursor: pointer;
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
  margin-top: -2.7rem;
  margin-left: 27rem;
  width: 7rem;
  cursor: pointer;
  position: absolute;
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
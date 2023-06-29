<template>
  <div class="form">
    <UploadAvatar />
    <div style="margin-left: 5rem">
      <span>
        用户名：
        <div class="username">{{ username }}</div>
        <el-button type="text" class="modifyUserName" @click="modifyUserName"
          >修改</el-button
        >
      </span>
      <span>
        昵称：
        <div class="nickname">{{ nickname }}</div>
        <el-button type="text" class="modifyNickName" @click="modifyNickName"
          >修改</el-button
        >
      </span>
      <span
        >电话：
        <div class="telephone">{{ phone_number }}</div>
        <get-telephone-dialog class="modifyTelephone" />
      </span>
      <span
        >实名认证：
        <div class="verified">已实名认证</div>
      </span>
      <span
        >身份证号：
        <div class="id">{{ id_card }}</div>
      </span>
      <span
        >真实姓名：
        <div class="name">{{ name }}</div>
      </span>
      <span
        >余额：
        <div class="money">￥{{ money }}</div>
      </span>
      <span
        >帐号状态：
        <div class="status">{{ accountStatus }}</div>
      </span>
    </div>
  </div>
</template>

<script>
import UploadAvatar from "./UploadAvatar.vue";
import GetTelephoneDialog from "./getTelephoneDialog.vue";
import { ModifyUsername, ModifyNickname, UserInfo } from "@/api/api";
export default {
  data() {
    return {
      id_card: "",
      money: "114514.00",
      name: "",
      nickname: "昵称样例",
      phone_number: "",
      profile_photo: "",
      accountStatus: "",
      username: "用户名样例",
    };
  },
  components: {
    GetTelephoneDialog,
    UploadAvatar,
  },
  mounted() {
    const userInfoString = window.localStorage.getItem("userInfo");
    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString);
      this.nickname = userInfo.nickname;
      this.username = userInfo.username;
      this.money = userInfo.money;
      this.id_card = userInfo.id_card;
      this.name = userInfo.name;
      this.phone_number = userInfo.phone_number;
      this.accountStatus = userInfo.status;
    }
  },
  methods: {
    modifyUserName() {
      this.$prompt("请输入用户名", "修改用户名", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^[sS]*.*[^s][sS]*$/,
        inputErrorMessage: "用户名不能为空！",
        cancelButtonClass: "usernameBtn",
        confirmButtonClass: "usernameBtn",
      })
        .then(({ value }) => {
          this.username = value;
          let modifyData = {
            username: this.username,
          };
          ModifyUsername(modifyData).then((res) => {
            alert(res.message);
            if (res.code == 401) {
              this.$router.push("/login");
            }
            //获取用户信息并缓存，提升效率
            UserInfo()
              .then((userRes) => {
                console.log(userRes);
                if (userRes.code == 200) {
                  window.localStorage.setItem(
                    "userInfo",
                    JSON.stringify(userRes.user)
                  );
                } else {
                  alert("登录已过期，请重新登录...");
                  window.localStorage.removeItem("token");
                  window.localStorage.removeItem("userInfo");
                  this.$router.push("/login");
                }
              })
              .catch((userErr) => {
                console.log(userErr);
                alert(userErr.message);
              });
            this.$message({
              type: "success",
              message: "你的新用户名是: " + value,
            });
          });
        })
        .catch(({ value }) => {
          this.username = value;
          this.$message({
            type: "info",
            message: "取消修改用户名",
          });
        });
    },

    modifyNickName() {
      this.$prompt("请输入昵称", "修改昵称", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^[sS]*.*[^s][sS]*$/,
        inputErrorMessage: "昵称不能为空！",
        cancelButtonClass: "nicknameBtn",
        confirmButtonClass: "nicknameBtn",
      })
        .then(({ value }) => {
          this.nickname = value;
          let modifyData = {
            nickname: this.nickname,
          };
          ModifyNickname(modifyData).then((res) => {
            alert(res.message);
            if (res.code == 401) {
              this.$router.push("/login");
            }
            //获取用户信息并缓存，提升效率
            UserInfo()
              .then((userRes) => {
                console.log(userRes);
                if (userRes.code == 200) {
                  window.localStorage.setItem(
                    "userInfo",
                    JSON.stringify(userRes.user)
                  );
                } else {
                  alert("登录已过期，请重新登录...");
                  window.localStorage.removeItem("token");
                  window.localStorage.removeItem("userInfo");
                  this.$router.push("/login");
                }
              })
              .catch((userErr) => {
                console.log(userErr);
                alert(userErr.message);
              });
            this.$message({
              type: "success",
              message: "你的新昵称是: " + value,
            });
          });
        })
        .catch(({ value }) => {
          this.nickname = value;
          this.$message({
            type: "info",
            message: "取消修改昵称",
          });
        });
    },
  },
};
</script>

<style scoped>
.form {
  padding-left: 3rem;
  padding-top: 6rem;
  padding-bottom: 0;
  display: flex;
}
.username {
  font-size: 1.5rem;
  color: black;
}
.nickname {
  font-size: 1.5rem;
  color: black;
}
.telephone {
  font-size: 1.5rem;
  color: black;
}
.verified {
  font-size: 1.5rem;
  color: black;
}
.id {
  font-size: 1.5rem;
  color: black;
}
.name {
  font-size: 1.5rem;
  color: black;
}
.money {
  font-size: 1.5rem;
  color: black;
}

.status {
  font-size: 1.5rem;
  color: black;
}
span {
  display: flex;
  font-size: 1.5rem;
  color: #d06542;

  margin-bottom: 1rem;
}
.modifyUserName {
  margin-top: -0.7rem;
  margin-left: 25rem;
  font-size: 1.5rem;
  color: white;
  background-color: #f29c7f;
  padding: 0.5rem;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  position: absolute;
}
.modifyNickName {
  margin-top: -0.7rem;
  margin-left: 25rem;
  font-size: 1.5rem;
  color: white;
  background-color: #f29c7f;
  padding: 0.5rem;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  position: absolute;
}
.modifyTelephone {
  margin-top: -0.7rem;
  margin-left: 25rem;
  position: absolute;
}
::v-deep .el-button--text {
  color: white;
  background-color: #f29c7f;
}
::v-deep .el-button--text:hover {
  color: white;
  background-color: #f29c7f;
}
::v-deep .el-button--text:focus {
  color: white;
  background-color: #f29c7f;
}
::v-deep .el-button--primary {
  padding: 0.5rem;
  font-size: 1.5rem;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  border: 0;
  color: white;
  background-color: #f29c7f;
}
::v-deep .el-button--primary:hover {
  padding: 0.5rem;
  font-size: 1.5rem;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  color: white;
  background-color: #f29c7f;
}
::v-deep .el-button--primary:focus {
  padding: 0.5rem;
  font-size: 1.5rem;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  color: white;
  background-color: #f29c7f;
}
::v-deep .telephoneBtn {
  padding: 12px 20px;
  font-size: 1.3rem;
}
::v-deep .telephoneBtn:hover {
  padding: 12px 20px;
  font-size: 1.3rem;
}
::v-deep .telephoneBtn:focus {
  padding: 12px 20px;
  font-size: 1.3rem;
}
</style>
<style>
.usernameBtn {
  padding: 12px 20px !important;
  font-size: 1.3rem !important;
}
.usernameBtn:hover {
  padding: 12px 20px !important;
  font-size: 1.3rem !important;
}
.usernameBtn:focus {
  padding: 12px 20px !important;
  font-size: 1.3rem !important;
}
.nicknameBtn {
  padding: 12px 20px !important;
  font-size: 1.3rem !important;
}
.nicknameBtn:hover {
  padding: 12px 20px !important;
  font-size: 1.3rem !important;
}
.nicknameBtn:focus {
  padding: 12px 20px !important;
  font-size: 1.3rem !important;
}

.el-dialog__title {
  color: #d34212 !important;
  font-size: 1.5rem !important;
}
.el-button--primary {
  color: #fff;
  background-color: #f29c7f !important;
  border-color: #f29c7f !important;
}
</style>

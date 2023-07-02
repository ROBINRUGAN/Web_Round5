<template>
  <div>
    <div
      style="margin-left: 5rem; margin-bottom: 2rem"
      class="avatar-wrapper"
      @click="showDialog"
    >
      <img class="avatar" :src="avatarUrl" alt="avatar" />
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <img class="dialog-avatar" :src="avatarUrl" alt="avatar" />
    </el-dialog>
    <el-upload
      action="http://api.mewtopia.cn:5000/users/profile_photo"
      :http-request="uploadImage"
      :show-file-list="false"
      :on-success="handleSuccess"
      :on-error="handleError"
      :headers="headers"
      :before-upload="beforeUpload"
      style="display: flex"
    >
      <el-button type="primary" style="font-size: 1.3rem">修改头像</el-button>
      <div slot="tip" class="upload-tip">
        支持jpg、jpeg、png格式，文件小于2MB
      </div>
    </el-upload>
  </div>
</template>

<script>
import axios from "axios";
import { UserInfo } from "@/api/api";
import { nextTick } from "vue";
export default {
  data() {
    return {
      avatarUrl: "",
      dialogVisible: false,
      headers: {
        Authorization: window.localStorage.getItem("token"),
        "Content-Type": "multipart/form-data",
      },
    };
  },
  mounted() {
    const userInfoString = window.localStorage.getItem("userInfo");
    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString);
      this.avatarUrl = userInfo.profile_photo;
    }
  },
  methods: {
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        this.$message.error("只支持JPG、JPEG、PNG格式的图片");
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传文件大小不能超过2MB");
        return false;
      }
      return true;
    },
    uploadImage(file) {
      console.log("我要输出一下文件");
      console.log(file);
      return axios({
        method: "put",
        url: "http://api.mewtopia.cn:5000/users/profile-photo",
        data: {
          profile_photo: file.file,
        },
        headers: {
          Authorization: window.localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      });
    },
    handleSuccess(response, file, fileList) {
      if (response) {
        UserInfo()
          .then((userRes) => {
            console.log(userRes);
            if (userRes.code == 200) {
              window.localStorage.setItem(
                "userInfo",
                JSON.stringify(userRes.user)
              );
              window.localStorage.setItem("userId", userRes.user.id);
            } else {
              alert("登录已过期，请重新登录...");
              window.localStorage.removeItem("token");
              window.localStorage.removeItem("userInfo");
              window.localStorage.removeItem("userId");

              this.$router.push("/login");
            }
          })
          .catch((userErr) => {
            console.log(userErr);
            alert(userErr.message);
          });
        console.log(response);
        this.avatarUrl = response.data.data.profile_photo;
        console.log(this.avatarUrl);

        //自动刷新捏
        this.$nextTick(() => {
          this.$message.success("修改头像成功，三秒后将自动刷新...");
          const timer = setInterval(() => {
            this.$router.go(0);
          }, 3000);
        });
      }
    },
    handleError(error, file, fileList) {
      this.$message.error("上传失败");
      console.error(error);
    },
    showDialog() {
      this.dialogVisible = true;
    },
  },
};
</script>

<style scoped>
.avatar-wrapper {
  width: 15rem;
  height: 15rem;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
}
.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.dialog-avatar {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  display: block;
}
.upload-tip {
  margin-left: 1rem;
  margin-top: 0.8rem;
  font-size: 1.3rem;
  color: #666;
}
</style>

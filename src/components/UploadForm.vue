<template>
  <div style="display: flex">
    <div style="width: 40rem">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="简介">
          <el-input type="textarea" v-model="form.content"></el-input>
        </el-form-item>

        <el-form-item label="游戏类型">
          <el-radio-group v-model="form.game" style="margin-top: -0.3rem">
            <el-radio label="王者荣耀"></el-radio>
            <el-radio label="英雄联盟"></el-radio>
            <el-radio label="原神"></el-radio>
            <el-radio label="绝地求生"></el-radio>
            <el-radio label="和平精英"></el-radio>
            <el-radio label="崩坏：星穹铁道"></el-radio>
            <el-radio label="第五人格"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="游戏账号">
          <el-input
            v-model="form.account"
            style="margin-top: -1.1rem"
          ></el-input>
        </el-form-item>
        <el-form-item label="游戏密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="参考价格">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit"
            style="
              font-size: 1.7rem;
              width: 13rem;
              margin-top: 2rem;
              margin-left: 7rem;
              background-color: #ed8360;
            "
            >立即发布</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div style="margin-left: 2rem; width: 45rem">
      <el-upload
        action="https://console-mock.apipost.cn/mock/b7ca8ff5-3391-413f-8a97-396bb15dc1f7/users/login/username"
        list-type="picture-card"
        :http-request="uploadImage"
        :auto-upload="true"
        :on-preview="handlePictureCardPreview"
        :on-change="handleChange"
        class="my-upload"
      >
        <i class="el-icon-plus" style="margin-top: 5rem"></i>
      </el-upload>

      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
    </div>
  </div>
</template>
  <script>
import axios from "axios";
import { AddGood } from "@/api/api";
export default {
  data() {
    return {
      form: {
            game: "",
        title: "",
        content: "",
    
        account: "",
        password: "",
        price: null,
        picture: [],
        status: 0,
      },
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  methods: {
    //检查一下图片的格式和大小
    beforeUpload(file) {
      console.log(file);
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
      return axios({
        method: "post",
        //这里使用了聊天室的假mock捏
        url: "https://console-mock.apipost.cn/mock/b7ca8ff5-3391-413f-8a97-396bb15dc1f7/users/login/username",
        data: file,
      });
    },
    onSubmit() {

      console.log(this.form);
      AddGood(this.form)
        .then((res) => {
          console.log(res);
          alert(res.message)
        })
        .catch((err) => {
          console.log(err);
        });
    },

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    handleChange(file, fileList) {
      if (fileList.length > this.form.picture.length) {
        this.form.picture.push(file.raw);
      }
      if (this.form.picture.length >= 9) {
        console.log(this.form.picture);
        const uploadCard = document.querySelector(".el-upload--picture-card");
        uploadCard.style.display = "none";
      } else {
        const uploadCard = document.querySelector(".el-upload--picture-card");
        uploadCard.style.display = "inline-block";
      }
    },
    beforeRemove(file, fileList) {
      this.form.picture.delete(file);
    },
  },
};
</script>
<style scoped>
input {
  font-size: 1.5rem;
}
.my-upload {
  height: 30rem;
}
::v-deep .el-upload--picture-card,
::v-deep .el-upload-list__item {
  width: 200px;
  height: 200px;
  line-height: 110px;
}
::v-deep .el-upload-list--picture-card .el-upload-list__item-actions {
  width: 200px;
  height: 200px;
  line-height: 110px;
}
::v-deep .el-upload-list--picture-card .el-upload-list__item-thumbnail {
  width: 200px;
  height: 200px;
  line-height: 110px;
}
::v-deep .el-upload-list--picture-card .el-upload-list__item {
  width: 200px;
  height: 200px;
  line-height: 110px;
}
</style>

<style>
.el-form-item__label {
  font-size: 1.5rem !important;
  display: block !important;
}

.el-radio__label {
  font-size: 1.4rem !important;
}
.el-input__inner {
  height: 3.3rem !important;
  font-size: 1.4rem !important;
}
.el-textarea__inner {
  height: 10rem;
  font-size: 1.4rem !important;
}
.el-radio-button__inner,
.el-radio-group {
  margin-top: 1rem;
  margin-left: 1rem;
}
</style>

<template>
  <div >
    <div style="margin-left: 5rem; margin-bottom: 2rem;" class="avatar-wrapper" @click="showDialog">
      <img class="avatar" :src="avatarUrl" alt="avatar">
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <img class="dialog-avatar" :src="avatarUrl" alt="avatar">
    </el-dialog>
    <el-upload
    action="https://console-mock.apipost.cn/mock/b7ca8ff5-3391-413f-8a97-396bb15dc1f7/mock/b7ca8ff5-3391-413f-8a97-396bb15dc1f7/mock/b7ca8ff5-3391-413f-8a97-396bb15dc1f7/users/profile_photo"
:http-request="uploadImage"
      :show-file-list="false"
      :on-success="handleSuccess"
      :on-error="handleError"
      :headers="headers"
      :before-upload="beforeUpload"
      style="display:flex"
    >
      <el-button type="primary" style="font-size: 1.3rem; ">修改头像</el-button>
      <div slot="tip" class="upload-tip">支持jpg、jpeg、png格式，文件小于2MB</div>
    </el-upload>
  </div>
</template>

<script>

import axios from 'axios';
export default {
  data() {
    return {
      avatarUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F34fc045e-0952-4cb8-861c-6f9936449ec6%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1685639440&t=7d108f015d0ed608cd996984fffcb1ff',
      dialogVisible: false,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }
  },
  methods: {
    beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        this.$message.error('只支持JPG、JPEG、PNG格式的图片')
        return false
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过2MB')
        return false
      }
      return true
    },
    uploadImage(file) {
  return axios({
    method: 'put',
    url: 'https://console-mock.apipost.cn/mock/b7ca8ff5-3391-413f-8a97-396bb15dc1f7/mock/b7ca8ff5-3391-413f-8a97-396bb15dc1f7/mock/b7ca8ff5-3391-413f-8a97-396bb15dc1f7/mock/b7ca8ff5-3391-413f-8a97-396bb15dc1f7/mock/b7ca8ff5-3391-413f-8a97-396bb15dc1f7/mock/b7ca8ff5-3391-413f-8a97-396bb15dc1f7/users/profile_photo',
    data: file
  });
},
    handleSuccess(response, file, fileList) {
      console.log(file)
      this.avatarUrl = response.data.data.url
    },
    handleError(error, file, fileList) {
      this.$message.error('上传失败')
      console.error(error)
    },
    showDialog() {
      this.dialogVisible = true
    }
  }
}
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
  margin-top:  0.8rem;
  font-size: 1.3rem;
  color: #666;
}
</style>

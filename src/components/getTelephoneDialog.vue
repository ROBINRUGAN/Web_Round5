<template>
  <div>
    <el-button type="primary" @click="showDialog">修改</el-button>
    <el-dialog
      :visible.sync="dialogVisible"
      title="修改手机号"
      width="40rem"
      style="margin-top: 10rem"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="140px"
        style="font-size: 1rem"
      >
        <el-form-item label="新手机号" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input
            v-model="form.code"
            style="width: 14rem; display: inline-block"
          ></el-input>
          <el-button
            style="width: 14rem; margin-left: 2%; font-size: 1.3rem"
            :disabled="countdown > 0 || isCodeDisabled || form.phone === ''"
            @click="getCode"
            :loading="countdown > 0"
            >{{
              countdown > 0 ? `${countdown} 秒后重新获取` : "获取验证码"
            }}
            </el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelForm" style="font-size: 1.3rem"
          >取消</el-button
        >
        <el-button type="primary" @click="submitForm" class="telephoneBtn"
          >确定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
  
  <script >
export default {
  data() {
    return {
      isCodeDisabled: false,
      form: {
        phone: "",
        code: "",
      },
      rules: {
        phone: [
          { required: true, message: "请输入新手机号码", trigger: "blur" },
          {
            pattern: /^1[3|4|5|6|7|8|9]\d{9}$/,
            message: "请输入正确的手机号码",
            trigger: "blur",
          },
        ],
        code: [
          { required: true, message: "请输入手机验证码", trigger: "blur" },
          {
            pattern: /^\d{6}$/,
            message: "请输入6位数字的验证码",
            trigger: "blur",
          },
        ],
      },
      dialogVisible: false,
      countdown: 0,
    };
  },
  watch: {
    "form.phone"(val) {
      if (val && !/^1[3456789]\d{9}$/.test(val)) {
        this.isCodeDisabled = true;
      } else {
        this.isCodeDisabled = false;
      }
    },
  },
  methods: {
    showDialog() {
      this.dialogVisible = true;
    },
    getCode() {
      // TODO: 发送验证码的逻辑
      this.countdown = 60;
      const timer = setInterval(() => {
        if (this.countdown === 0) {
          clearInterval(timer);
        } else {
          this.countdown--;
        }
      }, 1000);
    },
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.dialogVisible = false;
          // TODO: 提交表单的逻辑
          this.$message.success("手机号修改成功！");
          this.form.code = "";
          this.form.phone = "";
        }
      });
    },
    cancelForm() {
      this.dialogVisible = false;
      this.form.code = "";
      this.form.phone = "";
      this.$message.info("取消修改");
    },
  },
};
</script>
  
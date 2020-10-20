<template>
  <div class="login-page">
    <video
      src="@/assets/video/bg_video.d2d602a9.mp4"
      loop
      autoplay="autoplay"
      muted
    ></video>
    <div id="imgs"></div>
    <div class="loginContainer">
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        label-width="100px"
        class="demo-loginForm"
      >
        <h1 class="title">学员管理系统</h1>
        <el-form-item label="用户名" prop="username">
          <el-input
            type="text"
            v-model="loginForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
//登陆逻辑的实现
//1.收集用户输入的username&password传递给后端

//2.登入通过，将后端返回的token存到本地

//3.每次请求时候，携带token到请求头

//4.展示token校验正确的数据

//5.校验不通过，跳转登录页

import { login } from "@/api";
export default {
  data() {
    //jsDoc
    /**
     * @params {Object} rule 就是一个表单验证对象
     * @params {String} value 输入值
     * @params {Function} callback 校验成功传参 不通过不传参
     */
    var validateUsername = (rule, value, callback) => {
      var uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
      //   if (!uPattern.test(value)) {
      if (!value) {
        callback("请输入4~16位");
      } else {
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {//代表本地校验通过
          // 打开登陆加载动画
          const loading = this.$loading({
            lock: true,
            text: "正在登入...",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
          let { username, password } = this.loginForm;
          //发送登入请求
          login(username, password)
            .then((res) => {
              //服务器响应，关闭loading
              loading.close();
              if (res.data.state) {
                this.$message.success("登入成功")
                //代表用户名密码正确
                localStorage.setItem("stu-token", res.data.token);
                //跳转到主页
                this.$router.push("/");
              } else {
                //用户名密码错误
                this.$message.error("用户名密码错误");
              }
            })
            .catch((err) => {
              console.log(1);
              console.log(err);
            });
        } else {
          //代表本地校验不通过
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style scoped>
.login-page {
  width: 100%;
  height: 100%;
  position: relative;
}
.loginContainer {
  width: 400px;
  height: 488px;
  text-align: center;
  position: absolute;
  right: 5%;
  top: 60px;
  border-radius: 11px;
  text-align: center;
  background: rgba(0, 0, 0, 0.2);
}
/* 背景设置 */
video {
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: -100;
  object-fit: contain;
}
#imgs {
  position: absolute;
  left: 15%;
  bottom: 15%;
  width: 50%;
  height: 50%;
  background: url("../../assets/imgs/bg2.png") 0 0 / contain no-repeat;
}
/* 表单样式 */
.el-form {
  width: 400px;
  color: #fff;
}
/* 表单输入框样式 */
.el-input__inner {
  transition: all 0.5s;
  height: 40px;
  line-height: 100%;
  overflow: hidden;
  color: #fff;
  background-color: transparent;
  border: 0px;
}
.el-input {
  margin-left: -50px;
  width: 250px;
}
.el-form-item__label {
  color: #606266 !important;
  color: #fff !important;
}
/* 表单按钮样式 */
.el-button {
  width: 250px;
  margin-left: -50px;
  background: linear-gradient(90deg, #1596fb, #002dff);
}
.title {
  color: #fff;
  margin-top: 100px;
  margin-bottom: 50px;
}
</style>

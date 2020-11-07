<template>
  <div class="login-page">
    <video
      src="@/assets/video/bg_video.mp4"
      loop
      autoplay="autoplay"
      muted
    ></video>
    <div id="imgs"></div>
    <div class="loginContainer">
      <h1 class="title">学员管理系统</h1>
      <transition>
        <el-form
          :model="loginForm"
          :rules="rules"
          ref="loginForm"
          label-width="100px"
          class="demo-loginForm"
        >
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
              @keydown.13.native="submitForm('loginForm')"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <!-- 验证码 -->
          <el-form-item label="验证码" prop="captcha">
            <el-input
              class="captcha"
              type="text"
              v-model="loginForm.captcha"
              @keydown.13.native="submitForm('loginForm')"
              autocomplete="off"
            ></el-input>
            <span
              class="captcha-svg"
              @click="refreshCaptch"
              v-html="captchaSvg"
            ></span>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')"
              >提交</el-button
            >
          </el-form-item>
        </el-form>
      </transition>
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

import { login, getCpatcha, verifyCaptcha } from "@/api";
import { mapMutations } from "vuex";
export default {
  data() {
    //jsDoc
    /**
     * @params {Object} rule 就是一个表单验证对象
     * @params {String} value 输入值
     * @params {Function} callback 校验成功传参 不通过不传参
     */
    //校验用户名
    var validateUsername = (rule, value, callback) => {
      var uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
      //   if (!uPattern.test(value)) {
      if (!value) {
        callback("请输入4~16位");
      } else {
        callback();
      }
    };
    //校验密码
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    //校验验证码
    var validateCaptcha = (rule, value, callback) => {
      if (value === "" || value.length !== 5) {
        callback(new Error("请输入验证码"));
      } else {
        callback();
      }
    };
    return {
      captchaSvg: "", //从服务器获取的验证码
      loginForm: {
        username: "",
        password: "",
        captcha: ""
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        captcha: [{ validator: validateCaptcha, trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.set_captcha();
  },
  methods: {
    //刷新验证码
    refreshCaptch() {
      this.set_captcha();
    },
    //设置验证码
    set_captcha() {
      getCpatcha().then(res => {
        this.captchaSvg = res.data.img;
      });
    },
    ...mapMutations(["SET_USERINFO"]),
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          //代表本地校验通过
          //先验证验证码是否正确在发送登录请求
          let verify = await verifyCaptcha(this.loginForm.captcha);
          if (!verify.data.state) {
            //验证码不正确
            this.$message.error("验证码错误");
            return;
          }
          // 打开登陆加载动画
          const loading = this.$loading({
            lock: true,
            text: "正在登入...",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
          let { username, password } = this.loginForm;
          //发送登入请求
          login(username, password)
            .then(res => {
              console.log(res);
              //服务器响应，关闭loading
              loading.close();
              if (res.data.state) {
                this.$message.success("登入成功");
                //代表用户名密码正确
                localStorage.setItem("stu-token", res.data.token);
                localStorage.setItem(
                  "stu-userInfo",
                  JSON.stringify(res.data.userInfo)
                );
                localStorage.setItem(
                  "wf-permission-buttons",
                  JSON.stringify(res.data.permission.buttons)
                );
                //跳转到主页
                this.$router.push("/");
                this.loginForm.username = "";
                this.loginForm.password = "";
                this.SET_USERINFO(res.data.userInfo);
                //更改vuex中state['userInfo]的值
              } else {
                //用户名密码错误
                this.$message.error("用户名密码错误");
              }
            })
            .catch(err => {
              console.log(err, "err");
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
    }
  }
};
</script>
<style scoped>
i.icon-saomachenggong {
  font-size: 50px;
  color: #26c28f;
  line-height: 200px;
}
.scancode {
  position: relative;
  height: 220px;
}
.v-enter,
.v-leave-to {
  opacity: 0;
}
.v-enter-to,
.v-leave {
  opacity: 1;
}
.v-enter-active,
.v-leave-active {
  transition: all 2s;
}
.login-page {
  width: 100%;
  height: 100%;
  background: url("../../assets/imgs/bg.jpg");
  overflow: hidden;
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
.jiaobiao {
  width: 80px;
  height: 80px;
  overflow: hidden;
  position: absolute;
  right: -1px;
  top: -2px;
  font-size: 50px;
  text-align: right;
  color: #e2e2e2;
  cursor: pointer;
}
.wechatLogin {
  width: 100%;
  text-align: center;
  position: absolute;
  color: #fff;
}
.wechatLogin .marsk {
  position: absolute;
  width: 200px;
  height: 200px;
  left: 25%;
  z-index: 1;
  background-color: rgba(255, 255, 255, 0.9);
}
.wechatLogin img {
  position: absolute;
  left: 25%;
}
.wechatLogin p {
  text-align: center;
}
.title {
  color: #fff;
  margin-top: 100px;
  margin-bottom: 50px;
}
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
.left {
  width: 50%;
  height: 100%;
  background-image: url("../../assets/imgs/bg2.png");
  background-repeat: no-repeat;
  background-size: 50%;
  position: absolute;
  opacity: 0.7;
  background-position: 60% 65%;
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
  width: 250px;
  position: relative;
  float: left;
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
/* 验证码 */
.captcha-svg {
  display: block;
  float: left;
  height: 40px;
  margin-left: 16px;
  width: 120px !important;
  overflow: hidden;
  background: #fff;
  position: relative;
  border-radius: 3px;
  cursor: pointer;
}
.captcha-svg svg {
  width: 136px !important;
}
</style>

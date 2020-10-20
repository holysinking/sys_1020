<template>
  <div class="home-page">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <subMenu></subMenu>
      </el-aside>
      <el-container>
        <el-header>
          <!-- 顶部栏 -->
          <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="6">
              <div class="grid-content">
                图标
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light">
                学生管理系统
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <div id="logo-img">
                  <img src="" alt="" />
                </div>
                <span>欢迎您:</span>
                <b class="nickname">{{ userInfo.nickname }}</b>
                <span class="quit" @click="quit">退出</span>
              </div>
            </el-col>
          </el-row>
        </el-header>
        <el-main>
          <!-- 主体 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { getLoginLog } from "@/api";
import subMenu from "@/components/subMenu";
import { mapState } from "vuex";
export default {
  data() {
    return {
      isCollapse: true,
    };
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  methods: {
    quit() {
      //退出登录
      //1.清除token和userInfo
      //2.跳转到登入页面
      localStorage.removeItem("stu-token")
      localStorage.removeItem("stu-userInfo")
      this.$router.push("/login")
    },
  },
  components: {
    subMenu,
  },
  mounted() {
    getLoginLog().then((res) => {
      console.log(res);
    });
  },
};
</script>
<style>
.quit {
  cursor: pointer;
  color: hotpink;
}
/* 顶栏布局 */
.grid-content {
  border-radius: 4px;
  height: 60px;
}
.row-bg {
  background: linear-gradient(135deg, #4c67ff, #5635df);
}

/* container样式 */
.el-header {
  color: #fff;
  line-height: 60px;
  background: linear-gradient(135deg, #4c67ff, #5635df);
}
.el-aside {
  /* width: 64px !important; */
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.bg-purple-light {
  text-align: center;
}
.el-col {
  width: 30%;
}
.el-col:nth-of-type(1) .grid-content {
  text-align: left;
}
.el-col:nth-of-type(3) .grid-content {
  text-align: right;
}
/* 顶部导航栏图片 */
#logo-img {
  display: inline-block;
  background: #c0c4cc;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  vertical-align: middle;
  margin-right: 10px;
}
</style>

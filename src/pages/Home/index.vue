<template>
  <div class="home-page">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <el-menu
          default-active="1-4-1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse">

          <el-menu-item index="0">
            <i class="el-icon-menu"></i>
            <span slot="title">管理首页</span>
          </el-menu-item>
          
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">学员管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">考勤管理</span>
          </el-menu-item>

          <el-menu-item index="3">
            <i class="el-icon-menu"></i>
            <span slot="title">数据统计</span>
          </el-menu-item>

          <el-menu-item index="4">
            <i class="el-icon-menu"></i>
            <span slot="title">我的中心</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <!-- 顶部栏 -->
          <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="1">
              <div class="grid-content bg-purple">
                <el-radio-group
                  v-model="isCollapse"
                  style="margin-bottom: 20px;"
                >
                  <el-radio-button
                    v-if="flag"
                    :label="false"
                    v-on:click="checkButton"
                  >
                    <i class="el-icon-s-fold"></i>
                  </el-radio-button>
                  <el-radio-button v-if="!flag" :label="true"
                    >收起</el-radio-button
                  >
                </el-radio-group>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light">
                学生管理系统
              </div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple">
                <div id="logo-img">
                  <img src="" alt="" />
                </div>
                <span>欢迎您:管理员</span>
                <span>退出</span>
              </div>
            </el-col>
          </el-row>
        </el-header>
        <el-main>
          <!-- 主体 -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<style>
#logo-img {
  border-radius: 50%;
  width: 35px;
  height: 35px;
  /* background: black; */
  display: inline-block;
}
.el-menu-item-group__title{
  padding: 0;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-row {
}
.el-aside {
  /* width: 64px !important; */
}
.el-header {
  padding: 0;
  height: 60px !important;
  color: #fff;
  text-align: center;
  background: linear-gradient(135deg, #4c67ff, #5635df);
}
.el-col {
  border-radius: 4px;
  background: transparent;
}
.el-col-1 {
  width: 5%;
}
.el-col-3 {
  width: 25%;
  float: right;
}
.el-col-6 {
  width: 45%;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: none;
  position: relative;
  text-align: right;
}
.bg-purple span {
}
.bg-purple-light {
  background: none;
  height: 60px;
  line-height: 60px;
}
.grid-content {
  border-radius: 4px;
  line-height: 60px;
  height: 60px;
}
.row-bg {
  position: relative;
  background-color: none;
}
</style>

<script>
export default {
  data() {
    return {
      flag: true,
      isCollapse: true,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    checkButton() {
      this.flag = !flag;
      console.log(1);
    },
  },
};
</script>

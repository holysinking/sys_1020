<template>
  <div class="subMenu">
    <h1 class="logo">
      神圣学院
    </h1>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
    >
      <!-- 常规菜单 -->
      <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <span slot="title">管理首页</span>
      </el-menu-item>
      <!-- 具有子菜单 -->
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span slot="title">学员管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/product">项目管理</el-menu-item>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <!-- 常规菜单 -->
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">考勤管理</span>
      </el-menu-item>
      <!-- 常规菜单 -->
      <el-menu-item index="3">
        <i class="el-icon-menu"></i>
        <span slot="title">数据统计</span>
      </el-menu-item>
      <!-- 常规菜单 -->
      <el-menu-item index="4">
        <i class="el-icon-menu"></i>
        <span slot="title">我的中心</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isCollapse: false,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
<style>
.subMenu{
  width: 200px;
  overflow: hidden;
}
.logo {
  text-align: center;
  height: 60px;
  line-height: 60px;
  color: #fff;
  background: linear-gradient(135deg, #4c67ff, #5635df);
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: 50%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>

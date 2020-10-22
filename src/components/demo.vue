<template>
  <div class="subMenu">
    <h1 class="logo"></h1>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      router="true"
      :collapse="isCollapse"
    >
      <!-- 顶栏背景 -->
      <el-menu-item index="/">
        <i class="el-icon-s-shop el-icon-fontSize" style="color:red"></i>
        <span slot="title">管理首页</span>
      </el-menu-item>
      <!-- 具有子菜单 -->
      <el-submenu index="/StudentManager">
        <template slot="title">
          <i class="el-icon-s-custom el-icon-fontSize" style="color:blue"></i>
          <span slot="title">学员管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/StudentManager/studentProduct">
            <i
              class="el-icon-c-scale-to-original el-icon-fontSize"
              style="color:blue"
            ></i>
            <span slot="title">学员项目管理</span>
          </el-menu-item>
          <el-menu-item index="/StudentManager/studentProfile">
            <i class="el-icon-tickets el-icon-fontSize" style="color:blue"></i>
            <span slot="title">学员资料</span>
          </el-menu-item>
          <el-menu-item index="/StudentManager/studentDormitory">
            <i
              class="el-icon-s-platform el-icon-fontSize"
              style="color:blue"
            ></i>
            <span slot="title">学院宿舍</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <!-- 常规菜单 -->
      <el-menu-item index="/Attendance">
        <i class="el-icon-thumb el-icon-fontSize" style="color:blue"></i>
        <span slot="title">考勤管理</span>
      </el-menu-item>
      <!-- 常规菜单 -->
      <el-menu-item index="/Statistics">
        <i class="el-icon-s-marketing el-icon-fontSize" style="color:blue"></i>
        <span slot="title">数据统计</span>
      </el-menu-item>
      <!-- 常规菜单 -->
      <el-menu-item index="/Mine">
        <i class="el-icon-s-comment el-icon-fontSize" style="color:blue"></i>
        <span slot="title">我的中心</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: "sub-menu",//给组件取名字之后 可以递归
  props:{
    sideMenu: {
      type: Array,
      default: ()=>[] //定义默认数据
    },
    isCollapse
  },
  data() {
    return {
      // isCollapse: false,
    };
  },
  methods: {
    jumpRoute(name){
      this.router.push({name})
    }
  },
  mounted () {
    console.log(this.sideMenu);
  }
};
</script>
<style scoped>
.subMenu {
  overflow: hidden;
}
.logo {
  width: 100%;
  height: 60px;
  background-image: linear-gradient(135deg, #4c67ff, #5635df);
  background: #5635df url("../assets/imgs/logo.be8bbddf.png") no-repeat 50%/80%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu-item-group__title {
  padding: 0;
  line-height: normal;
  font-size: 12px;
  color: #909399;
}
.el-icon-fontSize {
  font-size: 25px;
}
span {
  /* color: blue; */
}
.el-icon-s-shop + span:nth-of-type(1) {
  color: red;
}
</style>

<template>
  <div class="subMenu">
    <div v-for="item in sideMenu">
      <!-- 具有子菜单 -->
      <el-submenu index="1" v-if="item.children && item.children.length > 0">
        <template slot="title">
          <i :class="item.meta.icon"></i>
          <span slot="title">{{ item.meta.name }}</span>
        </template>
        <el-menu-item-group>
          <sub-menu :sideMenu="item.children"></sub-menu>
        </el-menu-item-group>
      </el-submenu>
      <!-- 常规菜单 -->
      <el-menu-item :index="item.path" @click="jump(item.name)" v-else>
        <i :class="item.meta.icon"></i>
        <span slot="title">{{ item.meta.name }}</span>
      </el-menu-item>
    </div>
  </div>
</template>
<script>
export default {
  name: "sub-menu", //给组件取名字之后 可以递归
  props: {
    sideMenu: {
      type: Array,
      default: () => [] //定义默认数据
    }
  },
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {
    jump(name) {
      this.$router.push({ name });
    }
  },
  mounted() {
    // console.log(this.sideMenu);
  }
};
</script>
<style scoped>
.subMenu {
  overflow: hidden;
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

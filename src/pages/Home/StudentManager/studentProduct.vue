<template>
  <div>
    <div class="product">
      <!-- 搜索框 -->
      <div class="search">
        <el-select
          v-model="searchValue"
          filterable
          clearable
          remote
          @blur="searchBlur"
          @change="searchTextChange"
          reserve-keyword
          @clear="clear"
          :remote-method="remoteMethod"
          :loading="loading"
          placeholder="请输入关键字"
        >
          <el-option
            v-for="item in searchList"
            :key="item.sId"
            :label="item.name"
            :value="item.name"
          >
          </el-option>
        </el-select>
        <!-- 搜索按钮 -->
        <el-button type="primary" icon="el-icon-search" plain></el-button>
        <!-- 添加按钮 -->
        <el-button type="primary" @click="addStudent">添加项目</el-button>
      </div>
      <!-- 班级选择 -->
      <div class="select-class">
        <!-- 框框 -->
        <el-form>
          <el-form-item label="选择班级:">
            <el-select
              v-model="classes"
              filterable
              @visible-change="classVisible"
              @change="classChange"
              placeholder="请选择"
            >
              <el-option label="全部" value="all"></el-option>
              <el-option
                v-for="(item, index) in classOptions"
                :key="index"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <!-- 导出excel -->
      <div class="exportExcel">
        <el-button icon="iconfont icon-excel" @click="exportExcel"
          >导出excel数据</el-button
        >
      </div>
      <!-- 表格 -->
      <div class="stu-table">
        <el-table
          :data="stuData"
          border
          style="width: 100%"
          v-loading="loading"
        >
          <el-table-column
            prop="headimgurl"
            label="头像"
            width="80"
            align="center"
          >
            <template scope="scope">
              <img :src="scope.row.headimgurl" width="70" alt="" />
            </template>
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="180" align="center">
          </el-table-column>
          <el-table-column prop="class" label="班级" align="center">
          </el-table-column>
          <el-table-column prop="productUrl" label="项目地址" align="center">
          </el-table-column>
          <el-table-column prop="" label="操作" align="center">
            <template scope="scope">
              <el-button
                type="primary"
                class="btn"
                icon="el-icon-view"
                @click="$router.push({ name: 'studentProfile' })"
                >查看</el-button
              >
              <el-button
                type="primary"
                class="btn"
                icon="el-icon-edit"
                @click="editStudent(scope.row)"
                >编辑</el-button
              >
              <el-button
                type="danger"
                class="btn"
                icon="el-icon-delete"
                @click="delStudent(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页器 -->
      <div class="pagination">
        <el-pagination
          background
          hide-on-single-page
          layout="prev, pager, next"
          @current-change="changePage"
          :page-size="dataCount"
          :total="total"
        >
        </el-pagination>
      </div>
      <!-- dialog弹出框 -->
      <stu-dialog></stu-dialog>
    </div>
  </div>
</template>
<script>
import dialog from "../../../components/dialog";
import { addStuDetail, getStuList, getClasses, delStu, searchStu } from "@/api";
export default {
  data() {
    return {
      params: {
        class: "",
        count: 5,
      },
      dataPage: "", // 页码
      dataCount: 5, // 每页展示的数量
      total: 0, // 总共的数据条数
      classOptions: [],
      disabled: false,
      // 表格的数据对象
      blurSearchValue: "",
      list: [],
      stuData: [
        {
          headimgurl: 123,
          name: 123,
          class: 123,
          productUrl: 123,
        },
      ],
      //表格加载动画控制
      loading: false,
      searchList: [],
      classes: "",
      searchValue: "",
    };
  },
  methods: {
    // 分页器页码发生改变的时候触发的事件
    changePage(page) {
      this.dataPage = page;
      // 点击分页切换的时候 需要判断是否搜索了 如果搜索了 那么就应该在搜索结果中 进入第后面页码数据
      if (this.searchValue) {
        this.searchButton();
        return;
      }
      this.updateStuTable(this.params);
    },
    // 导出excel
    exportExcel() {
      const titleList = [
        {
          title: "头像",
          key: "headimgurl",
        },
        {
          title: "姓名",
          key: "name",
        },
        {
          title: "班级",
          key: "class",
        },
        {
          title: "项目",
          key: "productUrl",
        },
      ];
      const dataSource = this.stuData;
      qee(titleList, dataSource, "学员数据");
    },
    // 班级选择框展开/收起触发的事件
    classVisible(isVisible) {
      if (!isVisible) return;
      // 充值dataPage的值 以免后天查询不到
      this.dataPage = 1;
      // 发送获取班级的请求
      getClasses().then((res) => {
        if (res.data && res.data.state) {
          this.classOptions = res.data.data;
        }
      });
    },
    // 选择班级
    classChange(query) {
      const count = this.dataCount;
      this.params = query === "all" ? { count } : { class: query, count };
      this.updateStuTable(this.params);
    },
    searchButton() {
      // 点击搜索按钮
      this.loading = true;
      const key = this.searchValue;
      const count = this.dataCount;
      const page = this.dataPage;
      const params = {
        key,
        count,
        page,
      };
      searchStu(params).then((res) => {
        if (res.data && res.data.state) {
          // 更改表格数据对象
          this.stuData = res.data.data;
          this.total = res.data.total; // 对total分页总数进行更改
          this.loading = false;
        } else {
          this.$message.warning("搜索失败");
        }
      });
    },
    // 搜索框失去焦点 保持输入框的内容
    searchBlur() {
      // 将存储好的输入框值 设置给select组件
      this.searchValue = this.blurSearchValue;
    },
    //更新表格数据
    updateStuTable(params) {
      this.loading = true;
      params = this.params
      params.count = this.dataCount || ''
      params.page = this.dataPage || ''
      getStuList(params)
        .then((res) => {
          if (res.data && res.data.state) {
            this.stuData = res.data.data;
            this.total = res.data.total// 数据总数
            this.loading = false;
          } else {
            this.$message.warning("数据获取失败");
            this.loading = false;
          }
        })
        .catch((err) => {
          this.$message.error("网络错误或者数据获取失败");
          this.loading = false;
        });
    },
    //添加学生
    addStudent() {
      //弹出dialog
      this.$bus.$emit("showDialog");
    },
    //编辑学员
    editStudent(row) {
      //弹出dialog
      this.$bus.$emit("editStuEvent", row);
      //数据回显
      //更改提交
    },
    //删除学生
    delStudent(row) {
      if (row && row.sId) {
        //调用删除请求
        //提示用户是否删除
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then((res) => {
            delStu(row.sId)
              .then((res) => {
                if (res.data && res.data.state) {
                  this.$message.success("删除成功");
                  this.updateStuTable();
                } else {
                  this.$message.warning("删除失败");
                }
              })
              .catch((err) => {
                this.$message.error("删除出错");
              });
          })
          .catch((err) => {
            this.$message.info("已取消删除");
          });
      } else {
        //没有row
        this.$message.error("没有传入row对象");
      }
    },
    // 搜索框选中值发生变化的事件
    searchTextChange(searchText) {
      this.loading = true;
      // console.log(searchText)
      // 再次调用搜索接口
      const key = this.searchValue;
      const count = this.dataCount;
      const params = {
        key,
        count,
      };
      searchStu(params).then((res) => {
        if (res.data && res.data.state) {
          console.log(res.data.data);
          // 更改表格数据对象
          this.stuData = res.data.data;
          this.total = res.data.total; // 对total分页总数进行更改
          this.loading = false;
        } else {
          this.$message.warning("搜索失败");
        }
      });
    },
    clear(e) {},
    remoteMethod(query) {
      // 键盘弹起的时候获取输入值 赋值三方变量进行输入框内容存储
      this.blurSearchValue = query;
      const key = query;
      const count = this.dataCount;
      const params = {
        key,
        count,
      };
      searchStu(params)
        .then((res) => {
          if (res.data && res.data.state) {
            console.log(res.data.data);
            this.searchList = res.data.data;
          } else {
            this.$message.warning("搜索失败");
          }
        })
        .catch((err) => {
          this.$message.error("搜索出错");
        });
    },
    //班级选择框展开/收起触发的事件
    classVisible(isVisible) {
      if (!isVisible) {
        return;
      }
      //发送获取班级的请求
      getClasses().then((res) => {
        if (res.data && res.data.state) {
          // console.log(res);
        }
      });
    },
    //选择班级
    classChange(query) {
      // console.log(query);
    },
  },
  mounted() {
    //页面加载获取表格数据
    this.updateStuTable(this.params);
    this.$bus.$on("updateStuTable", () => {
      this.updateStuTable(this.params);
    });
  },
  components: {
    "stu-dialog": dialog,
  },
};
</script>
<style scoped>
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  /* line-height: 160px; */
}
.search {
  line-height: 60px;
  text-align: left;
  margin: 20px 0;
}
.select-class {
  line-height: 40px;
  text-align: left;
  margin-bottom: 20px;
}
.stu-table .btn {
  width: 65px;
  height: 25px;
  padding: 0;
  text-align: center;
}
.pagination {
  margin-top: 20px;
}
</style>

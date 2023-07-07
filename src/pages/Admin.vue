<template>
  <div>
    <div class="header">
      <NavMenu class="navMenu" />
      <hello class="hello" />
    </div>
    <div class="root">
      <!-- 背景图片 -->
      <div class="background">
        <img
          src="../assets/homeImage/homeBackground.png"
          width="100%"
          height="100%"
        />
      </div>
      <!-- 消息按钮 -->
      <router-link to="/message">
        <button class="message" @click="onMessageBtn"></button>
      </router-link>

      <!-- 搜索框 -->
      <div class="searchbox">
        <input class="search" type="text" />
        <img src="../assets/homeImage/搜索.png" class="searchbtn" />
      </div>

      <!-- 一个底部的挡板，使商品描述更清楚 -->
      <img
        src="../assets/homeImage/背景@2x(1).png"
        style="
          position: absolute;
          z-index: -1;
          width: 105.5rem;
          height: 39.46rem;
          margin-top: 5rem;
        "
      />
      <div class="order-list">
        <div class="search-form">
          <el-form :inline="true" :model="searchForm" style="display: flex">
            <el-form-item label="时间筛选" style="display: flex">
              <el-date-picker
                v-model="searchForm.dateRange"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="{
                  shortcuts: [
                    {
                      text: '最近一周',
                      onClick: () => {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        this.searchForm.dateRange = [start, end];
                      },
                    },
                    {
                      text: '最近一个月',
                      onClick: () => {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        this.searchForm.dateRange = [start, end];
                      },
                    },
                  ],
                }"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="搜索" style="display: flex">
              <el-input
                v-model="searchForm.keyword"
                placeholder="请输入商品名称或编号"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                icon="el-icon-search"
                @click="handleSearch"
                >搜索</el-button
              >
              <el-button @click="handleReset" icon="el-icon-refresh-left"
                >重置</el-button
              >
            </el-form-item>
          </el-form>
        </div>
        <div class="order-menu">
          <el-tabs v-model="activeTab" @tab-click="handleTabClick">
            <el-tab-pane label="全部" name="all"></el-tab-pane>
            <el-tab-pane label="所有未审核" name="unknown"></el-tab-pane>
            <el-tab-pane label="审核已通过" name="success"></el-tab-pane>
            <el-tab-pane label="审核不通过" name="fail"></el-tab-pane>
          </el-tabs>
        </div>
        <div class="order-table">
          <el-table :data="pagedOrders" @row-click="mewww" style="width: 100%">
            <el-table-column prop="title" label="商品名称"></el-table-column>
            <el-table-column prop="id" label="商品编号"></el-table-column>
            <el-table-column prop="price" label="价格"></el-table-column>
            <el-table-column prop="add_time" label="上架时间"></el-table-column>
            <el-table-column prop="result" label="商品状态"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="mini"
                  v-if="scope.row.status === 0"
                  @click.native.stop="pass(scope.row)"
                >
                  通过
                </el-button>
                <el-button
                  type="primary"
                  size="mini"
                  v-if="scope.row.status === 0"
                  @click.native.stop="fail(scope.row)"
                >
                  驳回
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            v-if="pageCount > 1"
            :total="filteredOrders.length"
            :page-size="pageSize"
            :current-page="currentPage"
            @current-change="handlePageChange"
            style="
              height: 70px;
              display: flex;
              justify-content: flex-end;
              align-items: center;
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavMenu from "../components/NavMenu.vue";
import Hello from "../components/Hello.vue";
import router from "@/router";
import {
  AdminGetGood,
  AdminPocessGood,
  GetSellerOrder,
  ProcessOrder,
} from "@/api/api";
export default {
  data() {
    return {
      searchForm: {
        dateRange: [],
        keyword: "",
      },
      activeTab: "all",
      orders: [],
      pageSize: 5, // 每页显示的订单数量
      currentPage: 1, // 当前页码
    };
  },
  components: {
    NavMenu,
    Hello,
  },
  mounted() {
    AdminGetGood().then((res) => {
      this.orders = res.data;
      this.orders.forEach((order) => {
        if (order.status === 0) order.result = "你未确认";
        if (order.status === 1 || order.status === 3) order.result = "你已通过";
        if (order.status === -1 || order.status === 2)
          order.result = "你已拒绝";
      });
    });
  },
  computed: {
    filteredOrders() {
      const filterFn = ({ status }) => {
        switch (this.activeTab) {
          case "success":
            return status === 1 || status === 3;
          case "fail":
            return status === -1 || status === 2;
          case "unknown":
            return status === 0;
          default:
            return true;
        }
      };
      const searchFn = ({ title, id }) => {
        const { keyword } = this.searchForm;
        if (keyword) {
          return title.includes(keyword) || id.includes(keyword);
        }
        return true;
      };
      const dateFn = ({ add_time }) => {
        const [start, end] = this.searchForm.dateRange;
        if (start && end) {
          const startTime = start.getTime();
          const endTime = end.getTime() + 24 * 3600 * 1000; // 时间范围包含最后一天
          const orderTime = new Date(add_time).getTime();
          return orderTime >= startTime && orderTime <= endTime;
        }
        return true;
      };
      return this.orders.filter(filterFn).filter(searchFn).filter(dateFn);
    },
    pageCount() {
      return Math.ceil(this.filteredOrders.length / this.pageSize);
    },
    pagedOrders() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.filteredOrders.slice(startIndex, endIndex);
    },
  },
  methods: {
    onMessageBtn() {
      this.$cookies.set("activeNum", "0");
    },
    pass(row) {
      let data = {
        status: 1,
        id: row.id,
      };
      AdminPocessGood(data).then((res) => {
        console.log(res);
        alert(res.msg);
        //自动刷新捏
        this.$nextTick(() => {
          this.$message.success("审核成功，三秒后将自动刷新...");
          const timer = setInterval(() => {
            this.$router.go(0);
          }, 3000);
        });
      });
    },
    fail(row) {
      let data = {
        status: -1,
        id: row.id,
      };
      AdminPocessGood(data).then((res) => {
        alert(res.msg);
        //自动刷新捏
        this.$nextTick(() => {
          this.$message.success("审核成功，三秒后将自动刷新...");
          const timer = setInterval(() => {
            this.$router.go(0);
          }, 3000);
        });
      });
    },
    mewww(row) {
      alert("准备进入" + row.title + "的详情页");
      router.push({ path: "/detail", query: { id: row.id } });
    },
    handleSearch() {
      // 执行搜索
    },
    handleReset() {
      this.searchForm.dateRange = [];
      this.searchForm.keyword = "";
    },
    handleTabClick(tab) {
      this.activeTab = tab.name;
    },
    handlePageChange(page) {
      this.currentPage = page;
    },
  },
};
</script>

<style scoped>
.background {
  left: 0;
  top: 0;
  width: 106.5rem;
  height: 56.96rem;
  z-index: -1;
  position: absolute;
}

.message {
  height: 3.2rem;
  margin-top: 3.5rem;
  margin-left: 96.55rem;
  padding-left: 2rem;
  padding-right: 3.87rem;
  font-size: 1.7rem;
  border-radius: 1.5rem;
  border-width: 0;
  background: url(../assets/homeImage/组\ 1.png);
}
button:hover {
  opacity: 92%;
  cursor: pointer;
}
.search {
  width: 25rem;
  border-radius: 2rem;
  font-size: 1.7rem;
  padding: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
}
.searchbox {
  width: fit-content;
  margin-left: 65rem;
  margin-top: -4.5rem;
  display: flex;
}
.searchbtn {
  position: absolute;
  margin-top: 0.4rem;
  margin-left: 23.5rem;
}
.searchbtn:hover {
  cursor: pointer;
}
::v-deep * {
  font-size: 1.2rem;
}
.order-list {
  padding-left: 3rem;
  padding-right: 3rem;
}
.search-form {
  width: 80rem;

  margin-left: 15rem;
  margin-top: 7rem;
}
::v-deep .el-tabs__item {
  font-size: 1.5rem;
}

::v-deep .el-input__inner {
  height: 3rem !important;
  font-size: 1.4rem !important;
}
::v-deep .el-date-editor .el-range-input {
  font-size: 1.4rem !important;
}
::v-deep .el-date-editor .el-range-separator {
  margin-top: 0.5rem;
  font-size: 1.4rem !important;
}
::v-deep .el-table th.el-table__cell {
  background-color: rgb(252, 246, 233);
}
::v-deep .el-table--enable-row-transition .el-table__body td.el-table__cell {
  background-color: rgb(252, 246, 233);
  cursor: pointer;
}
.order-menu {
  display: flex;
  justify-content: center;
}
</style>

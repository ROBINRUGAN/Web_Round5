<template>
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
          <el-button type="primary" icon="el-icon-search" @click="handleSearch"
            >搜索</el-button
          >
          <el-button @click="handleReset" icon="el-icon-refresh-left"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </div>

    <div class="order-table">
      <el-table :data="pagedOrders" style="width: 100%"  @row-click="mewww">
        <el-table-column prop="name" label="商品名称"></el-table-column>
        <el-table-column prop="id" label="商品编号"></el-table-column>
        <el-table-column prop="price" label="价格"></el-table-column>
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
</template>
    <script>
    import router from '@/router';

export default {
  data() {
    return {
      searchForm: {
        dateRange: [],
        keyword: "",
      },
      activeTab: "all",
      orders: [
        {
          name: "商品1",
          id: "123456",
          price: 99,
          time: "2022-01-01",
          result: "未付款",
        },
        {
          name: "商品2",
          id: "234567",
          price: 199,
          time: "2022-01-02",
          result: "未确认",
        },
        {
          name: "商品3",
          id: "345678",
          price: 299,
          time: "2022-01-03",
          result: "已通过",
        },
        {
          name: "商品4",
          id: "456789",
          price: 399,
          time: "2022-01-04",
          result: "已拒绝",
        },
        {
          name: "商品5",
          id: "567890",
          price: 499,
          time: "2022-01-05",
          result: "已通过",
        },
        {
          name: "商品6",
          id: "123456",
          price: 99,
          time: "2022-01-01",
          result: "未确认",
        },
        {
          name: "商品7",
          id: "234567",
          price: 199,
          time: "2022-01-02",
          result: "未确认",
        },
        {
          name: "商品8",
          id: "345678",
          price: 299,
          time: "2022-01-03",
          result: "未付款",
        },
        {
          name: "商品9",
          id: "456789",
          price: 399,
          time: "2022-01-04",
          result: "已拒绝",
        },
        {
          name: "商品10",
          id: "567890",
          price: 499,
          time: "2022-01-05",
          result: "已通过",
        },
      ],
      pageSize: 5, // 每页显示的订单数量
      currentPage: 1, // 当前页码
    };
  },
  computed: {
    filteredOrders() {
      const filterFn = ({ result }) => {
        switch (this.activeTab) {
          default:
            return true;
        }
      };
      const searchFn = ({ name, id }) => {
        const { keyword } = this.searchForm;
        if (keyword) {
          return name.includes(keyword) || id.includes(keyword);
        }
        return true;
      };
      const dateFn = ({ time }) => {
        const [start, end] = this.searchForm.dateRange;
        if (start && end) {
          const startTime = start.getTime();
          const endTime = end.getTime() + 24 * 3600 * 1000; // 时间范围包含最后一天
          const orderTime = new Date(time).getTime();
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
    mewww(row) {
      alert("准备进入"+row.name+"的详情页");
      router.push({ path: '/detail/'+row.id });
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
::v-deep * {
  font-size: 1.2rem;
}
.order-list {
  padding-left: 3rem;
  padding-right: 3rem;
}
.search-form {
  width: 80rem;

  margin-left: -2.5rem;
  padding-top: 4rem;
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
  background-color: rgb(252, 246, 233) ;
}
::v-deep .el-table--enable-row-transition .el-table__body td.el-table__cell {
  background-color: rgb(252, 246, 233) ;
  cursor: pointer;
}

</style>

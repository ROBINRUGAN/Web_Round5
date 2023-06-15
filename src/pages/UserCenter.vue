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
          src="../assets/userCenterImage/新建组.png"
          width="100%"
          height="100%"
        />
      </div>
      <!-- 消息按钮 -->
      <button class="message"></button>
      <!-- 左边的导航栏 -->
      <div class="leftRec">
        <br /><br />

        <!-- 个人中心功能块 -->
        <span style="display: flex">
          <img src="../assets/userCenterImage/个人中心(1).png" alt="" />
          个人中心
        </span>

        <router-link
          to="/userCenter/myInfo"
          class="leftRecText"
          style="margin-bottom: 3rem; margin-top: 1rem"
          active-class="active"
          >个人信息</router-link
        >
        <!-- 买家中心功能块 -->
        <span style="display: flex">
          <img
            src="../assets/userCenterImage/买家中心(1).png"
            style="margin-top: -0.3rem"
            alt=""
          />
          买家中心
        </span>

        <router-link
          to="/userCenter/buyOrder"
          class="leftRecText"
          style="margin-top: 1rem"
          active-class="active"
          >已购买订单</router-link
        >

        <router-link
          to="/userCenter/starredGoods"
          class="leftRecText"
          active-class="active"
          >已收藏商品</router-link
        >

        <router-link
          to="/userCenter/buyerBidOrder"
          class="leftRecText"
          style="margin-bottom: 4rem"
          active-class="active"
          >已出价订单</router-link
        >
        <!-- 卖家中心功能块 -->
        <span style="display: flex">
          <img
            src="../assets/userCenterImage/卖家中心(1).png"
            style="margin-top: -0.3rem"
            alt=""
          />
          卖家中心
        </span>
        <router-link
          to="/userCenter/soldGoods"
          class="leftRecText"
          style="margin-top: 1rem"
          active-class="active"
          >已出售订单</router-link
        >

        <router-link
          to="/userCenter/sellerBidOrder"
          class="leftRecText"
          active-class="active"
          >买家的出价</router-link
        >

        <router-link
          to="/userCenter/notSoldGoods"
          class="leftRecText"
          active-class="active"
          >未出售商品</router-link
        >

        <router-link
          to="/userCenter/notPassGoods"
          class="leftRecText"
          active-class="active"
          >未通过商品</router-link
        >
      </div>
      <!-- 上面的用户基本信息展示矩形 -->
      <div class="upRec">
        <big-user-photo class="avatar" />
        <div>
          <div class="username">用户名：{{ username }}</div>
          <div class="nickname">昵称：{{nickname}}</div>
        </div>
        <div>
          <div class="balance">余额：￥{{money}}</div>
          <el-button class="topup" @click="topup">充值</el-button>
          <el-button class="withdraw" @click="withdraw">提现</el-button>
        </div>
      </div>

      <div class="rightRec">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
  
  <script>
import NavMenu from "../components/NavMenu.vue";
import Hello from "../components/Hello.vue";
import BigUserPhoto from "../components/BigUserPhoto.vue";
export default {
  components: {
    NavMenu,
    Hello,
    BigUserPhoto,
  },
  data() {
    return {
      id_card: "",
      money: "114514.00",
      name: "",
      nickname: "昵称样例",
      phone_number: "",
      profile_photo: "",
      accountStatus: "",
      username: "用户名样例",
    };
  },
  methods: {
    topup() {
      this.$prompt("请输入充值金额", "充值mew币", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        confirmButtonClass: "topUpButton",
        inputPattern: /^(?:\d{1,8})(?:\.\d{1,2})?$/,
        inputErrorMessage:
          "金额数额过大或者格式不正确，形如233、114.1或者122.45",
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "充值成功，你充值的金额是: " + value,
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "充值已取消！",
          });
        });
    },
    withdraw() {
      this.$prompt("请输入提现金额", "提现mew币", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        confirmButtonClass: "withdrawButton",
        inputPattern: /^(?:\d{1,8})(?:\.\d{1,2})?$/,
        inputErrorMessage:
          "金额数额过大或者格式不正确，形如233、114.1或者122.45",
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "提现成功！你提现的金额是: " + value,
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "提现已取消",
          });
        });
    },
  },
  mounted() {
    const userInfoString = window.localStorage.getItem("userInfo");
    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString);
      this.nickname = userInfo.nickname;
      this.username = userInfo.username;
      this.money = userInfo.money;
    }
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

.leftRec {
  margin-left: 10rem;
  background: url(../assets/userCenterImage/矩形\ 2.png);
  width: 10rem;
  height: 40rem;
  margin-top: -3rem;
  font-size: 1.5rem;
}
.upRec {
  margin-left: 21rem;
  background: url(../assets/userCenterImage/矩形\ 3.png);
  width: 70rem;
  height: 10rem;
  margin-top: -40rem;
  font-size: 2rem;
  display: flex;
}
.rightRec {
  margin-left: 21rem;
  background: url(../assets/userCenterImage/矩形\ 4.png);
  width: 70rem;
  height: 36rem;
  margin-top: 1rem;
}
.leftRecText {
  text-decoration: none;
  margin-bottom: 0.8rem;
  color: #747373;
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
}
.active {
  color: #d06542;
  font-size: 1.4rem;
  font-weight: bold;
}
.username {
  margin-top: 2.5rem;
}
.avatar {
  margin-top: 1rem;
  margin-left: 2rem;
  margin-right: 2rem;
}
.nickname {
  margin-top: 1rem;
}
.balance {
  font-size: 3rem;
  color: red;
  margin-left: 7rem;
  margin-top: 2rem;
}

button:hover {
  opacity: 92%;
  cursor: pointer;
}
.el-button:hover {
  background-color: #f29c7f;
  color: rgb(255, 255, 255);
  text-align: center;
}
.el-button:focus {
  background-color: #f29c7f;
  color: rgb(255, 255, 255);
  text-align: center;
}
.topup {
  padding: 0.6rem;
  margin-left: 20rem;
  margin-top: 1rem;
  width: 5rem;
  border-width: 0;
  font-size: 1.2rem;
  background: #f29c7f;
  color: rgb(255, 255, 255);
}
.withdraw {
  padding: 0.6rem;
  margin-left: 1rem;
  margin-top: 1rem;
  width: 5rem;
  border-width: 0;
  background: #f29c7f;
  font-size: 1.2rem;
  color: rgb(255, 255, 255);
}
</style>
  
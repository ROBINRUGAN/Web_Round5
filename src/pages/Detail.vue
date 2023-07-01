<template>
  <div>
    <div class="header">
      <NavMenu class="navMenu" />
      <hello class="hello" />
    </div>
    <div class="root">
      <!-- 背景图片 -->
      <div class="background">
        <img src="../assets/detailImage/加长版背景.jpg" width="100%" />
      </div>

      <!-- 消息按钮 -->
      <router-link to="/message">
        <button class="messageBtn"></button>
      </router-link>

      <!-- 一个底部的挡板，使商品描述更清楚 -->
      <img
        src="../assets/detailImage/背景.png"
        style="
          z-index: -1;
          width: 100.5rem;
          height: 25rem;
          margin-top: 15rem;
          margin-left: 2rem;
          opacity: 70%;
          left: 0;
          top: 0;
          position: absolute;
        "
      />
      <!-- 轮播图 -->
      <el-carousel
        effect="fade"
        indicator-position="none"
        trigger="click"
        style="
          width: 35rem;
          height: 24rem;
          margin-left: 4rem;
          margin-top: 5.5rem;
        "
        height="22rem"
      >
        <el-carousel-item v-for="(item, index) in goodPhotos" :key="index">
          <!-- 商品的各个图片 -->

          <img
            :src="item"
            alt=""
            style="
              width: 35rem;
              height: 22rem;
              max-height: fit-content;
              max-width: fit-content;
              position: relative;
              border-radius: 1rem;
              z-index: 0;
            "
          />
        </el-carousel-item>
      </el-carousel>

      <!-- 上方的文字提示，长得像按钮 -->
      <div
        style="
          border-radius: 1rem;
          padding: 0.65rem;
          width: 6rem;
          font-size: 1.5rem;
          color: white;
          background-color: #5593cc;
          display: flex;
          margin-left: 41rem;
          margin-top: -24rem;
          margin-bottom: 1.2rem;
          position: relative;
        "
      >
        游戏账号
      </div>

      <div class="likeNumber">
        <img src="../assets/detailImage/火.png" style="margin-right: 0.5rem" />
        有{{ likeNumber }}人已收藏
      </div>

      <!-- 商品的一些信息 -->
      <div class="goodsForm">
        <span style="width: fit-content; display: flex">
          售价：
          <div class="price">￥{{ goodsPrice }}</div>
        </span>
        <br />
        <span style="width: fit-content; display: flex; margin-top: 0.8rem">
          商品编号：
          <div>{{ goodsNumber }}</div>
        </span>
        <br />
        <span style="width: fit-content; display: flex; margin-top: 1rem">
          服务保障：
          <div
            class="light"
            :style="{
              'background-color': isChange ? 'rgb(0,255,0)' : 'rgb(255,0,0)',
            }"
            style="margin-left: 0rem"
          ></div>
          <div>已投保</div>
          <div
            class="light"
            :style="{
              'background-color': isChange ? 'rgb(0,255,0)' : 'rgb(255,0,0)',
            }"
          ></div>
          <div>已实名认证</div>
          <div
            class="light"
            :style="{
              'background-color': isChange ? 'rgb(0,255,0)' : 'rgb(255,0,0)',
            }"
          ></div>
          <div>平台保障</div>
        </span>

        <div class="seller">
          <img
            :src="seller_profile_photo"
            alt=""
            style="width: 50px; height: 50px; border-radius: 50%"
          />
          <div style="padding: 12px">{{ seller_nickname }}</div>
        </div>
      </div>
      <!-- 购买按钮 -->
      <div style="display: inline-flex; width: ">
        <button class="buybtn" @click="buybtn" v-show="!isMyself">
          立即购买
        </button>
        <button class="addbtn" @click="addbtn" v-show="!isMyself">
          加入心愿单
        </button>
      </div>

      <!-- 上架时间 -->
      <span
        style="
          width: fit-content;
          display: flex;
          width: 25rem;
          font-size: 1.5rem;
          margin-left: 77rem;
        "
      >
        上架时间：
        <div class="goodsTime">{{ goodsTime }}</div>
      </span>

      <!-- 一个底部的挡板，使商品描述更清楚 -->
      <img
        src="../assets/detailImage/背景.png"
        style="
          z-index: -1;
          width: 100.5rem;
          height: 41.46rem;
          margin-top: 41rem;
          margin-left: 2rem;
          opacity: 70%;
          left: 0;
          top: 0;
          position: absolute;
        "
      />
      <!-- 商品描述 -->
      <div
        style="
          font-size: 3rem;
          color: #fe9e9a;
          text-decoration: underline;
          margin-top: 8rem;
          margin-left: 3rem;
        "
      >
        商品详情
      </div>
      <!-- 两个长得像按钮的东西 -->

      <div style="display: inline-flex">
        <img
          src="../assets/homeImage/标题.png"
          alt=""
          class="label"
          style="margin-left: 3rem"
        />
        <div class="title">{{ title }}</div>
      </div>
      <br />

      <div style="display: inline-flex">
        <img
          src="../assets/homeImage/简要标题.png"
          alt=""
          class="label"
          style="margin-left: 3rem"
        />
        <div class="content">
          {{ content }}
        </div>
      </div>
    </div>

    <div class="chat-wrapper">
      <div class="chat-button" @click="toggleChat" ref="chatroom">
        <span class="chat-icon"></span>
      </div>
      <transition name="slide">
        <div class="chat-box" v-if="showChat">
          <div class="chat-header">
            <h3>MewChat</h3>
            <button class="close-button" @click="toggleChat">关闭</button>
          </div>
          <div class="message-list" id="chat-container">
            <div
              class="message"
              v-for="(message, index) in messages"
              :key="index"
              :class="[
                message.author === 'Me'
                  ? 'me'
                  : message.author === 'Other'
                  ? 'other'
                  : 'system',
              ]"
            >
              <div
                :class="[
                  message.author === 'Me'
                    ? 'message-bubble-blue'
                    : message.author === 'Other'
                    ? 'message-bubble-white'
                    : 'message-bubble-system',
                ]"
              >
                <span class="message-text">{{ message.message }}</span>
              </div>
            </div>
          </div>
          <div class="input-box">
            <input
              type="text"
              v-model="newMessage"
              @keyup.enter="sendMessage"
              placeholder="输入消息..."
            />
            <button @click="sendMessage">发送</button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
  
  <script>
import NavMenu from "../components/NavMenu.vue";
import Hello from "../components/Hello.vue";
import Vue from "vue";
import { BidOrder, ChatHistory, DetailInfo, Like,ReadMessage } from "@/api/api";
export default {
  data() {
    return {
      showChat: false,
      messages: [],
      newMessage: "",
      nextMessageId: 1,
      tempMessage: "",
      isChange: true, //是否已经实名认证
      goodsPrice: null,
      goodsNumber: "",
      goodsTime: "",
      likeNumber: null,
      title: "",
      content: "",
      seller_nickname: "",
      seller_id: "",
      seller_profile_photo: "",
      goodPhotos: null,
      isMyself: false,
    };
  },

  components: {
    NavMenu,
    Hello,
  },
  mounted() {
    console.log("精度确认" + this.$route.query.id);
    DetailInfo(this.$route.query.id).then((res) => {
      console.log(res.data);
      this.isChange = true;
      this.goodsPrice = res.data.price;
      this.goodsNumber = res.data.id;
      this.goodsTime = res.data.add_time;
      this.likeNumber = res.data.view;
      this.title = res.data.title;
      this.content = res.data.content;
      this.seller_id = res.data.seller_id;
      this.seller_nickname = res.data.seller_nickname;
      this.seller_profile_photo = res.data.seller_profile_photo;
      this.goodPhotos = res.data.picture_url.split(",");

      // 获取要删除的元素的引用
      const chatroom = this.$refs.chatroom;
      // 检查元素是否存在
      if (
        chatroom &&
        window.localStorage.getItem("userId") === this.seller_id
      ) {
        // 通过父节点调用 removeChild 方法删除元素
        chatroom.parentNode.removeChild(chatroom);
        this.isMyself = true;
      }

      ChatHistory(res.data.seller_id).then((chatRes) => {
        console.log(chatRes);
        if (chatRes.data) {
          this.messages = chatRes.data;
          this.messages.forEach((message) => {
            if (message.send_id === window.localStorage.getItem("userId"))
              message.author = "Me";
            else {
              message.author = "Other";
            }
          });
        }
      });
      this.$socket.open(); // 开始连接socket
    });
  },
  methods: {
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$el.querySelector("#chat-container");
        container.scrollTop = container.scrollHeight;
      });
    },
    toggleChat() {
      this.showChat = !this.showChat;

      this.sockets.listener.subscribe("response", (msg) => {
        this.tempMessage = msg;
        console.log("我要接受未读消息了！");
        if (this.tempMessage.send_id === window.localStorage.getItem("userId"))
          this.tempMessage.author = "Me";
        else {
          this.tempMessage.author = "Other";
        }
        if (this.tempMessage.code === 1 || this.tempMessage.send_id === 6)
          this.tempMessage.author = "System";
        this.messages.push(this.tempMessage);
        if (this.showChat == true) {
          this.scrollToBottom(); // 滚动到底部
          //这里将收到的消息设置为已读
          //还得是别人发过来的消息，不然我自己发的消息也会被设置为已读
          if (this.tempMessage.send_id === this.seller_id) {
            let readMessageData = {
              send_id: this.tempMessage.send_id,
              message_id: this.tempMessage.message_id,
            };
            ReadMessage(readMessageData).then((res) => {
              console.log(res);
            });
          }
        }
      });
      this.scrollToBottom(); // 滚动到底部
    },
    sendMessage() {
      if (this.newMessage.trim() !== "") {
        this.messages.push({
          author: "Me",
          message: this.newMessage,
        });

        let sendData = {
          type: 0,
          receive_id: this.seller_id,
          message: this.newMessage,
        };
        this.$socket.send(JSON.stringify(sendData));
        this.scrollToBottom(); // 滚动到底部
        this.newMessage = "";
      }
    },
    buybtn() {
      this.$prompt("请在下面输入你想出价的金额", "发起出价", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^(?:\d{1,8})(?:\.\d{1,2})?$/,
        inputErrorMessage:
          "金额数额过大或者格式不正确，形如233、114.1或者122.45",
        cancelButtonClass: "nicknameBtn",
        confirmButtonClass: "nicknameBtn",
      })
        .then(({ value }) => {
          let orderData = {
            good_id: this.$route.query.id,
            money: value,
          };
          BidOrder(orderData)
            .then((res) => {
              alert(res.msg);
              console.log(res);
              this.$message({
                type: "success",
                message: "出价成功，等待商家处理: " + value,
              });
            })
            .catch((res) => {
              alert(res.msg);
            });
        })
        .catch(({ value }) => {
          this.$message({
            type: "info",
            message: "取消出价",
          });
        });
    },
    addbtn() {
      let data = {
        good_id: this.goodsNumber,
      };
      Like(data).then((res) => {
        console.log(res);
      });
      this.$message({
        message: "收藏成功",
        type: "success",
      });
    },
  },
};
</script>
  
  <style scoped>
.background {
  left: 0;
  top: 0;
  padding: 0;
  margin: 0;
  width: 106.5rem;
  height: 56.96rem;
  z-index: -1;
  line-height: 0;
  position: absolute;
}

.messageBtn {
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
.goodsForm {
  height: 9rem;
  width: 59rem;
  margin-left: 40rem;
  margin-right: 0;
  z-index: 3;
  font-size: 1.3rem;
  background-color: #f8c596;
  padding: 1rem;
  padding-top: 2rem;
  border-radius: 1rem;
}
.price {
  color: #ff0000;
  font-size: 3rem;
  margin-top: -1rem;
}
.light {
  margin-left: 1rem;
  margin-top: 0.2rem;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
}
.buybtn {
  width: 10rem;
  height: 3.5rem;
  border-radius: 1rem;
  background-color: #ff8400;
  color: white;
  font-size: 2rem;
  margin-left: 42rem;
  margin-top: 1rem;
  border-width: 0;
  position: absolute;
}
.buybtn:hover {
  background-color: #ff9523;
  cursor: pointer;
}
.addbtn {
  width: 12rem;
  height: 3.5rem;
  border-radius: 1rem;
  background-color: #ff8400;
  color: white;
  font-size: 2rem;
  margin-left: 55rem;
  margin-top: 1rem;
  border-width: 0;
  position: absolute;
}
.addbtn:hover {
  background-color: #ff9523;
  cursor: pointer;
}
.likeNumber {
  width: 29rem;
  margin-left: 70rem;
  margin-top: -3rem;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  display: flex;
  justify-content: flex-end;
}
.seller {
  display: flex;
  margin-left: 50rem;
  margin-top: -10rem;
}
.label {
  height: 2.7rem;
  margin-top: 1rem;
}
.title {
  width: 90rem;
  margin-left: 1rem;
  font-size: 2.5rem;
  margin-top: 1.1rem;
}
.content {
  width: 85rem;
  margin-left: 1rem;
  font-size: 1.5rem;
  margin-top: 1.1rem;
  display: block;
}
.chat-wrapper {
  position: fixed;
  bottom: 20px;
  right: 20px;
  border-radius: 100px;
  z-index: 9999;
}

.chat-button {
  width: 50px;
  height: 50px;
  background-color: #007bff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.chat-icon {
  width: 30px;
  height: 30px;
  background-color: #fff;
  border-radius: 50%;
  display: block;
}

.chat-box {
  position: absolute;
  bottom: 70px;
  right: 0;
  width: 30rem;
  height: 40rem;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
}

.chat-header {
  padding-left: 10px;
  padding-right: 10px;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.close-button {
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  font-size: 1rem;
  border-radius: 10px;
  cursor: pointer;
}

.message-list {
  height: 30rem;
  max-height: 30rem;
  overflow-y: auto;
  padding: 10px;
}

.message {
  margin-bottom: 5px;
}

.input-box {
  margin-top: 1.5rem;
  padding: 10px;
  padding-top: 0;
  display: flex;
  align-items: center;
}

.input-box input {
  flex: 1;
  padding: 8px;
  font-size: 1.1rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-right: 5px;
}

.input-box button {
  padding: 6px 10px;
  background-color: #007bff;
  font-size: 1.1rem;
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}
.message.me {
  text-align: right;
}
.message.system {
  text-align: center;
}
.message.other {
  text-align: left;
}

.message-bubble-blue {
  display: inline-block;
  background-color: #007bff;
  color: #fff;
  border-radius: 10px;
  padding: 8px 12px;
  max-width: 70%;
}

.message-bubble-white {
  display: inline-block;
  background-color: #dedede;
  color: #000000;
  border-radius: 10px;
  padding: 8px 12px;
  max-width: 70%;
}
.message-bubble-system {
  display: inline-block;
  background-color: #bfe5a6;
  color: #000000;
  border-radius: 10px;
  padding: 8px 12px;
  width: 90%;
}

.message-author {
  font-weight: bold;
}

.message-text {
  margin-top: 5px;
  word-break: break-all;
}
</style>
  
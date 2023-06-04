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
        src="../assets/detailImage/加长版背景.jpg"
        width="100%"
      />
    </div>

    <!-- 消息按钮 -->
    <button class="messageBtn"></button>
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
      style="width: 35rem; height: 24rem; margin-left: 4rem; margin-top: 5.5rem"
      height="22rem"
    >
      <el-carousel-item v-for="item in 4" :key="item">
        <!-- 商品的各个图片 -->

        <img
          src="../assets/homeImage/已插入图像.png"
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
    </div>
    <!-- 购买按钮 -->
    <div style="display: inline-flex; width: ">
      <button class="buybtn">立即购买</button>
      <button class="addbtn">加入心愿单</button>
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
        margin-top: 4rem;
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
      <div class="title">{{title}}</div>
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
    <div class="chat-button" @click="toggleChat">
      <span class="chat-icon"></span>
    </div>
    <transition name="slide">
      <div class="chat-box" v-if="showChat">
        <div class="chat-header">
          <h3>MewChat</h3>
          <button class="close-button" @click="toggleChat">关闭</button>
        </div>
        <div class="message-list">
          <div class="message" v-for="message in messages" :key="message.id" :class="[message.author === 'Me' ? 'me' : 'other']">
            <div :class="[message.author === 'Me' ? 'message-bubble-blue' : 'message-bubble-white']">
              <span class="message-text">{{ message.text }}</span>
            </div>
          </div>
        </div>
        <div class="input-box">
          <input type="text" v-model="newMessage" @keyup.enter="sendMessage" placeholder="输入消息..." />
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
export default {
  data() {
    return {
      showChat: false,
      messages: [
        {
          id: 0,
          author:"Other",
          text:"你好",
        },
        {
          id: 0,
          author:"Me",
          text:"你好",
        }
      ],
      newMessage: '',
      nextMessageId: 1,

      isChange: true,
      goodsPrice: 310.03,
      goodsNumber: "121145143456789",
      goodsTime: "2023-05-01 12:00:00",
      likeNumber: 114514,
      title: "这是标题样例",
      content:
        "这是一条简要介绍，欢迎光临MewStore!!!!!ヾ(≧▽≦*)o\
        这是一条简要介绍，欢迎光临MewStore!!!!!ヾ(≧▽≦*)o\
        这是一条简要介绍，欢迎光临MewStore!!!!!ヾ(≧▽≦*)o\
        这是一条简要介绍，欢迎光临MewStore!!!!!ヾ(≧▽≦*)o\
        这是一条简要介绍，欢迎光临MewStore!!!!!ヾ(≧▽≦*)o\
        这是一条简要介绍，欢迎光临MewStore!!!!!ヾ(≧▽≦*)o\
        这是一条简要介绍，欢迎光临MewStore!!!!!ヾ(≧▽≦*)o\
        这是一条简要介绍，欢迎光临MewStore!!!!!ヾ(≧▽≦*)o\
        这是一条简要介绍，欢迎光临MewStore!!!!!ヾ(≧▽≦*)o\
        这是一条简要介绍，欢迎光临MewStore!!!!!ヾ(≧▽≦*)o\
        这是一条简要介绍，欢迎光临MewStore!!!!!ヾ(≧▽≦*)o\
        这是一条简要介绍，欢迎光临MewStore!!!!!ヾ(≧▽≦*)o\
        这是一条简要介绍，欢迎光临MewStore!!!!!ヾ(≧▽≦*)o\
        这是一条简要介绍，欢迎光临MewStore!!!!!ヾ(≧▽≦*)o\
        这是一条简要介绍，欢迎光临MewStore!!!!!ヾ(≧▽≦*)o\
        这是一条简要介绍，欢迎光临MewStore!!!!!ヾ(≧▽≦*)o\
        这是一条简要介绍，欢迎光临MewStore!!!!!ヾ(≧▽≦*)o\
        这是一条简要介绍，欢迎光临MewStore!!!!!ヾ(≧▽≦*)o\
        这是一条简要介绍，欢迎光临MewStore!!!!!ヾ(≧▽≦*)o\
        这是一条简要介绍，欢迎光临MewStore!!!!!ヾ(≧▽≦*)o\
        这是一条简要介绍，欢迎光临MewStore!!!!!ヾ(≧▽≦*)o\
        这是一条简要介绍，欢迎光临MewStore!!!!!ヾ(≧▽≦*)o",
    };
  },

  components: {
    NavMenu,
    Hello,
  },
  methods: {
    comein(id) {
      alert("进入商品详情页" + id);
    },
    toggleChat() {
      this.showChat = !this.showChat;
    },
    sendMessage() {
      if (this.newMessage.trim() !== '') {
        this.messages.push({
          id: this.nextMessageId++,
          author: 'Me',
          text: this.newMessage
        });
        this.newMessage = '';
      }
    }
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
  margin-left: 3rem;
  margin-top: 1rem;
  border-width: 0;
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

.message-author {
  font-weight: bold;
}

.message-text {
  margin-top: 5px;
}

</style>
  
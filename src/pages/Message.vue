<template>
  <div>
    <div class="header">
      <NavMenu class="navMenu" />
      <hello class="hello" />
    </div>
    <!-- 背景图片 -->
    <div class="background">
      <img src="../assets/userCenterImage/新建组.png" width="100%" height="100%" />
    </div>
        <!-- 消息按钮 -->
        <button class="messageBtn"></button>
    <div class="inbox-wrapper">
      <!-- 旁边的聊天列表 -->
      <div class="sidebar">
        <h2 style="color: #ff8400;">收信箱</h2>
        <div class="chat-list">
          <div
            class="chat-item"
            v-for="chat in chats"
            :key="chat.id"
            @click="selectChat(chat)"
          >
            <!-- 头像 -->
            <div class="chat-avatar">
              <img :src="chat.avatar" alt="Avatar" />
            </div>
            <!-- 对方的名字、时间、最近一条消息 -->
            <div class="chat-details">
              <div class="chat-info">
                <h3>{{ chat.name }}</h3>
                <span class="chat-timestamp">{{ chat.timestamp }}</span>
              </div>
              <div class="chat-message">
                <span>{{ chat.lastMessage }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="chat-room" v-if="selectedChat">
        <div class="chat-header">
          <h2>{{ selectedChat.name }}</h2>
        </div>
        <div class="message-list">
          <div
            class="message"
            v-for="message in selectedChat.messages"
            :key="message.id"
            :class="[message.fromMe ? 'from-me' : 'from-other']"
          >
            <div :class="[message.fromMe ? 'message-bubble-blue' : 'message-bubble-white']">
              <span>{{ message.text }}</span>
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
    </div>
  </div>
</template>
  
  <script>
import NavMenu from "@/components/NavMenu.vue";
import Hello from "@/components/Hello.vue";
export default {
  components: { NavMenu,Hello },
  data() {
    return {
      chats: [
        {
          id: 1,
          name: "小明",
          avatar: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F34fc045e-0952-4cb8-861c-6f9936449ec6%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1685639440&t=7d108f015d0ed608cd996984fffcb1ff",
          timestamp: "10:30 AM",
          lastMessage: "你好，有什么可以帮到你的吗？",
          messages: [
            { id: 1, text: "你好，有什么可以帮到你的吗？", fromMe: false },
            { id: 2, text: "我想了解一下你们的产品信息。", fromMe: true },
            {
              id: 3,
              text: "当然可以，我们有以下产品可供选择...",
              fromMe: false,
            },
            // 其他消息...
          ],
        },
        {
          id: 2,
          name: "张三",
          avatar: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F34fc045e-0952-4cb8-861c-6f9936449ec6%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1685639440&t=7d108f015d0ed608cd996984fffcb1ff",
          timestamp: "2:15 PM",
          lastMessage: "明天见！",
          messages: [
            { id: 1, text: "早上好，明天我们见面吧！", fromMe: false },
            { id: 2, text: "好的，明天见！", fromMe: true },
            // 其他消息...
          ],
        },
        // 其他聊天...
      ],
      selectedChat: null,
      newMessage: "",
    };
  },
  methods: {
    selectChat(chat) {
      this.selectedChat = chat;
    },
    sendMessage() {
      if (this.newMessage.trim() !== "") {
        const message = {
          id: this.selectedChat.messages.length + 1,
          text: this.newMessage,
          fromMe: true,
        };
        this.selectedChat.messages.push(message);
        this.newMessage = "";
      }
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

/* 收信箱样式 */
.inbox-wrapper {
  display: flex;
  margin-top: -3rem;
  height: 46rem;
  width: 80rem;
  margin-left: 11rem;
  background-color: #f5f5f5;
}

.sidebar {
  width: 250px;
  background-color: #fff;
  padding: 20px;
  box-sizing: border-box;
  border-right: 1px solid #ccc;
}

.chat-list {
  margin-top: 20px;
}

.chat-item {
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.chat-item:hover {
  background-color: #f5f5f5;
}

.chat-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
}

.chat-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.chat-details {
  flex: 1;
}

.chat-info {
  display: flex;
  justify-content: space-between;
}

.chat-timestamp {
  font-size: 12px;
  color: #888;
}

/* 聊天室样式 */
.chat-room {
  flex: 1;
  padding: 20px;
  box-sizing: border-box;
}

.chat-header {
  margin-bottom: 20px;
}

.message-list {
  height: 35rem;
  max-height: 35rem;
  overflow-y: auto;
}

.message {
  margin-bottom: 10px;
  word-wrap: break-word;
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
  background-color: #ffffff;
  color: #000000;
  border-radius: 10px;
  padding: 8px 12px;
  max-width: 70%;
}

.from-me {
  text-align: right;
}

.from-other {
  text-align: left;
}

.input-box {
    margin-top: 1rem;
  display: flex;
  align-items: center;
}

.input-box input {
  flex: 1;
  padding: 10px;
  font-size: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-right: 5px;
}

.input-box button {
    font-size: 1.5rem;
    margin-left: 10px;
  padding: 8px 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}
</style>
  
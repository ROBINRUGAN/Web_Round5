<template>
  <div>
    <div class="header">
      <NavMenu class="navMenu" />
      <hello class="hello" />
    </div>
    <!-- 背景图片 -->
    <div class="background">
      <img
        src="../assets/userCenterImage/新建组.png"
        width="100%"
        height="100%"
      />
    </div>
    <!-- 消息按钮 -->
    <button class="messageBtn"></button>
    <div class="inbox-wrapper">
      <!-- 旁边的聊天列表 -->
      <div class="sidebar">
        <h2 style="color: #ff8400">MewChat</h2>
        <div class="chat-list">
          <div
            class="chat-item"
            v-for="chat in chats"
            :key="chat.id"
            @click="selectChat(chat)"
          >
            <!-- 头像 -->
            <div class="chat-avatar">
              <img :src="chat.person_profile_photo" alt="Avatar" />
            </div>
            <!-- 对方的名字、时间、最近一条消息 -->
            <div class="chat-details">
              <div class="chat-info">
                <h3>{{ chat.person_nickname }}</h3>
                <span class="chat-timestamp">{{ chat.last_message_time }}</span>
              </div>
              <div class="chat-message">
                <span>{{ chat.last_message }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="chat-room" v-if="selectedChat">
        <div :key="length">
          <div class="chat-header">
            <h2>{{ selectedChat.person_nickname }}</h2>
          </div>
          <div class="message-list" id="chat-container">
            <div
              class="message"
              v-for="(message,index) in selectedChat.messages"
              :key="index"
              :class="[
                message.author === 'Me'
                  ? 'from-me'
                  : message.author === 'Other'
                  ? 'from-other'
                  : 'from-system',
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
                <span>{{ message.message }}</span>
              </div>
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
          <button @click="sendMessage" @keyup.enter="sendMessage">发送</button>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import NavMenu from "@/components/NavMenu.vue";
import Hello from "@/components/Hello.vue";
import { GetChatList, ChatHistory, ReadMessage } from "@/api/api";

export default {
  components: { NavMenu, Hello },
  data() {
    return {
      chats: [],
      selectedChat: null,
      newMessage: "",
      tempMessage: "",
      person_id: "",
      length: 0,
    };
  },

  mounted() {
    GetChatList().then((res) => {
      if (res.data) this.chats = res.data;

      this.chats.forEach((chat) => {
        chat.messages = [];
        ChatHistory(chat.person_id).then((chatRes) => {
          console.log(chatRes);
          if (chatRes.data) {
            //历史记录获得的好像不是响应式，我改成这样还是不行
            chatRes.data.forEach((charres) => {
              chat.messages.push(charres);
            });
            chat.messages.forEach((message) => {
              if (message.send_id === window.localStorage.getItem("userId"))
                message.author = "Me";
              else {
                message.author = "Other";
              }
            });
          }
        });
      });
      //开始连接websocket并缓存
      this.$socket.open(); // 开始连接socket
      this.sockets.listener.subscribe("response", (msg) => {
        this.tempMessage = msg;
        console.log("我要接受subscribe未读消息了！检查一下原生数据");
        console.log(msg);
        if (this.tempMessage.send_id === window.localStorage.getItem("userId"))
          this.tempMessage.author = "Me";
        else {
          this.tempMessage.author = "Other";
        }
        if (this.tempMessage.code === 1 || this.tempMessage.send_id === 6)
          this.tempMessage.author = "System";

        //遍历聊天列表，如果有这个人，就更新一下
        this.chats.forEach((chat) => {
          //要么好友发消息我收，要么就是我发消息，好友收
          if (
            (chat.person_id === this.tempMessage.send_id &&
              window.localStorage.getItem("userId") ===
                this.tempMessage.receive_id) ||
            (chat.person_id === this.tempMessage.receive_id &&
              window.localStorage.getItem("userId") ===
                this.tempMessage.send_id)
          ) {
            chat.messages.push(this.tempMessage);
            chat.last_message = this.tempMessage.message;
            chat.last_message_time = this.tempMessage.send_time; //这里有个问题，如果我发消息，那么这个时间就是我发的时间，而不是对方收到的时间
          }

          //确认一下如果当前选中的聊天室是这个人，那么就更新一下
          if (this.person_id === chat.person_id) {
            console.log("检查一下更新情况");
            this.selectedChat = chat;
            this.length = chat.messages.length;
            this.scrollToBottom(); // 滚动到底部

            //这里将收到的消息设置为已读
            //还得是别人发过来的消息，不然我自己发的消息也会被设置为已读
            if (this.tempMessage.send_id === this.person_id) {
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
      });
    });
  },
  beforeDestroy() {
    this.$socket.close();
  },
  methods: {
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$el.querySelector("#chat-container");
        container.scrollTop = container.scrollHeight;
      });
    },
    formatTimestamp() {
      const date = new Date();
      const formattedTime = date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      });
      return formattedTime;
    },
    selectChat(chat) {
      console.log(chat);
      this.selectedChat = chat;
      this.person_id = chat.person_id;
      this.scrollToBottom();
      // chat.messages.forEach((message) => {
      //   //这里将收到的消息设置为已读
      //   //还得是别人发过来的消息，不然我自己发的消息也会被设置为已读
      //   if (message.send_id === this.person_id) {
      //     let readMessageData = {
      //       send_id: message.send_id,
      //       message_id: message.message_id,
      //     };
      //     console.log("你好")
      //     console.log(readMessageData)
      //     ReadMessage(readMessageData).then((res) => {
      //       console.log(res);
      //     });
      //   }
      // });
    },
    sendMessage() {
      if (this.newMessage.trim() !== "") {
        const message = {
          receive_id: this.person_id,
          message: this.newMessage,
          type: 0,
        };
        console.log("为什么id一样啊啊啊啊啊");
        console.log(message);
        this.selectedChat.messages.push({
          author: "Me",
          message: this.newMessage,
        });
        this.$socket.send(JSON.stringify(message));
        this.selectedChat.last_message_time = this.formatTimestamp();
        this.selectedChat.last_message = this.newMessage; //这里有个问题，如果我发消息，那么这个时间就是我发的时间，而不是对方收到的时间
        this.scrollToBottom(); // 滚动到底部
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

.message-bubble-system {
  display: inline-block;
  background-color: #bfe5a6;
  color: #000000;
  border-radius: 10px;
  padding: 8px 12px;
  width: 90%;
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

.from-system {
  text-align: center;
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
.chat-message {
  display: inline-block;
  max-width: 8rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
  
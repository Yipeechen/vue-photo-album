<template>
  <div class="auth-panel">
    <h1>Please {{ content }}</h1>
    <input type="email" name="email" id="email" placeholder="Email Address" v-model="email">
    <input type="password" name="password" id="password" placeholder="Password" v-model="password">
    <button @click="handleSubmit">{{ content }}</button>
  </div>
</template>

<script>
export default {
  props: ["type"], //設定一個props參數接收父層頁面訊息
  data: function() {
    return {
      email: "",
      password: ""
    };
  },
  computed: { 
    //父層會傳入login or sign 兩種狀態，可以透過this.type 讀取狀態，在用computed計算content內容
    content: function() {
      if (this.type === "login") {
        return "Login";
      } else {
        return "Sign up";
      }
    }
  },
  methods: {
    handleSubmit: function() {
      //將使用者輸入的訊息打包成一物件，此物件通常取名為 palyload
      const payload = {
        email: this.email,
        password: this.password
      };
      this.$emit("auth-panel-submit", payload); //將使用者輸入帳密發送給父元件
      console.log("submit auth");
      console.dir(payload); // console.dir() 顯示元素物件屬性
    }
  }
};
</script>

<style scoped>
.auth-panel {
  width: 300px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
 .auth-panel h1 {
  width: 100%;
}
 .input-container {
  width: 100%;
  border: 1px solid #c0c0c0;
  border-radius: 6px;
}
 input {
  width: 100%;
  height: 40px;
  font-size: 16px;
}
 #email {
  border: 1px solid #c0c0c0;
  border-radius: 6px 6px 0 0;
}
 #email:focus {
  outline: none;
}
 #password {
  border: 1px solid #c0c0c0;
  border-radius: 0 0 6px 6px;
  margin-bottom: 15px;
}
 #password:focus {
  outline: none;
}
 button {
  width: 100%;
  height: 40px;
  background-color: rgb(54, 107, 158);
  border-radius: 6px;
  border: none;
  color: #fff;
  font-size: 18px;
}
</style>
<template>
  <div class="signup">
    <!-- 需將 type參數傳入 AuthPanel -->
    <!-- 接收到子元件(AuthPanel)的auth-panel-submit事件，利用v-on監聽 auth-panel-submit事件，觸發 handleSignUp方法 -->
    <AuthPanel type="signup" @auth-panel-submit="handleSignUp" />
  </div>
</template>

<script>
import AuthPanel from "@/components/AuthPanel";
import axios from 'axios';
export default {
  methods: {
    handleSignUp: function(payload) {
      var that = this; //避免不同function scope對this有不同解讀
      var signupUrl = "http://35.185.111.183/api/v1/signup";
      axios
        .post(signupUrl, payload)
        .then(function(res) {
          console.log("Signup Success");
          console.log(res.data);
          that.$router.push("/login");
        })
        .catch(function(err) {
          console.error(err.response.data.errors);
        });
        // POST有兩個參數 1.位置 2.message body
        // then() 設定請求成功後續處理
        // catch() 設定請求失敗後續處理
    }
  },
  components: {
    AuthPanel: AuthPanel
  }
};
</script>


<style scoped>
.signup {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding-top: 100px;
}
</style>

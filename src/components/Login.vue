<template>
  <div class="login">
    <!-- 需將 type參數傳入 AuthPanel -->
    <AuthPanel type="login" @auth-panel-submit="handleLogin" />
  </div>
</template>

<script>
import AuthPanel from "@/components/AuthPanel";
import axios from "axios";

export default {
  methods: {
    handleLogin: function(payload)  {
      console.log('handleLogin');
      const that = this;
      const url = 'http://35.185.111.183/api/v1/login';

      axios
        .post(url, payload)
        .then(res => {
          console.log('login success!');
          console.log(res.data.auth_token);

          //save to localstorage
          // 1) 取出token & email 建立成一object
          const authToken = res.data.auth_token;
          const email = payload.email;
          const sessionData = { 
            authToken: authToken,
            email: email
          };
          
          // 2) localStorage.setItem(variableName, datatype) 方法將資料存入
          // JSON.stringify(data) 方法將JS物件轉換成字串格式
          localStorage.setItem('photo-album-user', JSON.stringify(sessionData));

          //emit 'auth-state' event to $bus
          that.$bus.$emit('auth-state', { action:'login' });
          //render index
          that.$router.push('/');
        })
        .catch(err => {
          console.error(err.response.data.errors);
        });
    }
  },
  components: {
    AuthPanel: AuthPanel
  }
};
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding-top: 100px;
}
</style>


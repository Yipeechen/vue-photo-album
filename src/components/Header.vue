<template>
<div class="header">
  <h1 @click="handleTitleClick">{{ title }}</h1>
  <p class="new-photo-btn btn" @click="handleNewPhotoClick">New Photo <i class="fas fa-camera-retro"></i></p>

  <!-- v-if -->
  <div class="user-unlogin-container" v-if="!isLogin">
    <p class="signup-btn btn" @click="handleSignUp">Sign up <i class="fas fa-user-plus"></i></p>
    <p class="login-btn btn" @click="handleLogin">Login <i class="fas fa-sign-in-alt"></i></p>
  </div>
  <!-- v-else -->
  <div class="user-login-container" v-else>
    <p class="user-email">{{ userEmail }}</p>
    <p class="login-btn btn" @click="handleLogout">Log out <i class="fas fa-sign-out-alt"></i></p>
  </div>

</div>
</template>

<script>
import axios from  'axios';
export default {
  data: () => {
    return {
      title: "Photo Album",
      isLogin: false,
      userEmail: "example@email.com"
    };
  },
  methods: {
    handleTitleClick: function() {
      this.$router.push("/");
    },
    handleNewPhotoClick: function() {
      this.$router.push("/photos/new");
    },
    handleSignUp: function() {
      this.$router.push("/signup");
    },
    handleLogin: function() {
      this.$router.push("/login");
    },
    handleLogout: function() {
      console.log("logout");
      const sessionData = JSON.parse(localStorage.getItem('photo-album-user'));

      //Early exit from function when there is no sessionData
      if (sessionData == null) {
        return;
      }

      const token = sessionData.authToken;
      // 1) access logout api
      const url = 'http://35.185.111.183/api/v1/logout';
      axios
        .post(url, { auth_token: token })
        .then(res => console.log(res))
        .catch(err => console.error(err.response.data.errors));

      // 2) emit 'auth-state' event to $bus
      this.$bus.$emit('auth-state', { action: 'logout' });

      // 3) clean up localStorage
      localStorage.removeItem('photo-album-user');

      // 4) redirect to index
      this.$router.push('/');
    },
    handleAuthState: function(payload) {
      // contain { action:login/logout } pass from auth-state
      console.dir(payload);
      const action = payload.action;

      if (action === 'login'){
        const sessionData = JSON.parse(localStorage.getItem('photo-album-user'));
        // 1. change the state of this.isLogin
        this.isLogin = true;
        // 2. get this.userEmail for localStorage
        this.userEmail = sessionData.email;
      } else if (action === 'logout') {
        this.isLogin = false;
        this.userEmail = '';
      }
    }
  },
  created() { //在頁面一開啟時就檢查登入狀態
    // 1) subscribe 'auth-state' event from bus
    this.$bus.$on('auth-state', this.handleAuthState);

    // 2) check auth state from local storage
    // use JSON.parse() to convert obj type
    const sessionData = JSON.parse(localStorage.getItem('photo-album-user'));
    if (sessionData) {
      this.handleAuthState({ action: 'login' });
    } else {
      this.handleAuthState({ action: 'logout' });
    }
  },
  beforeDestroy() { 
    // 只要有使用$on註冊監聽，就需要在元件週期的 beforeDestroy階段，使用$off拆除監聽，避免元件生命週期結束後，event listener持續運作
    this.$bus.$off('auth-state', this.handleAuthState)
  }
};
</script>

<style scoped>
.header {
  height: 60px;
  width: 100%;
  background-color: #ffbf5eb9;
  border-bottom: 2px solid #ffbf5e;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
 .header h1 {
  font-size: 26px;
  padding-left: 25px;
  margin: 0;
  color: #404040;
}
 .header h1:hover {
  cursor: pointer;
  color: #000;
}
 .user-email {
  font-size: 18px;
  margin-right: 30px;
}
 .new-photo-btn {
  font-size: 18px;
  font-weight: 500;
  color: #5e5e5e;
  margin-left: 30px;
  margin-right: auto;
}
 .user-unlogin-container {
  height: 100%;
  width: 200px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
 .user-login-container p {
  font-size: 18px;
  font-weight: 500;
  color: #5e5e5e;
}
 .user-login-container {
  height: 100%;
  width: auto;
  margin-right: 15px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
 .user-unlogin-container p {
  font-size: 18px;
  font-weight: 500;
  color: #5e5e5e;
}
  .btn {
  padding: 17px 0;   
}
 .btn:hover {
  cursor: pointer;
  color: #000;
  border-bottom: 6px solid #f7901b;
}
 @media (max-width: 772px) {
  .header h1 {
    display: none;
  }
}
</style>


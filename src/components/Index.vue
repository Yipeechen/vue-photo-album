<template>
  <div class="container">
    <!--  -->
    <div class="item-list photo-container-wrapper" v-for="photo in photos">
      <!-- transfer(props) isLogin to itemListElement -->
      <item-list-element 
      :isLogin="isLogin"
      :id="photo.id"
      :title="photo.title"
      :description="photo.description"
      :url="'http://35.185.111.183'+photo.file_location.url"/>
    </div>
  </div>
</template>

<script>
import ItemListElement from '@/components/ItemListElement';
import axios from 'axios';
export default {
  data: () => {
    return {
      isLogin: false,
      photos: []
    };
  },
  components: {
    ItemListElement: ItemListElement
  },
  methods: {
    handleAuthState: function(payload) {
      const action = payload.action;
      if (action === 'login') {
        this.isLogin = true;
      } else if (action === 'logout') {
        this.isLogin = false;
      }
    }
  },
  created() {
    // 1) listening the 'auth-state' event
    this.$bus.$on('auth-state', this.handleAuthState);

    // 2) check auth-state from local storage
    const sessionData = JSON.parse(localStorage.getItem('photo-album-user'));
    
    // use !! to comfirm just return boolean
    if (!!sessionData) {
      this.handleAuthState({ action:'login' });
    } else {
      this.handleAuthState({ action: 'logout' });
    }

    // get photos from api
    const indexUrl = 'http://35.185.111.183/api/v1/photos';
    const hostUrl = 'http://35.185.111.183/';

    axios
      .get(indexUrl, {})
      .then(res => {
        this.photos = res.data.data;
      })
      .catch(err => {
        console.error(err.response.data);
      });
  },
  beforeDestroy() {
    this.$bus.$off('auth-state', this.handleAuthState);
  }
};
</script>

<style scoped>
.container {
  max-width: 1440px;
  margin: 100px auto;
  display: flex;
  flex-wrap: wrap;
}
 .item-list {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25%;
  margin-bottom: 60px;
}
 @media (max-width: 993px) {
  .photo-container-wrapper {
    width: 33.333%;
  }
}
 @media (max-width: 769px) {
  .photo-container-wrapper {
    width: 50%;
  }
}
 @media (max-width: 577px) {
  .photo-container-wrapper {
    width: 100%;
  }
}
</style>


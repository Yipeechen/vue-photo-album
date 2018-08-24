<template>
  <div class="show">
    <div class="photo-container">
      <!-- transfer(props) url to ImgDisplay -->
      <!-- v-if : prevent Show props url to imgDisplay before server response data -->
      <ImgDisplay :url="url" v-if="url!='' && url != null"/>
    </div>
    <div class="main-container">
      <h3 class="main-title">{{ title }}</h3>
      <p class="main-date">{{ date }}</p>
      <p class="main-description">{{ description }}</p>
    </div>
  </div>
</template>

<script>
import ImgDisplay from '@/components/ImgDisplay';
import axios from 'axios';
export default {
  data: function() {
    return {
      title: "title",
      description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos, cupiditate.",
      url: "",
      date: "2018-01-01"
    };
  },
  components: {
    ImgDisplay: ImgDisplay
  },
  created() {
    // 1) combine request url
    const id = this.$route.params.id;
    const showUrl = "http://35.185.111.183/api/v1/photos/" + id;

    // 2) get token if user logged in (except index)
    let params;
    if (localStorage.getItem('photo-album-user')) {
      const token = JSON.parse(localStorage.getItem('photo-album-user')).authToken;
      params = { auth_token: token };
    }

    // 3) get data from api
    axios
      .get(showUrl, { params })
      .then(res => {
        this.title = res.data.title;
        this.date = res.data.date;
        this.description = res.data.description;
        this.url = "http://35.185.111.183" + res.data.file_location.url;
      })
      .catch(err => {
        console.error(err.response.data);
        this.$router.push('/login');
      });
  }
};
</script>

<style scoped>
.show {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap : wrap;
}
 .photo-container {
  padding-top: 100px;
  padding-right: 50px;
}
 .main-container {
  width: 500px;
  padding-top: 100px;
  margin-bottom: auto;
}
 .main-title {
  font-size: 43px;
  margin-top: 0;
  margin-bottom: 0;
}
 .main-date {
  font-size: 24px;
}
 .main-description {
  font-size: 20px;
}
</style>

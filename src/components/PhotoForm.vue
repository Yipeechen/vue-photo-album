<template>
  <!-- 3) 模板中呼叫使用元件: 
          wrapper-class ： 設定外包容器class名稱 
          input-class ：設定輸入框的class名稱-->
<div class="photo-form">
  <input type="text" id="title" placeholder="Title" v-model="newTitle">
  <Datepicker wrapper-class="date-wrapper" input-class="date-input" format="dd.MM.yyyy" v-model="newDate"/>
  <textarea name="description" id="description" rows="7" placeholder="description" v-model="newDescription"></textarea>
  <div class="upload-container">
    <input type="file" name="upload-file-btn" id="upload-file-btn" @change="handleFileChange">
  </div>
  <button class="submit-btn" @click="handleSubmit">Submit</button>
</div>
</template>

<script>
// 1) 如果需要使用Datepicker，以import匯入位置只要寫套件名稱
import Datepicker from 'vuejs-datepicker'
export default {
  props: { //表單需要從父元件New & Edit 接受title和 description
    title: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    }
  },
  components: {
    // 2) 在components中註冊元件
    Datepicker: Datepicker,
  },
  data: () => {
    return {
      newDate: new Date(),
      newTitle: this.title,
      newDescription: this.description,
      file: ""
    };
  },
  methods: {
    handleFileChange: (e) => { //綁定在上傳檔案按鈕上的change事件
      this.file = e.target.files[0]; 
      //因只上傳一張圖片，使用e.target.file[0]取得陣列第一元素
      console.log(this.file);
    },
    handleSubmit: () => {
      const payload = {
        title: this.newTitle,
        date: this.newDate,
        description: this.description,
        file_location: this.file
      };
      
      // photo form submit
      this.$emit('photo-form-submit', payload);
    }
  }
};
</script>


<style scoped>
.photo-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 100%;
}
 #title {
  width: 100%;
  height: 40px;
  font-size: 24px;
  border: 1px solid #c0c0c0;
  border-radius: 6px;
  margin-bottom: 20px;
}
 #description {
  width: 100%;
  font-size: 24px;
  border: 1px solid #c0c0c0;
  border-radius: 6px;
  margin-bottom: 20px;
}
 .upload-container {
  width: 100%;
  margin-bottom: 20px;
}
 .submit-btn {
  border: 1px solid #c0c0c0;
  background-color: #fff;
  border-radius: 6px;
  width: 108px;
  height: 50px;
  font-size: 18px;
  font-weight: 700;
  margin-right: auto;
}
</style>
 <style>
.date-wrapper {
  width: 100%;
}
 .date-input {
  width: 100%;
  height: 40px;
  font-size: 24px;
  border: 1px solid #c0c0c0;
  border-radius: 6px;
  margin-bottom: 20px;
}
</style>
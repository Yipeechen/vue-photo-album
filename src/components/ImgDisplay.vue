<template>
<div>
  <!-- 負責顯示圖片，v-bind綁定#img-panel的style屬性 -->
  <div id="img-panel" :style="imgShow">
  </div>
</div>
</template>

<script>
export default {
  props: {
    //父元件可能是Show、New、Edit，接受來自父元件傳來的url屬性，以便元件渲染動態產生對應上下文圖片，若無法取得url時，使用預設值傳給props
    url: {
      type: String,
      default: "http://via.placeholder.com/400x400"
    }
  },
  computed: {
    imgShow:  function() {
      // 表示寫入 style: "background: url(path) no-repeat center; background-size: cover;"
      return {
        background: "url(" + this.url + ") no-repeat center",
        backgroundSize: "cover"
      };
    }
  }
};
</script>

<style scoped>
#img-panel {
  width: 400px;
  height: 400px;
  border-radius: 12px;
  background-color: #e0e0e0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
<template>
  <div class="signup">
    <!-- 需將 type參數傳入 AuthPanel -->
    <AuthPanel type="signup" />
  </div>
</template>

<script>
import AuthPanel from "@/components/AuthPanel";
export default {
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

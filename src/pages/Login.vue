<template>
  <div class="root">
    <div class="background">
      <img src="../assets/LoginBackground.png" width="100%" height="100%" />
    </div>
    <LoginForm class="login"/>

  </div>
</template>

<script>
import LoginForm from "../components/LoginForm";
export default {
  components: {
    LoginForm,

  },
};
</script>

<style scoped>

.background {
  left: 0;
  top: 0;
  width: 106.5rem;
  height: 56.96rem; 
  z-index: -1;
  position: absolute;
}
.login{
  width: 40rem;
  height: 20rem;
  margin-left: 57rem;
  margin-top: 23rem; 
}
</style>

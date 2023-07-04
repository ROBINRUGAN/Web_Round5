<template>
  <div class="root">
    <div class="background">
      <img src="../assets/RegisterBackground.png" width="100%" height="100%" />
    </div>
    <RegisterForm class="register" />
  </div>
</template>

<script>
import RegisterForm from "../components/RegisterForm";
export default {
  components: {
    RegisterForm,
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
.register {
  width: 40rem;
  height: 20rem;
  margin-left: 57rem;
  margin-top: 18rem;
}
</style>

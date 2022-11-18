<template>
  <section class="p-5">
    <b-card class="h-75 col-sm-4 login-form">
      <div class="text-center">
        <h2>회원가입</h2>
        <b-row class="text-center justify-content-center p-1">
          <div class="col-sm-3 m-auto">ID</div>
          <b-form-input class="col-sm-8" v-model="id" />
        </b-row>
        <b-row class="text-center justify-content-center p-1">
          <div class="col-sm-3 m-auto">Password</div>
          <b-form-input id="type-password" class="col-sm-8" v-model="pw" />
        </b-row>
        <b-row class="text-center justify-content-center p-1">
          <div class="col-sm-3 m-auto">Name</div>
          <b-form-input class="col-sm-8" v-model="name" />
        </b-row>
        <b-row class="text-center justify-content-center p-1">
          <div class="col-sm-3 m-auto">Address</div>
          <b-form-input class="col-sm-8" v-model="address" />
        </b-row>
        <b-row class="text-center justify-content-center p-1">
          <div class="col-sm-3 m-auto">Tel</div>
          <b-form-input id="type-tel" class="col-sm-8" placeholder="01012345678" v-model="tel" />
        </b-row>
        <b-row class="text-center justify-content-center p-1">
          <b-form-radio value="user" checked class="m-1" v-model="role">User</b-form-radio>
          <b-form-radio value="admin" class="m-1" v-model="role">Admin</b-form-radio>
        </b-row>
      </div>
      <b-card-footer class="p-4 pt-0 border-top-0 bg-transparent text-center">
        <button id="register-btn" class="btn-outline-dark btn">Register</button>
      </b-card-footer>
    </b-card>
  </section>
</template>

<script>
export default {
  name: "UserRegister",
  data() {
    return {
      id: "",
      pw: "",
      name: "",
      address: "",
      tel: "",
      role: "",
    };
  },
};
</script>

<style>
.login-form {
  margin: 0 auto;
}
</style>

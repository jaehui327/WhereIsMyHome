<template>
  <section class="p-5">
    <b-card class="h-75 col-sm-4 login-form p-5">
      <b-row class="text-center justify-content-center p-1">
        <label class="col-sm-4 m-auto">ID</label>
        <b-form-input v-model="id" class="col-sm-8" />
      </b-row>
      <b-row class="text-center justify-content-center p-1">
        <label class="col-sm-4 m-auto">Password</label>
        <b-form-input type="password" id="login-pw" v-model="pw" class="col-sm-8" />
      </b-row>
      <b-card-footer class="p-4 pt-0 border-top-0 bg-transparent text-center">
        <button id="type-password" class="btn-outline-dark btn" @click="userLogin({ id, pw })">
          Login
        </button>
      </b-card-footer>
    </b-card>
  </section>
</template>

<script>
import { mapActions } from "vuex";

const userStore = "userStore";

export default {
  name: "UserLogin",
  data() {
    return {
      id: "",
      pw: "",
    };
  },
  methods: {
    ...mapActions(userStore, ["userLogin"]),
  },
};
</script>

<style>
.login-form {
  margin: 0 auto;
}
</style>

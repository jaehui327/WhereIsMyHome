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
          <b-form-radio value="user" class="m-1" v-model="role">User</b-form-radio>
          <b-form-radio value="admin" class="m-1" v-model="role">Admin</b-form-radio>
        </b-row>
      </div>
      <b-card-footer class="p-4 pt-0 border-top-0 bg-transparent text-center">
        <button id="register-btn" class="btn-outline-dark btn" @click="checkValue">Register</button>
      </b-card-footer>
    </b-card>
  </section>
</template>

<script>
import { mapActions } from "vuex";

const userStore = "userStore";

export default {
  name: "UserRegister",
  data() {
    return {
      id: "",
      pw: "",
      name: "",
      address: "",
      tel: "",
      role: "user",
    };
  },
  methods: {
    ...mapActions(userStore, ["registerUser"]),
    checkValue() {
      const regex = /^[a-z|A-Z|0-9|]+$/;
      const regexTel = /^[0-9]+$/;
      if (!this.id) {
        alert("아이디를 입력해주세요.");
      } else if (!regex.test(this.id)) {
        alert("아이디는 영어 소문자, 대문자, 숫자만 가능합니다.");
        this.id = "";
      } else if (!this.pw) {
        alert("비밀번호를 입력해주세요.");
      } else if (!regex.test(this.pw)) {
        alert("비밀번호는 영어 소문자, 대문자, 숫자만 가능합니다.");
        this.pw = "";
      } else if (!this.name) {
        alert("이름을 입력해주세요.");
      } else if (!this.address) {
        alert("주소를 입력해주세요.");
      } else if (!this.tel || !regexTel.test(this.tel)) {
        alert("전화번호를 확인해주세요.");
      } else {
        this.register();
      }
    },
    register() {
      this.registerUser({
        id: this.id,
        pw: this.pw,
        name: this.name,
        address: this.address,
        phone: this.tel,
        role: this.role,
      }).then((status) => {
        if (status === 200) {
          this.$router.push("/user/login");
        } else if (status === 500) {
          alert("내부 서버 오류입니다.");
        }
      });
    },
  },
};
</script>

<style>
.login-form {
  margin: 0 auto;
}
</style>

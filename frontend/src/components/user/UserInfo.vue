<template>
  <section class="p-5">
    <b-card class="h-75 col-sm-4 login-form">
      <div class="text-center">
        <h1>My Page</h1>
        <b-row class="text-center justify-content-center p-1">
          <div class="col-sm-3 m-auto">ID</div>
          <b-form-input readonly class="col-sm-8" v-model="userInfo.id" />
        </b-row>
        <b-row class="text-center justify-content-center p-1">
          <div class="col-sm-3 m-auto">Password</div>
          <b-form-input class="col-sm-8" v-model="pw" type="password" />
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
      </div>

      <b-card-footer class="p-4 pt-0 border-top-0 bg-transparent text-center">
        <button id="update-btn" class="btn-outline-dark btn" @click="checkValue">Update</button>
        <button id="delete-btn" class="btn-outline-dark bg-danger text-white btn" @click="remove">
          Delete
        </button>
      </b-card-footer>
    </b-card>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

const userStore = "userStore";

export default {
  name: "UserInfo",
  data() {
    return {
      name: "",
      pw: "",
      address: "",
      tel: "",
    };
  },
  created() {
    this.name = this.userInfo.name;
    this.address = this.userInfo.address;
    this.tel = this.userInfo.tel;
  },
  computed: {
    ...mapGetters(userStore, ["userInfo"]),
  },
  methods: {
    ...mapActions(userStore, ["removeUser", "modifyUser"]),
    checkValue() {
      const regexTel = /^[0-9]+$/;
      if (!this.name) {
        alert("이름을 입력해주세요.");
      } else if (!this.address) {
        alert("주소를 입력해주세요.");
      } else if (!this.tel || !regexTel.test(this.tel)) {
        alert("전화번호를 확인해주세요.");
      } else {
        this.update();
      }
    },
    remove() {
      if (confirm("정말 삭제하시겠습니까?")) {
        this.removeUser(this.userInfo.id);
      }
    },
    update() {
      if (confirm("수정하시겠습니까?")) {
        this.modifyUser({
          id: this.userInfo.id,
          name: this.name,
          pw: this.pw,
          address: this.address,
          tel: this.tel,
        });
        this.pw = "";
      }
    },
  },
};
</script>
``
<style>
.login-form {
  margin: 0 auto;
}
</style>

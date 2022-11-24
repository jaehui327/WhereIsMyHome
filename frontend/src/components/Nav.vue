<template>
  <b-navbar toggleable="lg" type="light" variant="light">
    <b-navbar-brand to="/">WhereIsMyHome</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/notice">Notice</b-nav-item>
        <b-nav-item to="/qna">QnA</b-nav-item>
        <b-nav-item to="/map">Apartment</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto" v-if="isLogin">
        <b-button variant="outline-dark" @click="logout">Logout</b-button>
        &nbsp;
        <b-button to="/user/info" variant="outline-dark">My Page</b-button>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto" v-else>
        <b-button to="/user/login" variant="outline-dark">Login</b-button>
        &nbsp;
        <b-button to="/user/register" variant="outline-dark">Register</b-button>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

const userStore = "userStore";

export default {
  name: "Nav",
  computed: {
    ...mapGetters(userStore, ["isLogin"]),
  },
  methods: {
    ...mapActions(userStore, ["logout"]),
  },
};
</script>

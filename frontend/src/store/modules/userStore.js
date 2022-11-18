import { login } from "@/api/user";
import router from "@/router";

const userStore = {
  namespaced: true,
  state: {
    isLogin: false,
    isLoginError: false,
    userInfo: null,
    isValidToken: false,
  },
  getters: {
    isLogin(state) {
      return state.isLogin;
    },
    userInfo(state) {
      return state.userInfo;
    },
    isValidToken(state) {
      return state.isValidToken;
    },
  },
  mutations: {
    SET_IS_LOGIN(state, isLogin) {
      state.isLogin = isLogin;
    },
    SET_IS_LOGIN_ERROR(state, isLoginError) {
      state.isLoginError = isLoginError;
    },
    SET_IS_VALID_TOKEN(state, isValidToken) {
      state.isValidToken = isValidToken;
    },
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo;
    },
  },
  actions: {
    async userLogin({ commit }, user) {
      await login(
        user,
        ({ data }) => {
          commit("SET_IS_LOGIN", true);
          commit("SET_IS_LOGIN_ERROR", false);
          commit("SET_USER_INFO", data);
          // if (data.message === "success") {
          // const accessToken = data["access-token"];
          // const refreshToken = data["refresh-token"];

          //   commit("SET_IS_VALID_TOKEN", true);
          // }
          alert("로그인되었습니다.");
          router.push("/");
        },
        (error) => {
          console.log(error);
        }
      );
    },
    logout({ commit }) {
      alert("로그아웃");
      commit("SET_IS_LOGIN", false);
      commit("SET_USER_INFO", null);
      if (router.currentRoute.path !== "/") {
        router.push("/");
      }
    },
  },
};

export default userStore;

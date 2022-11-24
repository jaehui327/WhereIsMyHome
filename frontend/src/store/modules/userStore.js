import { login, doRegisterUser, removeUser, modifyUser, doIdCheck } from "@/api/user";
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
      let status;
      await login(
        user,
        ({ data }) => {
          if (data.message === "success") {
            commit("SET_IS_LOGIN", true);
            commit("SET_IS_LOGIN_ERROR", false);
            commit("SET_USER_INFO", {
              id: data.id,
              role: data.role,
              name: data.name,
              tel: data.tel,
              address: data.address,
            });
          }
          status = data.message;
        },
        (error) => {
          console.log(error);
        }
      );
      return status;
    },
    logout({ commit }) {
      alert("로그아웃");
      commit("SET_IS_LOGIN", false);
      commit("SET_USER_INFO", null);
      if (router.currentRoute.path !== "/") {
        router.push("/");
      }
    },
    async registerUser(context, user) {
      let status;
      await doRegisterUser(
        user,
        () => {
          status = 200;
        },
        (error) => {
          status = error.response.status;
        }
      );
      return status;
    },
    async removeUser({ commit }, userId) {
      await removeUser(
        userId,
        () => {
          commit("SET_IS_LOGIN", false);
          commit("SET_USER_INFO", null);
          if (router.currentRoute.path !== "/") {
            router.push("/");
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async modifyUser({ commit }, user) {
      await modifyUser(
        user,
        ({ data }) => {
          commit("SET_USER_INFO", {
            id: data.id,
            role: data.role,
            name: data.name,
            tel: data.phone,
            address: data.address,
          });
        },
        (error) => {
          console.log(error);
        }
      );
      return status;
    },
    async idCheck(context, userId) {
      let cnt;
      await doIdCheck(
        userId,
        ({ data }) => {
          cnt = data;
        },
        (error) => {
          console.log(error);
        }
      );
      return cnt;
    },
  },
};

export default userStore;

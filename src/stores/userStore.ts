// store.js
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const userStore = new Vuex.Store({
  state: {
    user: {},
  },
  mutations: {
    setUser(state, data) {
      state.user = data;
    },
  },
  actions: {
    updateUserInfo(context, data) {
      context.commit("setUser", data);
    },
  },
});

export default userStore;

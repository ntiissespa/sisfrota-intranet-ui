import { createStore } from "vuex";
//import AuthService from "./service/auth/auth_service";
import Token from "./utilities/jwt/Token.js";

export default createStore({
  state() {
    return {
      userLogged: null,
      views: {
        tire: {
          dialogForm: false,
        },
        accessory: {
          dialogForm: false,
        },
        breakdown: {
          dialogForm: false,
        },
        document: {
          dialogForm: false,
        },
        driver: {
          dialogForm: false,
          dialogUpload: false,
        },
        vehicle: {
          dialogForm: false,
        },
        checklist: {
          dialogForm: false,
          dialogDetails: false,
          dialogUpload: false,
        },
      },
    };
  },
  getters: {
    getUserLogged(state) {
      return state.userLogged;
    },
    getSelectType(state) {
      return state.views.external.selectType;
    },
    getDialogExternalCard(state) {
      return state.views.external.dialogExternalCard;
    },
  },
  mutations: {
    setUserLogged(state, token) {
      token = [
        {
          nome: token.name,
          id: token.code,
          services: token.services,
          email: token.user_name,
          authorities: token.authorities,
          personId: token.personId,
        },
      ];
      state.userLogged = token[0];
    },
  },
  actions: {
    setUserLogged({ commit }) {
      commit("setUserLogged", new Token().jwtDecode());
    },
  },
});

import Vue from 'vue';
import Vuex from 'vuex';
import utilsStore from './modules/utilsStore';
import auth from './modules/auth';
import confirmAuth from './modules/confirmAuth';
import apiWhatsApp from './modules/apiWhatsApp';
import cookieModule from './modules/cookieModule';

Vue.use(Vuex);
/* eslint-disable */
const store = new Vuex.Store({
  modules: {
    utilsStore,
    auth,
    confirmAuth,
    apiWhatsApp,
    cookieModule
  },
});

export default store;
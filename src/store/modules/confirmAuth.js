/* eslint-disable */

const state = {
    switchConfirm: 0,
    switchConfirmAcompanhante: 0,
    qtd_confirmado_convidados: 0,
    itemsAcompanhantes: [],
    setSomaAcompanhantes: null,
    setAcompanhantesWatch: 0,
    acompanhanteValidado: false,
    qtd_acomp: null,
    desktops: false
  };
  
  const mutations = {
    SET_CONFIRM (state, payload) {
        state.switchConfirm = payload;
    },

    SET_CONFIRM_ACOMPANHANTE (state, payload) {
        state.switchConfirmAcompanhante = payload;
    },

    ACOMPANHANTE_VALIDADO (state, payload) {
        state.acompanhanteValidado = payload;
    },

    PUT_CONFIRM_ANIVER (state, payload) {
        state.qtd_confirmado_convidados = payload;
    },

    ADD_ITEM_ACOMPANHANTES(state, payload) {
      state.itemsAcompanhantes.push(payload);
    },

    QTD_ACOMT(state, payload) {
      state.qtd_acomp = payload;
    },

    SET_SOMA_ACOMPANHANTES(state, payload) {
      state.setSomaAcompanhantes = payload;
    },

    // TODO: MUTAÇÃO PARA ATUALIZAR O STATE COM O VALOR ACOMPANHANTES QUE ESTA SENDO PASSADO NO INPUT.
    SET_ACOMPANHANTES_WATCH(state, payload) {
      state.setAcompanhantesWatch = payload;
    },

    // TODO: VALIDA SE É DESKTOP.
    SET_DESKTOP(state, payload) {
      state.desktops = payload;
    }
  };
  
  const actions = {
    async getConfirmaition({ commit }, payload) {
      commit('PUT_CONFIRM_ANIVER', payload.e);

    },

    async switchConfirmAcompanhante({ commit }, valerAcomp) {
          commit('SET_CONFIRM_ACOMPANHANTE', valerAcomp);
    },

    async itemsAcompanhantes({ commit }, payload) {
          commit('ADD_ITEM_ACOMPANHANTES', payload);
    },
    
    async acompanhanteValidado({ commit }, payload) {
          commit('ACOMPANHANTE_VALIDADO', payload);
    },

    async qtdd_accampp({ commit }, payload) {
          commit('QTD_ACOMT', payload);
    },

    async setSomaAcomp({ commit }, payload) {
          commit('SET_SOMA_ACOMPANHANTES', payload);
    },

    // TODO: RECEBE SÓ O VALOR DO INPUT DE QUANTIDADE DE ACOMPANHANTE.
    async setAcompWatch({ commit }, payload) {
          commit('SET_ACOMPANHANTES_WATCH', payload);
    },

    // TODO: RECEBE O VALOR SE FOR DESKTO.
    async setDesktop({ commit }, payload) {
          commit('SET_DESKTOP', payload);
    },
  };
  
  const getters = {
    // produtos : state => state.produtos,
  };
  
  export default {
    namespaced: true, // isso permite que o módulo tenha um namespace próprio.
    state,
    mutations,
    actions,
    getters
  };
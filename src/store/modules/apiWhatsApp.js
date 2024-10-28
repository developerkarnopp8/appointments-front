import axios from 'axios';

  const state = {
    response: null
  }
  const mutations = {
    SET_RESPONSE(state, response) {
      state.response = response;
    }
  }
  const actions = {
    sendWhatsAppMessage({ commit }, payload) {
        console.log(payload)
      const url = 'https://cluster.apigratis.com/api/v1/whatsapp/sendText';
      const headers = {
        'Content-Type': 'application/json',
        'SecretKey': 'xxxxxxxxxxxxxxxxxxx',
        'PublicToken': 'xxxxxxxxxxxxxxxxxxx',
        'DeviceToken': 'xxxxxxxxxxxxxxxxxxx',
        'Authorization': 'Bearer xxxxxxxxxxxxxxxxxxx',
      };
      const body = {
        number: payload.number || '555555555555',
        text: payload.text || 'Isso é um texto'
      };

      axios.post(url, body, { headers })
        .then(response => {
          commit('SET_RESPONSE', response.data);
        })
        .catch(error => {
          console.error('Error sending message:', error);
        });
    }
  }
  const getters = {
    // produtos : state => state.produtos,
  };

  export default {
    namespaced: true, // isso permite que o módulo tenha um namespace próprio
    state,
    mutations,
    actions,
    getters
  };

const state = {
        enviaProduto: '',
        snackbar: {
            valu : false,
            message: '',
            currentUrl: null
        },
        clickButtonNavbarr: false
    };

    const mutations = {
        SET_PRODUTO_DETAILS(state, payload) {
            let dataReutils = []
            state.enviaProduto = payload.img;
            dataReutils.push(payload.img),
            setItemLocal('data_reutils', dataReutils);
        },
        SNACKBAR(state, payload) {
            state.snackbar = payload;
        },

        CLICK_BUTTON_NAVBAR(state, payload) {
            state.clickButtonNavbarr = payload;
        },
        setCurrentUrl(state, url) {
            state.currentUrl = url;
        }
    };

    const actions = {
        async enviaProduto({ commit }, payload) {
            await commit('SET_PRODUTO_DETAILS', payload);
        },

        async clickButtonNavbarr({ commit }, payload) {
            await commit('CLICK_BUTTON_NAVBAR', payload);
        },
        
        // ? ATIMA O SNACKBAR PARA MENSAGEM 
        async snackMessage({commit}, payload){
            if(payload){
                let resp = {
                    message:'Link Copiado.',
                    color: 'warning',
                    valu : true
                }
                commit('SNACKBAR', resp)
            }
        },
        getCurrentUrl({ commit }) {
            commit('setCurrentUrl', window.location.origin);
        }
    };

    const getters = {
        enviaProduto : state => state.enviaProduto,
    };

    export default {
        namespaced: true, // isso permite que o módulo tenha um namespace próprio
        state,
        mutations,
        actions,
        getters
    };
import { setCookie } from './../../Controller/Util.controller'

const cookieModule = {
        
        state: () => ({
        cookieConsent: false, // ou um objeto detalhado, se necessário
        // Outras configurações relacionadas a cookies
        }),
        mutations: {
        SET_COOKIE_CONSENT(state, consent) {
            state.cookieConsent = consent;
        },
        // Outras mutações conforme necessário
        },
        actions: {
            updateCookieConsent({ commit }, consent) {
                console.log(consent,'teste')
                commit('SET_COOKIE_CONSENT', consent);

                //TODO: VAI ARMAZENAR DADOS POR 365 DIAS
                setCookie('cookieConsent', consent, 365)
                // localStorage.setItem('cookieConsent', consent);
                // Atualizar o armazenamento local/cookies do navegador aqui
            },
        },
        getters: {
            cookieConsent: state => state.cookieConsent,
        }
    };
    
    export default cookieModule;
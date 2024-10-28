import axios from 'axios';
import $router from "@/router";
import { setItem as setItemLocal, getItem as getItemLocal, removeItem as removeItemLocal } from '@/util/localStorage';
// import confirmAuth from '../modules/confirmAuth';

const API_URL = process.env.VUE_APP_API_URL
const state = {
    isAuthenticated: false,
    user: null,
    error: null,
    accessToken: null,
    aniversariante: null,
    getTodosEventos: null,
    idParams: null,
    snackbar: {
        valu : false,
        color: '',
        message: ''
    },
    ja_confirmou: false,
    qtdConvidadosConfirmados: null,
    dadosConvidadosAcompanhantes: null,
    acompanhante: {},
    qtd_total_acompanhantes: 0,
    qtd_total_confirmada: 0,
    active: [],
    ip_user : null
};

const mutations = {
    SET_AUTHENTICATED(state, value) {
        state.isAuthenticated = value;
    },

    SET_TODOS_EVENTOS(state, value) {
        state.getTodosEventos = value;
    },

    ANIVERSARIANTE(state, value) {
        state.aniversariante = value;
    },

    SET_USER(state, user) {
            state.user = user;
    },

    SET_ERROR(state, error) {
        state.error = error;
    },

    SET_PARAMS(state, value) {
        state.idParams = value;
    },

    QTD_CONVIDADOS_CONFIRMADOS(state, value) {
        state.qtdConvidadosConfirmados = value;
    },

    DADOS_CONVIDADOS_ACOMPANHANTES(state, value) {
        state.dadosConvidadosAcompanhantes = value;
    },

    SNACKBAR(state, payload) {
        state.snackbar = payload;
    },

    JA_CONFIRMOU(state, payload) {
        state.ja_confirmou = payload;
    },

    CONVIDADO_ACOMPANHANTE (state, payload) {
        state.acompanhante = payload;
    },

    QTD_TOTAL_ACOMPANHANTE (state, payload) {
        state.qtd_total_acompanhantes = payload;
    },
    QTD_TOTAL_CONF (state, payload) {
        state.qtd_total_confirmada = payload;
    },

    IP_USER (state, payload) {
        state.ip_user = payload;
    },

    updateAccessToken(state, token) {
        state.accessToken = token;

        if (token) {

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        } else {

        delete axios.defaults.headers.common['Authorization'];

        }
    },
};

const actions = {
    async snacBarr({commit}, payload){
        commit('SNACKBAR', payload)
    },

    //FIXME: FAZ O LOGIN DENTRO DO SISTEMA 
    async login({ commit }, credentials) {
        try {
            const response = await axios.post(`${API_URL}/api/auth/local`, credentials);

            const user = response.data.user;

            if (response.data && response.data.jwt) {

                commit('updateAccessToken', response.data.jwt);

                setItemLocal('accessToken', response.data.jwt);

            }
            
            const session = {
                user : response.data.user,
                isAuthenticated: true
            };
            
            setItemLocal('session',session)
            
            commit('SET_AUTHENTICATED', true);

            commit('SET_USER', user);

            commit('SET_ERROR', null);

            let token = getItemLocal('accessToken')
            if(token) {
                $router.push({ name: 'Aniversariante', params: { id: response.data.user.id }});
            }


        } catch (error) {
            if(error){
                let resp = {
                    message: error.response.data.error.message,
                    color: 'error',
                    valu : true
                }
                commit('SNACKBAR', resp)
            }
            commit('SET_AUTHENTICATED', false);

            commit('SET_USER', null);

            commit('SET_ERROR', error.response.data.error.message);

        }
    },

    //FIXME: DESLOGA DO SISTEMA E LIMPA O STORAGE 
    logout({ commit }) {
        commit('updateAccessToken', null);
        removeItemLocal('accessToken');
        removeItemLocal('session');

        //! ESTOU REMOVENDO OS VALORES DA SESSÃO APÓS DESLOGADO, MONITORAR PARA CASO DE PROBLEMAS
        removeItemLocal('confimations');
        removeItemLocal('confimationsSuccess');
        
        $router.push({ name: 'Cadastro'}).catch(err => {
            if (err.name !== 'NavigationDuplicated') {
              throw err;
            }
          });
        // $router.push({ name: 'Cadastro'});

    },

    //FIXME: FAZ O REGISTRO DO USER DENTRO DO SISTEMA 
    async register({ commit }, userData) {
        try {
            const response = await axios.post(`${API_URL}/api/auth/local/register`, userData);

            if(response && response.data && response.data.user && response.data.user.id){
                if(response && response.data && response.data.user && response.data.user.id){
                    let resp = {
                        message: 'Cadatro realizado.',
                        color: 'success',
                        valu : true
                    }
                    commit('SNACKBAR', resp)
                }
                $router.push({ name: 'Login' })
            }else{
                setTimeout(() => {
                    if(response && response.data && response.data.user && response.data.user.id){
                        let resp = {
                            message: 'Cadatro realizado.',
                            color: 'success',
                            valu : true
                        }
                        commit('SNACKBAR', resp)
                    }
                    $router.push({ name: 'Login' });
                }, 1000)
            }


        } catch (error) {
            if(error){
                let resp = {
                    message: error.response.data.error.message,
                    color: 'error',
                    valu : true
                }
                commit('SNACKBAR', resp)
            }
            commit('SET_AUTHENTICATED', false);

            commit('SET_USER', null);

            commit('SET_ERROR', error.response.data.error.message);
        }
    },

    async registerEvento({ commit }, userData) {
        try {
            if(userData){
                const response = await axios.post(`${API_URL}/api/confimations`, {data : userData});
                if(response){
                    let resp = {
                        message:'Cadastro realizado com sucesso.',
                        color: 'success',
                        valu : true
                    }
                    commit('SNACKBAR', resp)
                }
            }
            
        } catch (error) {

            commit('SET_AUTHENTICATED', false);

            commit('SET_USER', null);
        }
    },

    //FIXME: RETORNA TODOS OS EVENTOS
    async getTodosEventos({ commit }, idTodosEventos) {

        try {
            const response = await axios.get(`${API_URL}/api/users/${idTodosEventos.id}?populate=*`);

            commit('SET_TODOS_EVENTOS', response.data);
            
        } catch (error) {

            commit('SET_AUTHENTICATED', false);

            commit('SET_USER', null);

            commit('SET_ERROR', error.response.data.message);

        }
    },

    //TODO:IMPORTANTE PARA ENVIAR OS CONVIDADOS ATUALIZADO 
    async getEventoURLCriado({ commit }, idTodosEventos) {
        try {

            const response = await axios.get(`${API_URL}/api/confimations/${idTodosEventos.id}?populate=*`);

            let resp = response.data.data.attributes
            //executa a validação do ip do user
            const ip = await axios.get('https://api.ipify.org?format=json');

            commit('IP_USER', ip.data.ip); 

            // Passa a mensagem de que ja está confirmado.
            if(resp && resp.nome_convidados && resp.nome_convidados.data.some(item => item.attributes.ip_user === ip.data.ip)){
                let resp = {
                        message:'Você já confirmou sua presença!',
                        color: 'error',
                        valu : true
                    }
                    commit('SNACKBAR', resp)
                    commit('JA_CONFIRMOU', true)
            }else{
                let DADOS = {
                    nome_aniversariante: resp.nome_aniversariante,
                    nome_convidados: resp.nome_convidados,
                    data_evento: resp.data_evento,
                    hora_evento: resp.hora_evento,
                    local_evento: resp.local_evento, 
                    qtd_esperada_convidados: resp.qtd_esperada_convidados,  
                    qtd_confirmado_convidados: resp.qtd_confirmado_convidados,  
                    qtd_nao_confirmado_convidados:resp.qtd_nao_confirmado_convidados,
                    qtd_acompanhantes_confirm: resp.qtd_acompanhantes_confirm,
                }
                setItemLocal('confimations', response.data.data);
                return commit('ANIVERSARIANTE', DADOS);            
            }
            
        } catch (error) {
            commit('SET_AUTHENTICATED', false);
            commit('SET_USER', null);
        }
    },

    //TODO: PEGA OS USUÁRIOS PARA A CONFIRMAÇÃO Após True chama o putEventoURLCriado
    async putEventoURLCriado({ commit, dispatch  }, idTodosEventos) {
        try {        
            // Fazer a requisição PUT
            const response = await axios.put(`${API_URL}/api/confimations/${idTodosEventos.id}`, idTodosEventos.dados);
            if(response){
                await dispatch('postConvidadosConf');
            }
        } catch (error) {
            commit('SET_AUTHENTICATED', false);
            commit('SET_USER', null);
        }
    },
    async putEventoURLAtualiza({ commit }, idTodosEventos) {
        try {        
            // Fazer a requisição PUT
            await axios.put(`${API_URL}/api/confimations/${idTodosEventos.id}`, idTodosEventos.dados);
        } catch (error) {
            commit('SET_AUTHENTICATED', false);
            commit('SET_USER', null);
        }
    },

    //TODO: TRÁS CONVIDADOS PARA ATUALIZAR NA LISTA DE EVENTOS ATIVOS
    async getConfirmConvidado({ commit }, confirmaConvidado) {
        try {
            const response = await axios.get(`${API_URL}/api/confimations/${confirmaConvidado}?populate=*`);
            let resp = response.data.data.attributes.nome_convidados
            let children2 = []
            resp.data.forEach(element => {
                element.attributes['id'] = element.id
                children2.push(element.attributes)
            });
            commit('QTD_CONVIDADOS_CONFIRMADOS', children2);                       
        } catch (error) {
            commit('SET_AUTHENTICATED', false);
            commit('SET_USER', null);
        }
    },

    //FIXME: TRÁS OS DADOS DOS CONVIDADOS
 
    async getNomeConvidados({ commit }, nomeConvidados) {
        try {
            const resp = await axios.get(`${API_URL}/api/nome-convidados/${nomeConvidados}?populate=*`);
            let respo = resp.data.data.attributes.acompanhantes;
            let dta_convidados = []
            respo.data.forEach(element => {
                element.attributes["id"] = element.id
                dta_convidados.push(element.attributes)
            });
            commit('DADOS_CONVIDADOS_ACOMPANHANTES', dta_convidados);                       
        } catch (error) {
            commit('SET_AUTHENTICATED', false);
            commit('SET_USER', null);
        }
    },
    //TODO: TUDO RELACIONADO A CONVIDADOS
    async postConvidados({ commit }, acompanhante) {
        try {
            commit('CONVIDADO_ACOMPANHANTE', acompanhante);

            } catch (error) {
    
                commit('SET_AUTHENTICATED', false);
    
                commit('SET_USER', null);
            }
        },
    
    //TODO: PASSA OS DADOS QUE FORAM SALVOS NO STATE PARA ENVIAR PARA O BANCO APÓS ISSO CHAMA O postAcompanhante
    async postConvidadosConf({state, commit}) {

        try {
            if(state.acompanhante){
                const response = await axios.post(`${API_URL}/api/nome-convidados`, {data : state.acompanhante});
                let data = response.data.data
                data.attributes['id'] = data.id 
                setItemLocal('confimationsSuccess', data);
            }
            
        } catch (error) {

            commit('SET_AUTHENTICATED', false);

            commit('SET_USER', null);
        }
    },

    async postAcompanhante({commit}, payload) {
        
        //TODO: PEGA O ID NO LOCAL STORAGE.
        let dataId = getItemLocal('confimationsSuccess');
        
        //ADICIONA O ID NO PAYLOAD PARA SER ENVIADO NO PARAMETRO
        payload.forEach(item => {
            item["nome_convidado"] = String(dataId.id);
        });

        try {

            if(payload.length > 0){

                const result = await payload.reduce(async (previousPromise, currentItem) => {

                    await previousPromise;  // Aguarde a conclusão da requisição anterior.

                    const response = await axios.post(`${API_URL}/api/acompanhantes`, { "data": currentItem });

                    return response;  // Retornar a resposta para o próximo ciclo.

                }, 
                
                Promise.resolve());  // Valor inicial de uma Promessa resolvida.
                    let resp = {
                        message:'Confirmação enviada com sucesso!',
                        color: 'success',
                        valu : true
                    }

                    commit('SNACKBAR', resp);

                    let data = getItemLocal('confimationsSuccess');

                    $router.push({ name: 'Success', params: { id: data.attributes.nome_convidado }});

                return result;  // Retorna a resposta da última requisição.

            }else{

                let resp = {
                    message:'Confirmação enviada com sucesso!',
                    color: 'success',
                    valu : true
                }

                commit('SNACKBAR', resp);

                //TODO: PEGA O LOCAL STORAGE.
                let data = getItemLocal('confimationsSuccess');

                //TODO: FAZ O REDIRECIONAMENTO PARA A PÁGINA DE SUCESSO CASO SEJA SEM ACOMPANHANTES.
                $router.push({ name: 'Success', params: { id: data.attributes.nome_convidado }})
            }
            
        } catch (error) {
            console.error('Erro ao enviar itens:', error);
            if (error.response) {
                console.error('Detalhes do erro:', error.response.data);
            }
        }
    },
    
    async getTodosConvidados({ commit }) {
        try {
            const respNomeConvidados = await axios.get(`${API_URL}/api/nome-convidados`);
            const respNomeAcompanhantes = await axios.get(`${API_URL}/api/acompanhantes`);
            let qtd_convidados = respNomeConvidados.data.data.length;;
            let qtd_acompanhantes = respNomeAcompanhantes.data.data.length;

            let qtd_total = (qtd_convidados + qtd_acompanhantes);
            commit('QTD_TOTAL_ACOMPANHANTE', qtd_total);     

        } catch (error) {
            commit('SET_AUTHENTICATED', false);
            commit('SET_USER', null);
        }
    },

    async getTodosConvidadosAtualizar({ commit }) {
        try {
            const respNomeConvidados = await axios.get(`${API_URL}/api/nome-convidados`);
            const respNomeAcompanhantes = await axios.get(`${API_URL}/api/acompanhantes`);

            let qtd_convidados = respNomeConvidados.data.data.length;;
            let qtd_acompanhantes = respNomeAcompanhantes.data.data.length;

            let qtd_total = (qtd_convidados + qtd_acompanhantes);
            commit('QTD_TOTAL_CONF', qtd_total);  
            
        } catch (error) {
            commit('SET_AUTHENTICATED', false);
            commit('SET_USER', null);
        }
    },
};

const getters = {
    setAuth : state => state.isAuthenticated,
    setTodosEventos : state => state.getTodosEventos,
    setUser : state => state.user,
    setError : state => state.error,
};

export default {
    namespaced: true, // isso permite que o módulo tenha um namespace próprio
    state,
    mutations,
    actions,
    getters
};
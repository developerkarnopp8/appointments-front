<template>
    <v-container >
        <v-row class="d-flex align-center justify-center">
            <v-col cols="12">
                <v-col cols="12">
                    <v-row >
                        <v-col cols="12" md="6">
                            <v-text-field
                                outlined
                                v-model="acompanhante.nome_convidado"
                                label="NOME DO CONVIDADO"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field
                                outlined
                                v-model="acompanhante.phone_contato"
                                label="SEU CONTATO"
                                v-mask="'###########'"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <strong>CADASTRAR ACOMPANHANTES?</strong>
                            <v-row class="d-flex align-center justify-center" >
                                <v-col cols="12" md="4">
                                    <v-switch
                                        v-model="acompanhante.acompBOLEAN"
                                        :label="acompanhante.acompBOLEAN ? `SIM`: `NÃO`"
                                    ></v-switch>
                                </v-col>
                                <v-col cols="12" md="4">
                                        <v-select
                                            v-if="acompanhante.acompBOLEAN"
                                            :items="qtdAcompaSelect"
                                            label="QUANTOS?"
                                            required
                                            outlined
                                            v-model="acompanhante.qtd_acompanhantes"
                                        >
                                    </v-select>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <div v-if="acompanhante.acompBOLEAN && acompanhante.qtd_acompanhantes > 0">
                                        <InputsListaConfirmadoAcompanhante/>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="12" v-if="$store.state.confirmAuth.itemsAcompanhantes.length != 0">
                    <div>
                        <strong>ACOMPANHANTES CADASTRADOS</strong>
                    </div>
                    <v-row v-for="(item, index) in getStoreItemsAcompanhantes" :key="index">
                        <v-col class="">
                            <v-row>
                                <v-col cols="4" class="d-flex align-center">
                                    <v-icon class="ma-2">mdi-account-group</v-icon>
                                    <small class="ma-2">{{item.name_acompanhante}}</small>
                                </v-col>
                                <v-col cols="4">
                                    <small class="ma-2">{{item.categoria_acompanhantes}}</small>
                                </v-col>
                                <v-col cols="4">
                                    <li class="ma-2" @click="removeIterm(index)"><v-icon>mdi-delete</v-icon></li>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="12">
                    <v-switch
                    :disabled="acompanhante.nome_convidado == null || acompanhante.phone_contato == null"
                    v-model="switchConfirm"
                    label="SIM VOU COMPARECER"
                ></v-switch>
                </v-col>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import { VueMaskDirective } from 'v-mask';

//TODO: MODAL DE CADASTRO DOS ACOMPANHANTES.
import InputsListaConfirmadoAcompanhante from '../components/ListaConfirmados/InputsListaConfirmadoAcompanhante.vue';

import { mapActions } from 'vuex';
const axios = require('axios');
    export default {
        directives: {
            mask: VueMaskDirective,
        },
        data () {
        return {
            qtdAcompaSelect: [0, 1, 2, 3, 4, 5],
            teste: false,
            acompanhante: {
                    conf: 1,
                    nome_convidado: null,
                    phone_contato: null,
                    acompBOLEAN: false,
                    qtd_acompanhantes: 0,
                    itemsAcompanhantes: null,
                    ip_user: null
                }
            }
        },

        components: {
            InputsListaConfirmadoAcompanhante,
        },

        mounted(){
            //TODO: MONTA O IP DO USER PARA FAZER A VALIDAÇÃO NA CONFIRMAÇÃO QUANDO CARREGA A PÁGINA.
            this.getUserIP();

        },
        computed: {
            
            switchConfirm: {

                get(){
                    return this.$store.state.confirmAuth.switchConfirm === 1;
                },

                set(value) {
                    this.$store.state.confirmAuth.switchConfirm = value ? 1 : 0;
                },

            },

            //TODO: RETORNA OS ACOMPANHANTES QUE FORAM SETADOS.
            getStoreItemsAcompanhantes(){
                return this.$store.state.confirmAuth.itemsAcompanhantes;
            },
        },
        watch:{

            // TODO: FICA MONITORANDO O SWITCH E REMOVE OS ACOMPANHANTES CASO SEJA  FALSE
            'acompanhante.acompBOLEAN'(e){
                if(!e){
                    this.remove()
                }
            },
            
            //TODO: FICA VERIFICANDO O INPUT DA QUANTIDADE DE ACOMPANHANTE E QUANDO MUDAR ATUALIZA O VALOR NO STATE.
            "acompanhante.qtd_acompanhantes" (e){
                this.setAcompWatch(e);
                if(e == 0){
                    this.remove()
                }
            },

            //TODO: QUANDO O switchConfirm FOR true ELE VAI SETAR A PRIMEIRA OPÇÃO PARA O VUEX.
            switchConfirm(novoValor) {
                this.acompanhante.itemsAcompanhantes = this.getStoreItemsAcompanhantes.length > 0 ? this.getStoreItemsAcompanhantes : [];
                this.setSomaAcomp(this.acompanhante); //TODO: SETA NO confirmAuth/setSomaAcomp TODOS OS DADOS ATUALIZADOS DA CONFIRMAÇÃO.
            
            //TODO: QUANDO O switchConfirm FOR false VAI LIMPAR E REMOVER TODOS OS DADOS.
                if(!novoValor){
                this.acompanhante.nome_convidado = null;
                this.acompanhante.phone_contato = null;
                this.acompanhante.acompBOLEAN = false;
                this.acompanhante.ip_user = null;
                this.remove()
                }
            },
        },
        methods:{

            ...mapActions({
                // getIpeUser: 'auth/getIpeUser',
                setSomaAcomp: 'confirmAuth/setSomaAcomp',
                setAcompWatch: 'confirmAuth/setAcompWatch',
            }),

            //TODO: REMOVE TODOS OS ITEMS DO CARRINHO QUANDO RETIRAR O VALOR DO INPUT.
            remove(){
                const items = this.getStoreItemsAcompanhantes;
                items.splice(0);
            },

            //TODO: REMOVE UM ITEM POR VEZ.
            removeIterm(item){
                const items = this.getStoreItemsAcompanhantes;
                items.splice(item, 1);
            },
            

            //TODO: FUNÇÃO QUE CAPTURA O IP DO USUÁRIO QUE CONFIRMOU
            async getUserIP() {
                const response = await axios.get('https://api.ipify.org?format=json');
                this.acompanhante.ip_user = response.data.ip
                // this.getIpeUser(response.data.ip)
            }
        },
    }
</script>
<style >
.v-text-field__details{
    display: none;
}
.v-messages{
    display: none;
}
</style>
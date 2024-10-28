<template>
    <v-card>
        <v-card-title class="indigo white--text text-h5">
            LISTA DE CONFIRMADOS
        </v-card-title>
        <v-row
            class="pa-4"
            justify="space-between"
        >
        <v-expansion-panels>
            <v-expansion-panel
                v-for="(item,i) in qtdConfirmadosChildren"
                :key="i"
                >
                <v-expansion-panel-header @click="teste(item.id)" >
                    <v-row>
                        <v-col>
                            <v-icon >
                                mdi-account
                            </v-icon>
                            {{item.nome_convidado}}
                        </v-col>
                    </v-row>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-card
                        class="pt-6 mx-auto"
                        flat
                        >
                        <v-row>
                            <v-col cols="12">
                                <div
                                style="align-self: center;"
                                >
                                <h4>
                                    ACOMPANHANTES DOS CONVIDADOS.
                                </h4>
                            </div>
                        </v-col>
                        <v-divider></v-divider>
                            <v-col cols="12" >
                                <v-row class="d-flex align-center justify-center ">
                                    <v-col cols="12" md="6">
                                        <v-row class="d-flex align-center justify-center ">
                                            <v-col
                                                cols="12"
                                                md="6"
                                                class="text-small black--text text--lighten-4 font-weight-light"
                                                >
                                                QUANTIDADE DE ACOMPANHANTES
                                                </v-col>
                                                <v-col cols="12" class="" md="6" >{{ item.qtd_acompanhantes }}</v-col>
                                        </v-row>
                                    </v-col>
                                    <v-divider vertical></v-divider>
                                    <v-col cols="12" md="6">
                                        <v-row class="d-flex align-center justify-center ">
                                            <v-col
                                            cols="12"
                                            md="6"
                                            class="text-small black--text text--lighten-4 font-weight-light"
                                            >
                                            TELEFONE PARA CONTATO
                                            </v-col>
                                            <v-col cols="12" class="" md="6" >{{ item.phone_contato }}</v-col>
                                        </v-row>
                                    </v-col>
                                    <v-divider ></v-divider>
                                </v-row>
                            </v-col>
                        </v-row>
                        <v-row v-if="dadosConvidadosAcompanhantes && dadosConvidadosAcompanhantes.length > 0" >
                            <v-col cols="12">
                                <v-card style="background: rgba(1, 156, 161, 0.5);" class="ma-2 pa-2">
                                        <v-row>
                                            <v-col cols="12" md="6">
                                                <strong>
                                                    NOME ACOMPANHANTE
                                                </strong>
                                                <div v-for="(acompanhanteItems, nam) in dadosConvidadosAcompanhantes" :key="nam">
                                                    <small>
                                                        {{ acompanhanteItems.name_acompanhante }}
                                                    </small>
                                                </div>
                                            </v-col>
                                            <v-divider vertical class="mt-2 mb-2" ></v-divider>
                                            <v-col cols="12" md="6">
                                                <strong>
                                                    CATEGORIA
                                                </strong>
                                                <div v-for="(acompanhanteItems, cat) in dadosConvidadosAcompanhantes" :key="cat">
                                                    <small>
                                                        {{ acompanhanteItems.categoria_acompanhantes }}
                                                    </small>
                                                </div>
                                            </v-col>
                                        </v-row>
                                </v-card>
                            </v-col>
                        </v-row>
                        </v-card>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-row>
        </v-card>
    </template>
    <script>
    import { mapActions } from 'vuex';

    const pause = ms => new Promise(resolve => setTimeout(resolve, ms))

    export default {
        data(){
            return {
                active: [],
                open: null,
                users: [],
            }
        },
        mounted(){
            this.fetchUsers()
        },

        props:{
            propConfirm:{
                type: Number,
                required: true
            }
        },
        computed: {

            // TRAZ OS CONFIRMADOS COM ACOMPANHANTES E SEM
            qtdConfirmadosChildren() {
                return this.$store.state.auth.qtdConvidadosConfirmados;
            },

            // TODO: TRÁZ DADOS TODOS OS CONVIDADOS
            dadosConvidadosAcompanhantes() {
                return this.$store.state.auth.dadosConvidadosAcompanhantes;
            }
        },

        methods: {
            ...mapActions({
                getConfirmConvidado: 'auth/getConfirmConvidado',
                getNomeConvidados: 'auth/getNomeConvidados',
            }),
            async fetchUsers () {
                this.chamaEventos()
                await pause(2000)
                
                this.qtdConfirmadosChildren.forEach(element => {
                    element['name'] = element.nome_convidado
                });

                
            },
            async teste(item){
                this.getNomeConvidados(item)
            },
            chamaEventos(){
                this.getConfirmConvidado(this.propConfirm)
            },
        },
    }
</script>
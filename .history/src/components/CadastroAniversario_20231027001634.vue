<template>
    <v-container>
        <v-row class="d-flex align-center justify-center">
            <v-col cols="12" md="6" class="d-flex align-center justify-center" style="height: 100vh;">
                <v-container>
                <v-form ref="form">
                    <v-row>
                        <v-col cols="12" class="animate__animated animate__bounce">
                            <div class="d-flex flex-column align-center justify-center">
                                <img src="../assets/images/IMGLOGO1.png" width="200" alt="">
                                <v-card-title>CADASTRAR EVENTO</v-card-title>
                            </div>
                        </v-col>
                        <v-col cols="12" >
                            <v-text-field
                                    class="labe"
                                    v-model="register_evento.nome_aniversariante"
                                    label="NOME DO ANIVERSÁRIANTE"
                                    placeholder="Ex: Francisco da Silva Rodrigues"
                                    solo
                                    rounded
                                    outlined
                                    dense
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" >
                            <v-text-field
                                    class="labe"
                                    v-model="register_evento.nome_responsavel"
                                    label="NOME DO RESPONSÁVEL"
                                    placeholder="Ex: João da Silva Rodrigues"
                                    solo
                                    rounded
                                    outlined
                                    dense
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" >
                            <v-text-field
                                    class="labe"
                                    v-model="register_evento.qtd_esperada_convidados"
                                    label="QUANTOS CONVIDADOS?"
                                    placeholder="Ex: 100"
                                    solo
                                    rounded
                                    outlined
                                    dense
                                    type="number"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-dialog
                                ref="dialogue"
                                v-model="modal2"
                                :return-value.sync="register_evento.hora_evento"
                                persistent
                                width="290px"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    class="labe"
                                    v-model="register_evento.hora_evento"
                                    label="HORA DO EVENTO"
                                    prepend-icon="mdi-clock-time-four-outline"
                                    placeholder="Hora Evento"
                                    solo
                                    rounded
                                    outlined
                                    dense

                                    v-bind="attrs"
                                    v-on="on"
                                ></v-text-field>
                                </template>
                                <v-time-picker
                                v-if="modal2"
                                v-model="register_evento.hora_evento"
                                full-width
                                >
                                <v-spacer></v-spacer>
                                <v-btn
                                    text
                                    color="primary"
                                    @click="modal2 = false"
                                >
                                    Cancel
                                </v-btn>
                                <v-btn
                                    text
                                    color="primary"
                                    @click="$refs.dialogue.save(register_evento.hora_evento)"
                                >
                                    OK
                                </v-btn>
                                </v-time-picker>
                            </v-dialog>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-dialog
                                ref="dialog"
                                v-model="modal"
                                :return-value.sync="register_evento.data_evento"
                                persistent
                                width="290px"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    class="labe"
                                    v-model="register_evento.data_evento"
                                    label="DATA DO EVENTO"
                                    prepend-icon="mdi-calendar"
                                    placeholder="Data Evento"
                                    solo
                                    rounded
                                    outlined
                                    dense
                                    v-bind="attrs"
                                    v-on="on"
                                ></v-text-field>
                                </template>
                                <v-date-picker
                                v-model="register_evento.data_evento"
                                scrollable
                                >
                                <v-spacer></v-spacer>
                                <v-btn
                                    text
                                    color="primary"
                                    @click="modal = false"
                                >
                                    Cancel
                                </v-btn>
                                <v-btn
                                    text
                                    color="primary"
                                    @click="$refs.dialog.save(register_evento.data_evento)"
                                >
                                    OK
                                </v-btn>
                                </v-date-picker>
                            </v-dialog>
                        </v-col>
                        <v-col cols="12" >
                            <v-textarea
                                class="labe"
                                v-model="register_evento.local_evento"
                                solo
                                auto-grow
                                label="LOCAL DO EVENTO"
                                placeholder="Ex: Rua Baraão, 1190, Centro, Santa Cruz do Sul - RS"
                                rows="4"
                                row-height="30"
                                shaped
                                outlined
                            ></v-textarea>

                        </v-col>
                    </v-row>
                </v-form>
                <v-row>
                    <v-col cols="4"></v-col>
                    <v-col cols="4">
                        <v-btn
                            color="orange"
                            block
                            @click="registrarEvento()"
                        >
                            Enviar
                        </v-btn>
                    </v-col>
                    <v-col cols="4"></v-col>
                </v-row>
            </v-container>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
        import {getItem as getItemLocal} from '@/util/localStorage';
        import { mapActions } from 'vuex';
        import SwitchConfirmacao from '../components/SwitchConfirmacao'
        export default {
        name: 'Home',
        data () {
            return {
                register_evento:{
                    nome_aniversariante: null,
                    local_evento: null, 
                    qtd_esperada_convidados: null,
                    data_evento: null, //"2023-09-09",
                    hora_evento: null, //"12:54:00.000",
                    nome_responsavel: null,
                    users_permissions_user: 0 //PASSA ESSE ID QUE VEM NA URL PARA IDENTIFICAR PARA QUAL USER DEVE SE POSTO
                },
                date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),

                menu: false,
                modal: false,
                menu2: false,

                time: null,
                menu2: false,
                modal2: false,
            }
        },
        components: {
            SwitchConfirmacao,
        },
        methods: {
            ...mapActions({
                setRegisterEvento: 'auth/registerEvento',
            }),
            registrarEvento(){
                let idUser = getItemLocal('session')
                this.setRegisterEvento({
                    nome_aniversariante: this.register_evento.nome_aniversariante,
                    local_evento: this.register_evento.local_evento, 
                    qtd_esperada_convidados: this.register_evento.qtd_esperada_convidados,
                    data_evento: this.register_evento.data_evento, //"2023-09-09",
                    hora_evento: this.register_evento.hora_evento + ':00.000', //"12:54:00.000",
                    nome_responsavel: this.register_evento.nome_responsavel,
                    users_permissions_user: idUser.user.id
                });
                this.$refs.form.reset();
            }
        }
        
    }
</script>
<style>
.theme--light.v-text-field--filled > .v-input__control > .v-input__slot {
    background: rgb(231 240 254) !important;
}
.labe .v-label {
    font-size: large;
    color: black !important;
  }
</style>
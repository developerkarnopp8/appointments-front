<template>
    <v-container>
        <v-row class="d-flex align-center justify-center">
            <v-col cols="12" md="6" :class=" setDesktop ? '': 'stileCadastroEvento'" class=" d-flex align-center justify-center" >
                <v-container>
                <v-form ref="form">
                    <v-row>
                        <v-col cols="12" class="animate__animated animate__bounce">
                            <div class="d-flex flex-column align-center justify-center">
                                <img src="../assets/images/IMGLOGO1.png" width="200" alt="">
                                <v-card-title>CADASTRAR EVENTO</v-card-title>
                                <!-- <v-card-title>CADASTRAR EVENTO {{setDesktop}} foi teste</v-card-title> -->
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
                        <v-col cols="12">
                        <v-row>
                            <v-col cols="12" md="6" >
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
                                <v-text-field
                                    class="labe"
                                    outlined
                                    v-model="register_evento.contato_confirm"
                                    label="SEU CONTATO"
                                    v-mask="'###########'"
                                    placeholder="55 9 9999-9999"
                                    solo
                                    rounded
                                    dense
                                    type="number"
                                ></v-text-field>
                            </v-col>
                        </v-row>
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
                            <v-row justify="center">
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
                                    :value="formatDate(register_evento.data_evento)"
                                    @input="register_evento.data_evento = parseDate($event)"
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
                                    year-icon="mdi-calendar-blank"
                                    :allowed-dates="allowedDates"
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
                            </v-row>
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
    import { VueMaskDirective } from 'v-mask';
    export default {
        directives: {
            mask: VueMaskDirective,
        },
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
                    contato_confirm: null,
                    users_permissions_user: 0 //PASSA ESSE ID QUE VEM NA URL PARA IDENTIFICAR PARA QUAL USER DEVE SE POSTO
                },
                date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),

                menu: false,
                modal: false,
                menu2: false,

                time: null,
                menu2: false,
                modal2: false,

                //TODO: FAZ OS DIAS QUE JA PASSARAM FICAREM DESABILITADOS NO CALENDAR DE CRIAÇÃO DO EVENTO
                minDate: new Date().toISOString().substr(0, 10),
            }
        },
        components: {
            SwitchConfirmacao,
        },
        computed:{
            setDesktop(){
                return this.$store.state.confirmAuth.desktops
            },
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
                    contato_confirm: this.register_evento.contato_confirm,
                    users_permissions_user: idUser.user.id
                });
                this.$refs.form.reset();
            },

            //TODO: FORMATA AS DATA CORRETAMENTE DENTRO DO INPUT DE DATE
            formatDate(date) {
                if (!date) return null;

                const [year, month, day] = date.split('-');
                return `${day}/${month}/${year}`;
            },
            
            parseDate(date) {
                if (!date) return null;

                const [day, month, year] = date.split('/');
                return `${year}-${month}-${day}`;
            },

            allowedDates(date) {
                const currentDate = new Date();

                //TODO: .padStart(2, '0'): Garantir que o mês e o dia tenham sempre dois dígitos, preenchendo com um zero à esquerda se necessário. Por exemplo, transforme "9" em "09".
                const currentDateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
                
                return date >= currentDateString;
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
.stileCadastroEvento{
    height: 100vh;
}

/* TODO: Dispositivos móveis extra pequenos (telefones, até 600px) */
@media (max-width: 600px) { 
    .stileCadastroEvento{
        height: 110vh !important;
    } 
}

/* TODO: Dispositivos móveis pequenos (telefones, 600px e acima) */
@media (min-width: 600px) { 
    .stileCadastroEvento{
        height: 120vh;
    } 
}

/* TODO: Dispositivos móveis médios (tablets, 768px e acima) */
@media (min-width: 768px) { 
    .stileCadastroEvento{
        height: 110vh;
    } 
}

/* TODO: Dispositivos grandes (desktops, 992px e acima) */
@media (min-width: 992px) { 
    .stileCadastroEvento{
        height: 94vh !important;
    } 
}

/* TODO: Dispositivos extra grandes (desktops grandes, 1200px e acima) */
@media (min-width: 1200px) { 
    .stileCadastroEvento{
        height: 100vh;
    } 
}

</style>
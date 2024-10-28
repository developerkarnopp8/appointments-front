<template>
    <v-container>
        <v-row>
            <v-col v-if="getTodosEventos && getTodosEventos.confirmations.length !== 0" cols="12" class="alturaMobileCart d-flex align-center justify-center" >
                <v-expansion-panels>
                    <v-expansion-panel v-for="(item,i) in getTodosEventos.confirmations"
                    @change="handlePanelChange"
                    :key="i"
                        color="#000000" style="border-radius: 0px 0px 10px 10px; border: 2px solid #686767;"
                    >
                        <v-expansion-panel-header expand-icon="mdi-menu-down" @click="handleClick(item)">
                            <v-row>
                                <v-col cols="12" md="6" class="d-flex align-center justify-center">
                                    <div class="ma-2 d-flex flex-column align-center justify-center">
                                        <strong>ANIVERSARIANTE</strong>
                                        <h4 class="ma-1">{{ item.nome_aniversariante }}</h4>
                                    </div>
                                    <div class="ma-2 d-flex flex-column align-center justify-center">
                                        <strong>RESPONSÁVEL</strong>
                                        <h4 class="ma-1">{{ item.nome_responsavel }}</h4>
                                    </div>
                                </v-col>
                                <v-col cols="12" md="6" class="d-flex flex-column align-center justify-center">
                                    <strong> DATA DO EVENTO</strong>
                                    <h4 class="ma-1">{{ $moment(item.data_evento).format('L') }}</h4>
                                </v-col>
                            </v-row>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content color="rgb(164 190 243)" style="border: 2px solid #020080; border-radius: 0px 0px 10px 10px;">
                            <v-container>
                                <v-row>
                                    <v-col cols="12">
                                        <strong>LOCAL/ ENDEREÇO DO EVENTO</strong>
                                        <h4 class="ma-1">{{ item.local_evento }}</h4>
                                    </v-col>
                                    <v-col cols="12" md="2" class="text-center">
                                        <div style="border: 3px ridge;">
                                            <small class="text-center">QUANTIDADE <br> ESPERADA</small>
                                        </div>
                                        <div style="border: 3px ridge;">
                                            <h4 class="ma-1">{{item.qtd_esperada_convidados}}</h4>
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="2" class="text-center">
                                        <div style="border: 3px ridge;">
                                            <small>QUANTIDADE CONFIRMADA</small>
                                        </div>
                                        <div style="border: 3px ridge;">
                                            <h4 class="ma-1">{{item.qtd_confirmado_convidados}}</h4>
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="2" class="text-center">
                                        <div style="border: 3px ridge;">
                                            <small>QUANTIDADE NÃO CONFIRMADA </small>
                                        </div>
                                        <div style="border: 3px ridge;">
                                            <h4 class="ma-1">{{ item.qtd_nao_confirmado_convidados}}</h4>
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="2" class="text-center">
                                        <div style="border: 3px ridge;">
                                            <small>QUANTIDADE ACOMPANHANTES</small>
                                        </div>
                                        <div style="border: 3px ridge;">
                                            <h4 class="ma-1">{{ item.qtd_acompanhantes_confirm}}</h4>
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="2" class="text-center">
                                        <v-overlay :value="isLoading">
                                            <v-progress-circular
                                            :size="70"
                                            :width="7"
                                            indeterminate
                                        ></v-progress-circular>
                                        </v-overlay>
                                        <v-btn
                                            class="ma-2"
                                            color="indigo"
                                            dark
                                            @click="loading(item)"
                                        >
                                            <v-icon dark>
                                            mdi-reload
                                            </v-icon>
                                        </v-btn>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-row >
                                            <v-col class="d-flex align-center justify-space-between">
                                                <v-row class="d-flex align-center justify-space-between">
                                                    <v-col>
                                                        <strong>LINK PARA CONFIMAÇÃO</strong>
                                                        <h4 class="ma-1">{{currentUrl}}/home-confirmacao/{{ item.id }}</h4>
                                                    </v-col>
                                                    <v-col>
                                                        <v-btn :disabled="item.qtd_esperada_convidados === item.qtd_confirmado_convidados ? true : false" @click="copyLink(item.id)">
                                                            COPIAR
                                                        </v-btn>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                    <v-col cols="12">
                                        <strong>HORA DO EVENTO</strong>
                                        <h4 class="ma-1">{{item.hora_evento.replace(/:[^:]*$/, '') + ' Horas'}}</h4>
                                    </v-col>
                                    <v-col cols="12">
                                        <ListaConfirmados :propConfirm="item.id"/>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-col>
            <v-col v-else cols="12" class="d-flex align-center justify-center" > 
                VOCÊ NÃO TEM EVENTOS
            </v-col>
            <v-col cols="12" class="d-flex align-center justify-center"> 
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import ListaConfirmados from '../components/ListaConfirmados/ListaConfirmados.vue'
import {getItem as getItemLocal} from '@/util/localStorage';
import { mapActions } from 'vuex';
    export default {
    name: 'TodosEventoDetalhe',
    data () {
        return {
            activePanel: null,
            isLoading: false,
        }
    },
    mounted() {
        console.log(this.getTodosEventos)
        this.getCurrentUrl()
        this.pegaEventos()
    },
    computed:{

        getTodosEventos() {
            return this.$store.state.auth.getTodosEventos
        },

        currentUrl() {
            return this.$store.state.utilsStore.currentUrl;
        },

        qtd_acomp() {           
            return this.$store.state.confirmAuth.qtd_acomp;
        },

        // TRAZ OS CONFIRMADOS COM ACOMPANHANTES E SEM
        qtdConfirmadosChildren() {
            return this.$store.state.auth.qtdConvidadosConfirmados;
        },
    },
    components: {
        ListaConfirmados ,
    },
    methods:{
        ...mapActions({
            tdosEventos: 'auth/getTodosEventos',
            snackMessage: 'utilsStore/snackMessage',
            getCurrentUrl: 'utilsStore/getCurrentUrl',
            getTodosConvidadosAtualizar: 'auth/getTodosConvidadosAtualizar',
            getConfirmConvidado: 'auth/getConfirmConvidado',
            qtdd_accampp: 'confirmAuth/qtdd_accampp',

        }),

        handlePanelChange(isExpanded) {
            if (isExpanded) {
                console.log('Painel foi aberto!');
                // Coloque sua lógica adicional aqui.
            }
        },
        handleClick(item) {
            return this.loading(item)
            console.log('Painel foi clicado!');
            // Coloque sua lógica adicional aqui.
        },
        pegaEventos(){
            this.getTodosConvidadosAtualizar()
            let User = getItemLocal('session')
            this.tdosEventos({id: User.user.id})
        },
        copyLink(item) {
            // O link que você deseja copiar
            const link = this.$store.state.utilsStore.currentUrl + `/home-confirmacao/${item}`;

            // Cria um elemento input temporário
            const el = document.createElement('input');
            el.value = link;

            // Adiciona o elemento input ao DOM
            document.body.appendChild(el);

            // Seleciona o texto do elemento input
            el.select();

            // Copia o texto selecionado para a área de transferência
            document.execCommand('copy');

            // Remove o elemento input do DOM
            document.body.removeChild(el);

            this.snackMessage(true)
        },

        //ATUALIZA OS DADOS DOS CONVIDADOS E ACOMPANHANTES
        loading(item){
            this.getConfirmConvidado(item.id)
            this.pegaEventos()
            this.isLoading = true
            //ELE CAPTURA OS OS ACOMPANHANTES CONFIRMADOS E FAZ A SOMATÓRIA DENTRO DO ARRAY DE OBJ
            setTimeout(() => {
                const totalAcompanhantes = this.qtdConfirmadosChildren ? this.qtdConfirmadosChildren
                .map(convidado => convidado.qtd_acompanhantes)
                .reduce((total, qtd) => total + qtd, 0): 0;
                this.qtdd_accampp(totalAcompanhantes)
                this.isLoading = false
            },1000)
        }

    }
    
}
</script>
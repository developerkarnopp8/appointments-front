<template>
  <v-container v-if="jaConfirmou">
    <v-row>
      <v-col cols="12">
        <v-card-title>
          Você já deu retorno para esse evento, duvidas entre em contato com ...
        </v-card-title>
      </v-col>
    </v-row>
</v-container>
  <v-container v-else>
    <v-row>
      <v-col cols="12" md="3"></v-col>
      <v-col cols="12" md="6" class="d-flex align-center justify-center alturaMobile" style="height: 100vh;">
        <v-card>
          <v-img
            class="white--text align-end"
            height="200px"
            src="../assets/images/banner04.jpg">
            <v-card-title v-if="dataValidateEvento" style="color: red; text-align:center;">
              VOCÊ NÃO PODE MAIS CONFIRMAR ESSE EVENTOS POIS TERMINOU O PRAZO
            </v-card-title>
            <v-card-title :style="dataValidateEvento ? 'text-decoration: line-through;' : '' " >
              CONFIRME QUE VOCÊ IRÁ NO ANIVERSÁRIO DO {{getAniversariante.nome_aniversariante.toUpperCase()}}
              <!-- CONFIRME QUE VOCÊ IRÁ NO ANIVERSÁRIO DO {{getAniversariante && getAniversariante.nome_aniversariante ? getAniversariante.nome_aniversariante.toUpperCase() : ''}} -->
            </v-card-title>
          </v-img>
          <v-row>
            <v-col cols="12" md="4">
              <v-card-subtitle style="font-weight: bold;" class="pb-0">
                DATA DO EVENTO
              </v-card-subtitle>
              <v-card-text class="text--primary">
                <div>{{getAniversariante && getAniversariante.data_evento ? $moment(getAniversariante.data_evento).format('L'): ''}}</div>
              </v-card-text>
            </v-col>
            <v-col cols="12" md="4">
              <v-card-subtitle style="font-weight: bold;" class="pb-0">
                HORA DO EVENTO
              </v-card-subtitle>
              <v-card-text class="text--primary">
                <div>{{getAniversariante && getAniversariante.hora_evento ? getAniversariante.hora_evento.replace(/:[^:]*$/, '') + ' Horas' : ''}}</div>
              </v-card-text>
            </v-col>
            <v-col cols="12" md="4">
              <v-card-subtitle style="font-weight: bold;" class="pb-0">
                LOCAL DO EVENTO
              </v-card-subtitle>
              <v-card-text class="text--primary">
                <div>{{getAniversariante && getAniversariante.local_evento ? getAniversariante.local_evento :''}}</div>
              </v-card-text>
            </v-col>
          </v-row>
          <SwitchConfirmacao />

          <v-card-actions >
            <v-btn
              :disabled="(dataValidateEvento || !$store.state.confirmAuth.switchConfirm && !acompanhanteValidadoVerify) 
                || qtdConfirmadoConvidados > 0 && itemsAcompanhantesVALIDATE.length < qtdConfirmadoConvidados 
                && qtdConfirmadoConvidados != '' && qtdConfirmadoConvidados != 0"
              color="orange"
              @click="putConfQtd()"
            >
              Enviar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" md="3"></v-col>
    </v-row>
  </v-container>
</template>
<script>
  const axios = require('axios');

  import { mapActions } from 'vuex';

  import { getItem as getItemLocal } from '@/util/localStorage';

  import SwitchConfirmacao from '../components/SwitchConfirmacao'
  export default {
    name: 'Home',
    data(){
      return{
        dadosQtd: 0,
        verify: false,
        ip_user: null,
        dataValidateEvento: false
      }
    },
    components: {
      SwitchConfirmacao,
    },
    mounted(){
      //TODO: MONTA O IP DO USER PARA FAZER A VALIDAÇÃO NA CONFIRMAÇÃO QUANDO CARREGA A PÁGINA.
      this.getUserIP();
      this.chamaEventos();
      this.validaEventoOcorrendo()
    },
    computed:{
        //TODO: TRÁS DADOS NO ANIVERSÁRIANTE
        getAniversariante() {
            return this.$store.state.auth.aniversariante;
        },

        acompanhanteValidadoVerify(){
            return this.$store.state.confirmAuth.acompanhanteValidado;
        },

        switchConfirmAcompanhante(){
            return this.$store.state.confirmAuth.switchConfirmAcompanhante;
        },

        qtdConfirmadoConvidados(){
            return this.$store.state.confirmAuth.qtd_confirmado_convidados;
        },

        //TRÁS OS DADOS DO IP CAPTURADO
        getIp_user(){
            return this.$store.state.auth.ip_user;
        },

        itemsAcompanhantesVALIDATE(){
            return this.$store.state.confirmAuth.itemsAcompanhantes;
        },

        //TODO: TRÁS DADOS DOS ACOMPANHANTES
        getSomaAcompanhantes(){
            return this.$store.state.confirmAuth.setSomaAcompanhantes;
        },

        jaConfirmou(){
            return this.$store.state.auth.ja_confirmou;
        },

    },
    methods:{
      ...mapActions({
        tdosEventos: 'auth/getEventoURLCriado',
        putEventoURLCriado: 'auth/putEventoURLCriado',
        postConvidados: 'auth/postConvidados',
        postAcompanhante: 'auth/postAcompanhante',
        snacBarr: 'auth/snacKBarr',
        getIpeUser: 'auth/getIpeUser',
      }),

      validaEventoOcorrendo(){
        // setTimeout(() => {
          if(this.getAniversariante && this.getAniversariante.data_evento){
            let agora = new Date();
      
            let evento = new Date(this.getAniversariante.data_evento);
    
            // TODO: Criar a data limite como um objeto Date
              let dataLimite = new Date(evento);
    
             // TODO: Ajustar a data limite para começar à meia-noite no fuso GMT-0300
              dataLimite.setHours(0);
              dataLimite.setMinutes(0);
              dataLimite.setSeconds(0);
              dataLimite.setMilliseconds(0);
  
              // TODO: Para compensar a diferença de fuso horário
              // TODO: Se você sabe que o fuso horário é sempre -0300, pode ajustar manualmente
              dataLimite.setHours(dataLimite.getHours() - 3);
  
              // TODO: Converter ambas as datas para UTC e comparar
              let dataEntradaUTC = Date.UTC(agora.getUTCFullYear(), agora.getUTCMonth(), agora.getUTCDate(),  agora.getUTCHours(), agora.getUTCMinutes(), agora.getUTCSeconds());
              let dataLimiteUTC = Date.UTC(dataLimite.getUTCFullYear(), dataLimite.getUTCMonth(), dataLimite.getUTCDate(), dataLimite.getUTCHours(), dataLimite.getUTCMinutes(), dataLimite.getUTCSeconds());
  
              // TODO: Agora que ambas as datas estão em UTC, podemos compará-las diretamente
              if (dataEntradaUTC <= dataLimiteUTC) {
                console.log("A data está dentro do limite permitido.");
              } else {
                this.dataValidateEvento = true
                console.log("A data excede o limite permitido.");
              }
          }
  
          // console.log(this.$moment(getAniversariante.data_evento).format('L'))
        // },1000)
      },

      //TODO: CHAMADA DA FUNÇÃO DO BOTÃO DE ENVIAR A CONFIRMAÇÃO.
      putConfQtd(){

        //TODO: VALIDA SE O SELECT ESTA TRUE.
        if(this.switchConfirmAcompanhante == 0){

          //TODO: VALIDA SE O VALOR ESPERADO DE CONVIDADOS JÁ NAO ESTA NO LIMITE.
          if(this.getAniversariante.nome_convidados.data.length <= this.getAniversariante.qtd_esperada_convidados){

            //TODO: VALIDA A CONFIRMAÇÃO CONVIDADO ATUAL + A QUANTIDADE DE ACOMPANHANTES QUE TEM.
            let newQtdConfirm = Number(this.getSomaAcompanhantes.conf) + Number(this.getSomaAcompanhantes.itemsAcompanhantes.length);

            //TODO: VALIDA CONVIDADOS JÁ CONFIRMADOS NA BASE + OS CONVIDADOS NOVOS | TOLTAL CONFIRMADOS.
            let validaConvidJaConfirm = Number(this.getAniversariante.qtd_confirmado_convidados) + Number(newQtdConfirm);

            //TODO: VALIDA O TOTAL DE CONVIDADOS ESPERADOS - OQUE FOI CONFIMADO | OU SEJA TOTAL NÃO CONFIRMADO.
            let QtdConfirmAtualiza = Number(this.getAniversariante.qtd_esperada_convidados) - Number(validaConvidJaConfirm);
            
            //TODO: VALIDA O TOTAL DE ACOMPANHANTES JA REGISTRADOS + OQUE ESTÁ SENDO REGISTRADO NA CONFIRMAÇÃO ATUAL.
            let qtdConfirmAcompanhantes = Number(this.getAniversariante.qtd_acompanhantes_confirm) + Number(this.getSomaAcompanhantes.itemsAcompanhantes.length);

            //TODO: ANALISA SE BATE O LIMITE DE CONFIRMAÇÃO PARA IMPEDIR QUE O USUÁRIO CONFIRME COM EXCESSO.
            if(this.getAniversariante.qtd_confirmado_convidados < this.getAniversariante.qtd_esperada_convidados && this.getAniversariante.qtd_nao_confirmado_convidados !== 0){
              
              //TODO: ATUALIZA VALORES DE QUANTIDADE.
              let dataConf = {
              id : this.$route.params.id,
              dados:{
                data : {
                  qtd_confirmado_convidados     : validaConvidJaConfirm,
                  qtd_nao_confirmado_convidados : QtdConfirmAtualiza,
                  qtd_acompanhantes_confirm     : qtdConfirmAcompanhantes,
                }
              }
            }
            this.putEventoURLCriado(dataConf);

            //TODO: PEGA O ID NO LOCAL STORAGE.
            let confirmationId = getItemLocal('confimations');

            //TODO: FAZ O FILTRO REFERENTE AO NOME DOS CONVIDADOS QUE VAI SER ENVIADO PARA O BANCO.
            let filteConfir = {
              confirmation      : confirmationId.id,
              nome_convidado    : this.getSomaAcompanhantes.nome_convidado,
              phone_contato     : this.getSomaAcompanhantes.phone_contato,
              qtd_acompanhantes : this.getSomaAcompanhantes.qtd_acompanhantes,
              ip_user           : this.getSomaAcompanhantes.ip_user
            }
            
            //FAZ O POST DOS CONVIDADOS COM OS DADOS.
            this.postConvidados(filteConfir);

            setTimeout(() => {
  
              //TODO: VALIDA SE TEM ACOMPANHANTES.
              if(this.getSomaAcompanhantes && this.getSomaAcompanhantes.itemsAcompanhantes.length > 0){
  
                //TODO: CHAMA A FUNÇÃO QUE ENVIA OS ACOMPANHATES.
                this.postAcompanhante(this.getSomaAcompanhantes.itemsAcompanhantes);
                
              }else{

                //TODO: CHAMA A MENSAGEM DE SUCESSO.
                let resp = {
                  message:'Confirmação enviada com sucesso!',
                  color: 'success',
                  valu : true
                }
                
                this.snacBarr(resp);

                //TODO: FAZ O REDIRECIONAMENTO PARA A PÁGINA DE SUCESSO CASO SEJA SEM ACOMPANHANTES.
                this.$router.push({ name: 'Success', params: { id: this.getSomaAcompanhantes.nome_convidado }});

              }
            }, 1000)
          }else{

            alert('Confirmação encerrada!');

          }
          
          }
        }
      },

      chamaEventos(){
        let ID_USER = this.$route.params
        this.$store.commit('SET_PARAMS', ID_USER);
        this.tdosEventos(ID_USER)
      },

      //TODO: PEGA O IP DO USER QUE FOI CONVIDADO PARA O EVENTO
      async getUserIP() {
          const response = await axios.get('https://api.ipify.org?format=json');
          this.getIpeUser(response.data.ip)
      }
    }
  }
</script>
<style>
@media (max-width: 992px) {
  .alturaMobile{
    height: 100% !important;
  }
}
@media (max-width: 600px) {
  .alturaMobile{
    height: 100% !important;
  }
}
@media (max-width: 480px) {
  .alturaMobile{
    height: 100% !important;
  }
}
@media (max-width: 320px) {
  .alturaMobile{
    height: 100% !important;
  }
}
</style>
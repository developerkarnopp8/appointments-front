<template>
    <v-container class="d-flex align-center justify-center" style="height: 100vh">
        <v-row>
            <v-col cols="12" md="4">
                
            </v-col>
            <v-col cols="12" md="4">
                <v-card>
                    <v-row class="ma-10">
                        <v-col cols="12" class="d-flex align-center justify-center">
                            <v-icon color="green" style="font-size: 100px;">mdi-check-decagram </v-icon>
                        </v-col>
                        <v-col cols="12" class="d-flex flex-column align-center justify-center">
                            <v-card-title>OBRIGADO!</v-card-title>
                            <v-card-subtitle>Pela sua confirmação {{confirm.nome_convidado}}</v-card-subtitle>
                        </v-col>
                        <v-col cols="12">
                            <small class="d-flex align-center justify-center text-center">
                                ⚠️Importante caso não compareça ao evento, avise com antecedência pelo contato {{contatoATT}}.⚠️
                            </small>
                        </v-col>
                    </v-row>
                </v-card>
                
            </v-col>
            <v-col cols="12" md="4">
                
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import { getItem as getItemLocal } from '@/util/localStorage';
import { mapActions } from 'vuex';
export default{
    data(){
        return{
            confirm: {},
            contatoATT: null
        }
    },
    mounted(){
        let dados = getItemLocal('confimationsSuccess');
        dados.attributes['id'] = dados.id
        this.confirm = dados.attributes

        let contato = getItemLocal('confimations');
        this.contatoATT = contato.attributes.contato_confirm
    },
    methods: {
        ...mapActions({
            sendWhatsAppMessage: 'apiWhatsApp/sendWhatsAppMessage',
        }),
        sendMessage() {
            this.sendWhatsAppMessage({
            number: '55999685206',
            text: 'Isso é um texto'
        })
            }
        }
    }

</script>
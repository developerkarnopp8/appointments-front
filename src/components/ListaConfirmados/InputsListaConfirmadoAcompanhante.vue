<template>
    <v-container >
        <v-row>
            <v-dialog
                v-model="dialog"
                persistent
                max-width="600px"
                >
                <template v-slot:activator="{ on, attrs }" >
                        <v-btn
                            :disabled="itemsAcompanhantesVALIDATE.length == setAcompanhantesWatch ? true : false "
                            color="primary"
                            dark                       
                            v-bind="attrs"
                            v-on="on"
                            >
                            CADASTRAR
                        </v-btn>
                    </template>
                <v-card>
                    <v-card-title>
                    <span class="text-h5">ADICIONE SEUS ACOMPANHANTES</span>
                    </v-card-title>
                    <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                v-model="qtdAconpanhantes.name_acompanhante"
                                label="SEU NOME COMPLETO"
                                hint="example of helper text only on focus"
                                solo
                                ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                            >
                                <v-select
                                :items="categorias"
                                label="CATEGORIA"
                                required
                                solo
                                v-model="categoriaSelecionada"
                                ></v-select>
                            </v-col>
                        </v-row>
                    </v-container>
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="orange darken-4"
                        style="color: white;"
                        @click="dialog = false"
                    >
                        Fechar
                    </v-btn>
                    <v-btn
                        style="color: white;"   
                        color="blue darken-2"
                        @click="addItem()"
                    >
                        Adicionar
                    </v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog>
            </v-row>
    </v-container>
</template>
<script>
import { mapActions } from 'vuex';

export default{
    data(){
        return{
            dialog: false,
            categorias: ['Selecionar Categoria','Bebê (Menor que 2 anos)', 'Criança (Maior que 2 anos)', 'Jovem (Maior que 15 anos)', 'Adulto (Maior que 18 anos)'],
            categoriaSelecionada: null,
            qtdAconpanhantes: {
                name_acompanhante: null,
                categoria_acompanhantes: null
            }
        }
    },
    watch: {
        categoriaSelecionada(newValue) {
            this.qtdAconpanhantes.categoria_acompanhantes = newValue;
        },
    },
    computed:{
        switchConfirmAcompanhante:{
            get(){
                return this.$store.state.confirmAuth.switchConfirmAcompanhante;
            }
        },
        acompanhanteValidadoVerify(){
            return this.$store.state.confirmAuth.acompanhanteValidado;
        },

        itemsAcompanhantesVALIDATE(){
            return this.$store.state.confirmAuth.itemsAcompanhantes;
        },

        //TODO: TRAS SOMENTE O VALOR PASSADO NO INPUT PARA FAZER A VALIDAÇÃO.
        setAcompanhantesWatch(){
            return this.$store.state.confirmAuth.setAcompanhantesWatch;
        },

        qtdConfirmadoConvidados(){
            return this.$store.state.confirmAuth.qtd_confirmado_convidados;
        },
    },
    methods:{
        ...mapActions({
            aacompanhantes: 'confirmAuth/itemsAcompanhantes',
        }),

        addItem() {
            if(this.qtdAconpanhantes.name_acompanhante && this.qtdAconpanhantes.categoria_acompanhantes) {
                this.aacompanhantes({ name_acompanhante: this.qtdAconpanhantes.name_acompanhante, categoria_acompanhantes: this.qtdAconpanhantes.categoria_acompanhantes })
                this.qtdAconpanhantes.name_acompanhante = null;
                this.categoriaSelecionada = null;
                this.qtdAconpanhantes.categoria_acompanhantes = this.categorias[0];

                //TODO: FAZ A VALIDAÇÃO DE QUANDO OS ACOMP ADICIONADOS FOREM IGUAIS AO O VALOR DO INPUT DE ACOMPANHANTE FECHA O MODAL.
                if(this.itemsAcompanhantesVALIDATE.length == this.setAcompanhantesWatch){
                    this.dialog = false;
                }
            } else {
                alert('Por favor, Preencha os dados.');
            }
        }
    }
}
</script>
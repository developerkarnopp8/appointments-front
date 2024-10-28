<template>
    <v-container>
        <form @submit.prevent="Log()">
        <v-row>
            <v-col cols="12" md="4"></v-col>
            <v-col cols="12" md="4" class="d-flex align-center justify-center" style="height: 100vh;">
                <!-- <v-card> -->
                    <v-container>
                    <v-row>
                    <v-col cols="12" class="animate__animated animate__bounce">
                        <div class="d-flex flex-column align-center justify-center">
                            <img class="ma-5" src="../assets/images/LOGO02.png" width="70" alt="">
                            <v-card-title style="font-weight: bold; font-size: 25px;">FAÇA O LOGIN</v-card-title>
                        </div>
                    </v-col>
                    <v-col cols="12" >
                        <v-text-field
                            v-model="logar.email"
                            placeholder="seu-email@gmail.com"
                            label="E-MAIL"
                            class="animate__animated animate__backInLeft labe"
                            :color="logar.email != null ? '#0064b3' : 'red'"
                            outlined
                            solo
                            rounded
                            dense
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field
                            class="text-inp animate__animated animate__backInRight labe"
                            solo
                            rounded
                            outlined
                            placeholder="********"
                            dense
                            :color="logar.email != null ? '#0064b3' : 'red'"
                            v-model="logar.password"
                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="[rules.required, rules.min]"
                            :type="show1 ? 'text' : 'password'"
                            name="input-10-1"
                            label="SUA SENHA"
                            hint="Pelo menos 8 caracteres"
                            @click:append="show1 = !show1"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row class="animate__animated animate__backInUp">
                    <v-col cols="12">
                        <v-row>
                            <v-col cols="4" class="d-flex align-center justify-center">
                            </v-col>
                            <v-col cols="4" class="d-flex align-center justify-center">
                                    <v-btn
                                    color="orange"
                                    style="color: black;"
                                    class="animate__animated animate__pulse animate__infinite infinite"
                                    block
                                    type="submit"
                                    >
                                    ENTRAR
                                </v-btn>
                            </v-col>
                            <v-col cols="4" class="d-flex align-center justify-center">
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12" class="d-flex align-center justify-center">
                        <li @click="$router.push({name: 'Cadastro'})" style="list-style-type: none; text-decoration: underline;">
                            Quero me registrar
                        </li>
                    </v-col>
                    <v-col cols="12" class="d-flex align-center justify-center">
                        <li style="list-style-type: none; text-decoration: underline;">
                            Esqueci a senha
                        </li>
                    </v-col>
                </v-row>
            </v-container>
            <!-- </v-card> -->
            </v-col>
            <v-col cols="12" md="4"></v-col>
        </v-row>
    </form>
    </v-container>
</template>
<script>
        import SwitchConfirmacao from '../components/SwitchConfirmacao'
        export default {
        name: 'Home',
        data () {
            return {
                show1: false,
                password: 'Password',
                rules: {
                    required: value => !!value || 'Obrigatório.',
                    min: v => (v ? v.length >= 8 : false) || 'Mínimo 8 caracteres',
                    emailMatch: () => (`O e-mail e a senha que você digitou não coincidem`),
                },

                logar: {
                    email: null,
                    password: null,
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
        methods:{
            Log(){
                this.$store.dispatch('auth/login', {
                    identifier: this.logar.email,
                    password: this.logar.password,
                });
            }
        }
        
    }
</script>
<style>
.labe .v-label {
    font-size: large;
    color: black !important;
  }
</style>
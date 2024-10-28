<template>
    <v-container>
        <form @submit.prevent="Register()">
        <v-row>
            <v-col cols="12" md="4"></v-col>
            <v-col cols="12" md="4" class="d-flex align-center justify-center" style="height: 100vh;">
                <v-container>
                    <v-row>
                        <v-col cols="12" class="animate__animated animate__bounce">
                            <div class="d-flex flex-column align-center justify-center">
                                <img class="ma-5" src="../assets/images/LOGO02.png" width="70" alt="">
                                <v-card-title style="font-weight: bold; font-size: 25px;">REGISTRE-SE</v-card-title>
                            </div>
                        </v-col>
                    </v-row>
                <v-row>
                    <v-col cols="12" >
                        <v-text-field
                            class="animate__animated animate__backInLeft labe"
                            :color="registeer.username != null ? '#0064b3' : 'red'"
                            dense
                            v-model="registeer.username"
                            label="NOME COMPLETO"
                            placeholder="Gustavo Karnopp"
                            solo
                            rounded
                            outlined
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" >
                        <v-text-field
                            class="animate__animated animate__backInRight labe"
                            :color="registeer.email != null ? '#0064b3' : 'red'"
                            dense
                            v-model="registeer.email"
                            label="E-MAIL"
                            outlined
                            placeholder="seu-melhor-email@gmail.com"
                            solo
                            rounded
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field
                            class="text-inp animate__animated animate__backInLeft labe"
                            solo
                            rounded
                            outlined
                            dense
                            :color="registeer.email != null ? '#0064b3' : 'red'"
                            v-model="registeer.password"
                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="[rules.required, rules.minIn]"
                            :type="show1 ? 'text' : 'password'"
                            name="input-10-1"
                            label="CRIE SUA SENHA"
                            placeholder="Uma senha forte"
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
                            <v-col  cols="4" class="d-flex align-center justify-center">

                                    <v-btn
                                        color="orange"
                                        style="color: black;"
                                        class="animate__animated animate__pulse animate__infinite infinite"
                                        block
                                        type="submit"
                                        >
                                        CADASTRAR
                                </v-btn>
                            </v-col>
                            <v-col cols="4" class="d-flex align-center justify-center">
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12" class="d-flex align-center justify-center">
                        <li @click="$router.push({name : 'Login'})">Já tenho conta</li>
                    </v-col>
                </v-row>
            </v-container>
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
                    minIn: v => (v ? v.length >= 8 : false) || 'Mínimo 8 caracteres',
                    emailMatch: () => (`O e-mail e a senha que você digitou não coincidem`),
                },
                registeer: {
                    username: null,
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
            Register(){
                this.$store.dispatch('auth/register', {
                    username: this.registeer.username,
                    email: this.registeer.email,
                    password: this.registeer.password,
                    role: 2
                });
            }
        }
        
    }
</script>
<style>
.text-inp .v-text-field__details{
    display: block;
}
.text-inp .v-messages{
    display: block;
}
.theme--light.v-text-field--filled > .v-input__control > .v-input__slot {
    background: rgb(231 240 254) !important;
}
.labe .v-label {
    font-size: large;
    color: black !important;
  }
</style>
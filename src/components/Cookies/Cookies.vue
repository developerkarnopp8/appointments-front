    <template>
        <div v-if="!cookieConsent">
            <div class="animate__animated animate__fadeInUp" id="cookieConsentContainer" style="position: fixed; bottom: 0; width: 100vw; background-color: #f5f5f5; padding: 15px; text-align: center; z-index: 1000;">
                <p style="margin: 0; font-size: 14px;">
                    Este site utiliza cookies para garantir que você obtenha a melhor experiência em nosso site. 
                    <a href="/politica-de-privacidade" style="color: #0044cc;">Saiba mais</a>.
                </p>
                <div class="d-flex align-center justify-center" style="margin-top: 10px;">
                    <v-btn @click="acceptCookies" id="acceptCookies" style="color: white; background-color: #0044cc; border: none; padding: 10px 20px; margin-right: 10px; cursor: pointer;">
                        Aceitar Cookies
                    </v-btn>
                    <v-btn id="declineCookies" style="background: none; border: 1px solid #0044cc; padding: 10px 20px; cursor: pointer;">
                        Recusar Cookies
                    </v-btn>
                </div>
            </div>
        </div>
    </template>

    <script>
    import { mapActions, mapGetters } from 'vuex';

    export default {
    computed: {
    ...mapGetters(['cookieConsent'])
    },
    mounted(){
        
        // TODO: Código para aceitar cookies
        // document.getElementById('acceptCookies').onclick = function() {
        //     document.getElementById('cookieConsentContainer').style.display = 'none';
        // };

        // TODO: Código para recusar cookies
        document.getElementById('declineCookies').onclick = function() {
            document.getElementById('cookieConsentContainer').style.display = 'none';
        };
    },
    methods: {
        ...mapActions(['updateCookieConsent']),
            acceptCookies() {
                this.updateCookieConsent(true);
            }
            
        }
    };
    </script>
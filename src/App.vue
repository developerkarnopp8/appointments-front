<template>
  <v-app>
    <v-main class="body-gradient">
      <router-view/>
      <v-navigation-drawer
      class="navbarVertical"
        style="background:#797979;"
          v-model="clickButtonNavbarr"
          absolute
          app 
          disable-close-on-content-click 
          temporary
        >
          <v-list-item>
            
            <v-list-item-content>
              <v-card-title style="color: orange;">{{name}}</v-card-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider  color="orange"></v-divider>

          <v-list dense>
            <v-list-item
              v-for="item in items"
              :key="item.title"
              link
            >
              <v-list-item-icon>
                <v-icon color="orange">{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title style="color: orange;" @click="getLink(item.link)">{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-divider  color="orange"></v-divider>
        </v-navigation-drawer>
        <Cookies/>
    </v-main>
  </v-app>
</template>

<script>
import '@/plugins/filtros';
// import '../src/Controller/Util.controller';
import InactivityMixin from '../src/Controller/inactivityMixin';

import Cookies from './components/Cookies/Cookies.vue';
import { getCookie } from './Controller/Util.controller'

import { mapActions } from 'vuex';
import {getItem as getItemLocal} from '@/util/localStorage';
export default {
  name: 'App',
  mixins: [InactivityMixin],
  data(){
    return {
      name: null,
      items: [
          { title: 'Home', icon: 'mdi-view-dashboard', link: 'registra-evento' },
          { title: 'Todos Eventos', icon: 'mdi-forum', link: 'todos-eventos' },
          { title: 'Sair', icon: 'mdi-exit-to-app', link: 'logout' },
        ],
        mini: true
    }
  },
  components: {
      Cookies,
  },
  created() {
    const consent = getCookie('cookieConsent');
    console.log(conset, 'aqu')
    if (typeof consent !== null) {
      // this.cookieModule(true)
      this.$store.dispatch('updateCookieConsent', consent === 'true');
    }
  },
  mounted(){
    this.getStorage()
    document.addEventListener('click', this.handleDocumentClick);
    this.pegaPadraoDispositivo()
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleDocumentClick);
  },
  computed:{
    clickButtonNavbarr(){
      return this.$store.state.utilsStore.clickButtonNavbarr
    },
  },
  methods:{
    ...mapActions({
      logout: 'auth/logout',
      tdosEventos: 'auth/getTodosEventos',
      ButtonNavBarr: 'utilsStore/clickButtonNavbarr',
      deskTops: 'confirmAuth/desktops',
      cookieModule: 'cookieModule/updateCookieConsent',
    }),
    getStorage(){
      let User = getItemLocal('session')
      this.name = User.user.username
    },
    getLink(link){
      switch(link){
        case 'logout':
            this.logout()
            this.ButtonNavBarr(false)
        break
        case 'todos-eventos':
            let User = getItemLocal('session')
            this.ButtonNavBarr(false)
            this.tdosEventos({ id: User.user.id })
            this.$router.replace({ name: 'TodosEventos', params: { id: User.user.id }}).catch(err => {

              //TODO: Trata o erro de navegação quando a rota foi a mesma 
              if (err.name !== 'NavigationDuplicated') {
                throw err;
              }
            });
        break
        case 'registra-evento':
            let idUser = getItemLocal('session')
            this.ButtonNavBarr(false)
            this.$router.replace({ name: 'Aniversariante', params: { id: idUser.user.id }}).catch(err => {

              //TODO: Trata o erro de navegação quando a rota foi a mesma 
              if (err.name !== 'NavigationDuplicated') {
                throw err;
              }
            });
        break

      }
    },
    handleDocumentClick(event) {
      if (event.target.classList.contains('v-overlay__scrim')) {
        this.suaFuncao();
      }
    },
    suaFuncao() {
      this.ButtonNavBarr(false)
    },
    pegaPadraoDispositivo(){
      document.addEventListener("DOMContentLoaded", function(event) {

      var isAndroid = /(android)/i.test(navigator.userAgent);
      var isIOS = /(iphone|ipad|ipod)/i.test(navigator.userAgent);

      if (isAndroid) {
        document.documentElement.classList.add('android');
      } else if (isIOS) {
        this.deskTops(true)
          document.documentElement.classList.add('ios');
      }
  });

    }
  }
};
</script>
<style>
.container{
  
}
li{
  cursor: pointer;
  list-style: none;
  text-decoration-line: underline;
}
.banner01{
  background-color:#bbbbbb;
}
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

@keyframes gradient-animation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.body-gradient {
  background: linear-gradient(45deg, rgb(12, 0, 114), rgb(51, 122, 255), rgb(51, 207, 255), rgb(51, 122, 255), rgb(12, 0, 114));
  background-size: 200% 200%;
  animation: gradient-animation 10s ease infinite;
   /* altura total da viewport */
  width: 100vw; /* largura total da viewport */
}
.navbarVertical{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
}

</style>
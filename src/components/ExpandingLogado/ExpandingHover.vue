<template>
  <v-container>
    <v-app-bar
        :class="`Navbarr gradient-border body-gradient2 container`"
        elevation="0"
        dense
        dark
        
      >
        <v-app-bar-nav-icon @click.stop="chamaBTN(true)" style="color: orange;"></v-app-bar-nav-icon>
  
        <v-toolbar-title class="d-flex align-center"> <h2 class="ma-1" style="color: orange;">&</h2> <strong style="color:black;">CONFIRMA</strong></v-toolbar-title>
  
        <v-spacer></v-spacer>
  
        <v-btn icon @click="direct()" class="ma-1">
          <v-img width="30" src="./../../assets/images/g1391.png"></v-img>
        </v-btn>
      </v-app-bar>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';
import {getItem as getItemLocal} from '@/util/localStorage';
  export default {
    data (){
      return{
        drawer: null,
        name: null,
      }
    },
    mounted(){
    },
    computed:{
      clickButtonNavbarr(){
        return this.$store.state.utilsStore.clickButtonNavbarr
      },
    },
    methods:{
      ...mapActions({
          ButtonNavBarr: 'utilsStore/clickButtonNavbarr',
      }),
      chamaBTN(item){
        this.ButtonNavBarr(item)
      },
      direct(){
        let idUser = getItemLocal('session')
        this.$router.push({ name: 'Aniversariante', params: { id: idUser.user.id }}).catch(err => {
          //Trata o erro de navegação quando a rota foi a mesma 
          if (err.name !== 'NavigationDuplicated') {
            throw err;
          }
        });
      }
    }
  }
</script>
<style>
.Navbarr{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10; /* Um valor mais baixo para a barra horizontal */
  height: 80px !important;
}
.v-toolbar__content{
  height: 48px;
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

.body-gradient2 {
  background: linear-gradient(45deg, rgb(12, 0, 114), rgb(51, 122, 255), rgb(51, 207, 255), rgb(51, 122, 255), rgb(12, 0, 114));
  background-size: 200% 200%;
  animation: gradient-animation 10s ease infinite;
  width: 100vw;
}



.gradient-border::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  height: 4px; /* Altura da sua borda */
  width: 100%;
  background: linear-gradient(45deg, rgb(231, 168, 1), rgb(253, 199, 51), rgb(255, 217, 147), rgb(253, 199, 51), rgb(231, 168, 1)); /* Seu gradiente aqui */
}
</style>
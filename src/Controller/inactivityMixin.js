// inactivityMixin.js
import { mapActions } from 'vuex';
import $router from "@/router";
export default {
    data() {
      return {
        inactivityTimer: null,
      };
    },
    created() {
      // console.log($router.history.current.name !== 'Home','1')
      if($router.history.current.name !== 'Home'){
        this.resetInactivityTimer();
        window.addEventListener('mousemove', this.resetInactivityTimer);
        window.addEventListener('keypress', this.resetInactivityTimer);
      }
    },
    beforeDestroy() {
      // console.log($router.history.current.name !== 'Home','2')
      if($router.history.current.name !== 'Home'){
        clearTimeout(this.inactivityTimer);
        window.removeEventListener('mousemove', this.resetInactivityTimer);
        window.removeEventListener('keypress', this.resetInactivityTimer);
      }
    },
    methods: {
        ...mapActions({
            logout: 'auth/logout',
            }),

        //TODO: RESETA A PÁGINA SE NAO HAVER INTERAÇÃO.
        resetInactivityTimer() {
          // console.log($router.history.current.name !== 'Home','3')
          if($router.history.current.name !== 'Home'){
            clearTimeout(this.inactivityTimer);
            // this.inactivityTimer = setTimeout(() => this.logout(), 1000); // 5 min
            this.inactivityTimer = setTimeout(() => this.logout(), 3000000); // 5 min
          }
        },
    },
  };
  
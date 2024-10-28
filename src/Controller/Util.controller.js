import $router from "@/router";

    //TODO: VAI SETAR O COOKIE DIRETAMENTE NO COOKIE DO APLICATION
    export function setCookie(name, value, days) {
        console.log('chamou setCookie')
        var expires = "";
        if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    //TODO: VAI PEGAR O COOKIE DIRETAMENTE NO COOKIE DO APLICATION
    export function getCookie(name) {
        console.log('chamou getCookie')
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
export default { 
    /* eslint-disable */

    addHTTP(param){
        return process.env.VUE_APP_API_URL + param
        // return 'http://localhost:1337' + param
    }, 

    quebraDescription(param){
        return param.split('-')
    },
    

    async go(name, params = {}, query = {}) { //FUNC: go(name, params = {}, query = {})
        // CC: Usa o Vue router para mudar de página

        if(!name){
            return
        }
        
        const root = await this.getVue()
        root.menumobile = false

        let instance  = await this.getVue()
        let route      = instance ? instance.$route : $router
        let router     = instance ? instance.$router : $router

        if(name == 'back'){
            router.go(-1)
            return
        }

        if(typeof name == 'object'){
            if(route.params.pagina != name.params.pagina ){
                router.push(name);
                this.scroll()
            }
            return
        }

        if(name.length == 0) {
            console.warn('Não existe link por favor verificar!')
            return false
        }

        if(name.indexOf('http') != -1) {
            location.href = name
            return false
        }
        if(name == 'sair' || name == 'Sair'){
            // let dadosUser = getItemLocal('session')
            // if(router.history.current.name == 'Produtos' && dadosUser && dadosUser.isAuthenticated){
            if(router.history.current.name == 'Produtos'){
                removeItemLocal('session')
                removeItemLocal('token')
                location.reload();
            }else{
                removeItemLocal('session')
                removeItemLocal('token')
                router.push( { name: 'Produtos' } );
                return
            }
        }
        if(name == 'sac'){
            instance.$sac.startFlowSac()
            return
        }
        if(name == 'ModalTrocaSenha'){
            this.$root.modalTrocaSenha.show = !this.$root.modalTrocaSenha.show
            return
        }
        if(route.name != name ){
            router.push( { name: name, params: params, query: query } );
            this.scroll()
        }
        return true
    },

    async getVue() {
        if(this.$root){
            return this.$root
        }
        await this.sleep(1)
        this.$root = document.querySelector('#app').__vue__.$root
        return this.$root
    },

    async sleep(segundos) { //FUNC: sleep(segundos)
        // CC: Pausa "segundos" a leiturta asynconica do js.
        return new Promise(resolve => setTimeout(resolve, segundos * 1000))
    },

    scroll(id){ // FUNC: scroll()
        // CC: ScrollSmooting
        if(id){
            document.getElementById(id).scrollIntoView(true)
            if(window.grecaptcha) window.grecaptcha.reset();
            return
        }
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }   
}
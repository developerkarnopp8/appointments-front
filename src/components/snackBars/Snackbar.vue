<template>
    <div>
        <v-snackbar :color="getttSnack.color" v-model="getttSnack.valu" :timeout="3000" top
        right>
        <!-- {{ getttSnack }} -->
            {{getttSnack.message}}
        </v-snackbar>
    </div>
</template>
<script>

export default {
    data(){
        return{

        }
    },
    computed:{
        getttSnack() {
            if(this.$store.state.utilsStore.snackbar.valu){
                return this.$store.state.utilsStore.snackbar
            }else{
                return this.$store.state.auth.snackbar
            }
        }
    },
}
</script>
    <template>
    <v-main class="d-flex" >
        <template>
            <Header v-if="!['Cadastro', 'Login', 'Home', 'Success'].includes(this.$route.name)"/>
        </template>
        <div >
            <router-view/>
        </div>
            <template>
                <snack/>
            </template>
    </v-main>
</template>

<script>
/* eslint-disable */
    export default {
        name: 'Default',
        data(){
            return{
                length: 0,
            }
        },
        components: {
            Header: () => import("@/layout/components/Header.vue"),
            snack: () => import("@/components/snackBars/Snackbar.vue"),
        },
    }
</script>

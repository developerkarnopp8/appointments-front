    <template>
    <v-container>
        <NavBarDefault  />
    </v-container>
</template>
<script>
/* eslint-disable */
export default {
    name: 'Header',
    components: {
            NavBarDefault: () => import("@/components/ExpandingLogado/ExpandingHover.vue"),
        },
}
</script>
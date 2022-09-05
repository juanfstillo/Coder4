<template>
    <div class="container">
        <h1>Bienvenido/a {{ users.userLogged.name }}</h1>
        <ProductosAdmin/>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import ProductosAdmin from '../../../components/ProductosAdmin.vue';

export default {
    components:{ ProductosAdmin },
    computed: {
        ...mapState(["users", ["users", "userLogged"]]),
        ...mapGetters(["getUsers", "getUserLogged"]),
    },
    mounted() {
        const userAlreadyLogged = JSON.parse(localStorage.getItem('user'));
        if (userAlreadyLogged != null) {
            this.setUserLogged(userAlreadyLogged);
        } else {
            this.$router.push("/");
        }
    },
    methods: {
        ...mapActions("users", ["getUsersFromAPI", "setUserLogged"]),
    }
}
</script>

<style>
    .container{
        text-align: center;
    }
    h1{
        margin-top: 50px;
    }
</style>
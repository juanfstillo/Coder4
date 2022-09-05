<template>
<div>
    <div class="usuarios">
        <Productos/>
    </div>
</div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import Productos from '../../../components/Productos.vue';

export default {
    name: 'Usuario',
    components: { Productos },
    computed: {
        ...mapState(["products", ["products"]]),
        ...mapGetters(["getProducts"]),
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
        ...mapActions("users", ["setUserLogged"]),
        ...mapActions("products", ["getProductsFromAPI"]),
    }
}
</script>

<style>
    .usuarios {
        margin-top: 50px;
        text-align: center;
    }
    .divMisOrdenes {
        position: relative;
        overflow: hidden;
        justify-content: center;
        vertical-align: center;
        margin-bottom: 30px;
}
</style>
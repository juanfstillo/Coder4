<template>
    <div>
        <Carrito/>
        <div class="row">
            <div class="col centrado" v-for="item in products.products" :key="item.id">
                <Producto :producto="item"/>
            </div>
        </div>
    </div>
</template>

<script>
import Producto from './CartaProducto.vue';
import Carrito from './Carrito.vue';
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
    name: 'Products',
    components: { Producto, Carrito },
    mounted() {
        this.getProductsFromAPI();
    },
    computed: {
        ...mapState(['products']),
        ...mapGetters(['getProducts']),
    },
    methods: {
        ...mapActions('products', ['getProductsFromAPI']),
    },
}
</script>

<style scoped>

.centrado{
    text-align: center;
}

</style>

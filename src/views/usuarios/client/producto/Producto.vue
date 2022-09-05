<template>
    <div class="container">
        <div>
            <Carrito/>
        </div>
        <div class="container">
            <img :alt="actualProduct.name" :src="actualProduct.img" class="imgProducto"/>
                <h1>{{ actualProduct.name }}</h1>
                <h4>{{ actualProduct.desc }}</h4>
                <div>Disponibles: {{ actualProduct.stock }}</div>
                <div>$ {{ actualProduct.price }}</div>
                <input type="number" v-model="contador" @change="checkContador()" @keyup="checkContador()"/>
                <button :disabled="!botonProductoHabilitado" class="btn-producto save" @click="agregarProductoCarrito()">
                    <span>{{ valorBotonProducto }}</span>
                </button>
        </div>
            <router-link to="/index">
                <button class="btn-admin volver">
                    <span>Volver</span>
                </button>
            </router-link>
    </div>
</template>

<script>
import Carrito from '@/components/Carrito.vue';
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
    name: 'Producto',
    components: { Carrito },
    data() {
        return {
            contador: 0,
            valorBotonProducto: "Agregar",
            botonProductoHabilitado: false,
        }
    },
    computed: {
        ...mapState('products', ['actualProduct']),
        ...mapGetters('products', ['getProducts']),
    },
    methods: {
        ...mapActions('products', ['getProductsFromAPI', 'setActualProduct']),
        ...mapActions('cart', ['addProductToCart']),
        checkContador() {
            let miCont = parseInt(this.contador);
            if (miCont > this.actualProduct.stock){
                this.contador = this.actualProduct.stock;
            } else if (miCont < 0) {
                this.contador = 0;
            }
            this.checkStock();
        },
        checkStock() {
            let miCont = parseInt(this.contador);
            if (this.actualProduct.stock == 0){
                this.botonProductoHabilitado = false;
                this.valorBotonProducto = "Sin stock";
            } else if (this.actualProduct.stock != 0 && miCont == 0) {
                this.botonProductoHabilitado = false;
                this.valorBotonProducto = "Agregar";
            } else {
                this.botonProductoHabilitado = true;
                this.valorBotonProducto = "Agregar";
            }
        },
        agregarProductoCarrito(){
            let miProducto = {...this.actualProduct};
            miProducto.stock = parseInt(this.contador);
            this.addProductToCart(miProducto);
            this.actualProduct.stock -= parseInt(this.contador);
            this.contador = 0;
            this.checkStock();
        }
    },
    mounted() {
        this.setActualProduct(this.$route.params.id);
    }
}

</script>

<style scoped>
    .container {
        margin-top: 50px;
        margin-bottom: 20px;
        text-align: center;
    }
    .imgProducto {
        max-height: 250px;
    }
    .volver{
        max-width: 100px;
    }
</style>
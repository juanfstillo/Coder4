<template>
    <div>
        <div class="grillaProducto">
            <img
                :alt="producto.name"
                :src="producto.img"
                class="imgGrilla"
            />
            <h4>{{ producto.name }}</h4>
            <div>Disponibles: {{ producto.stock }}</div>
            <div>$ {{ producto.price }}</div>
            <input type="number" v-model="contador" @keyup="checkContador()" @change="checkContador()"/>
            <div class="divEditar">
                <button :disabled="!botonProductoHabilitado" class="btn-editar save" @click="agregarProductoCarrito()">
                    <span>{{ valorBotonProducto }}</span>
                </button>
                <router-link class="noUnderline" :to="{ name: 'Producto', params: { id: producto.id }}">
                    <button type="button" class="btn-editar edit">
                        <span>Ver Detalle</span>
                    </button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
    data() {
        return {
            contador: 0,
            valorBotonProducto: "Agregar",
            botonProductoHabilitado: false,
        }
    },
    name: 'CartaProducto',
    props:{
        producto: {
            type: Object,
            required: true
        },
    },
    computed: {
        ...mapState(['products']),
        ...mapGetters(['getProducts']),
        ...mapState(['cart']),
        ...mapGetters(['getCart'])
    },
    methods: {
        ...mapActions('products', ['getProductsFromAPI', 'setActualProduct']),
        ...mapActions('cart', ['addProductToCart']),
        checkContador() {
            let miCont = parseInt(this.contador);
            if (miCont > this.producto.stock){
                this.contador = this.producto.stock;
            } else if (miCont < 0) {
                this.contador = 0;
            }
            this.checkStock();
        },
        checkStock() {
            let miCont = parseInt(this.contador);
            if (this.producto.stock == 0){
                this.botonProductoHabilitado = false;
                this.valorBotonProducto = "Sin stock";
            } else if (this.producto.stock != 0 && miCont == 0) {
                this.botonProductoHabilitado = false;
                this.valorBotonProducto = "Agregar";
            } else {
                this.botonProductoHabilitado = true;
                this.valorBotonProducto = "Agregar";
            }
        },
        agregarProductoCarrito(){
            let miProducto = {...this.producto};
            miProducto.stock = parseInt(this.contador);
            this.addProductToCart(miProducto);
            this.producto.stock -= parseInt(this.contador);
            this.contador = 0;
            this.checkStock();
        },
        checkCarritoStock() {
            this.cart.carrito.forEach(element => {
                if (element.id == this.producto.id) {
                    this.producto.stock -= element.stock;
                }
            });
        }
    },
    mounted(){
        this.checkCarritoStock();
    }
}
</script>

<style scoped>
.grillaProducto{
    width: 300px;
    max-height: 380px;
    box-shadow: 0 0 10px rgba(45, 75, 100, 0.7);
    background-color: rgba(149, 184, 214, 0.7);
    color: black;
    padding: 5px;
    margin: auto;
    border-radius: 10px;
    cursor: pointer;
    text-align: center;
    z-index: 1;
}

.imgGrilla {
    max-width: 100%;
    height: 150px;
}

.grillaProducto:hover {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.7);
}

button {
    border-radius: 10px;
    max-width: 100px;
}

.divEditar {
    margin-top: 10px;
}
</style>
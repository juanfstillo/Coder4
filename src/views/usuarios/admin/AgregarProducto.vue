<template>
    <div class="container">
        <form class="formProducto">
            <div class="floating-content">
                <input type="text" id="nombre" class="floating-input" placeholder=" " v-model="producto.name"/>
                <label class="floating-label" for="nombre">Nombre:</label>
            </div>
            <div class="floating-content">
                <input type="text" id="imagen" class="floating-input" placeholder=" " v-model="producto.img"/>
                <label class="floating-label" for="imagen">Imagen:</label>
            </div>
            <div class="floating-content">
                <textarea id="desc" class="floating-input" placeholder=" " v-model="producto.desc"></textarea>
                <label class="floating-label" for="desc">Descripción:</label>
            </div>
            <div class="floating-content">
                <input type="number" class="floating-input" id="precio" v-model="producto.price"/>
                <label class="floating-label" for="precio">Precio:</label>
            </div>
            <div class="floating-content">
                <input type="number" class="floating-input" id="stock" v-model="producto.stock"/>
                <label class="floating-label" for="stock">Stock:</label>
            </div>
            <div class="divEditar">
                <button class="btn-editar save" @click="guardarProducto()">
                    <span>Guardar Producto</span>
                </button>
                <router-link to="/admin">
                    <button class="btn-editar volver">
                        <span>Volver</span>
                    </button>
                </router-link>
            </div>
        </form>
    </div>
</template>

<script>

import { mapActions, mapGetters, mapState } from 'vuex';

export default {
    data() {
        return {
            producto: {
                name: "",
                img: "",
                desc: "",
                price: 0,
                stock: 0,
            },
        }
    },
    methods: {
        ...mapActions('products', ['getProductsFromAPI', 'editProduct', 'deleteProduct', 'addProductToAPI']),
        guardarProducto() {
            if (this.checkForm()) {
                const result = this.addProductToAPI(this.producto);
                if (result) {
                    alert(`El producto ${this.producto.name} fue agregado exitosamente`);
                    this.clearForm();
                }
            } else {
                alert("Todos los campos son obligatorios");
            }
        },
        checkForm() {
            return this.producto.name != "" && this.producto.img != "" && this.producto.desc != "";
        },
        clearForm() {
            this.producto.name = "";
            this.producto.img = "";
            this.producto.desc = "";
            this.producto.price = 0;
            this.producto.stock = 0;
        },
    },
    computed: {
        ...mapState(['products']),
        ...mapGetters(['getProducts']),
    },
}
</script>

<style scoped>

    .formProducto {
        margin-top: 40px;
    }
    a {
        text-decoration: none;
    }
</style>
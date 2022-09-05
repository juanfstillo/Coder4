<template>
    <div class="container">
        <form action="">
            <div class="floating-content">
                <input class="floating-input" type="text" id="nombre" placeholder=" " v-model="producto.name"/>
                <label class="floating-label" for="nombre">Nombre:</label>
            </div>
            <div class="floating-content">
                <input class="floating-input" type="text" id="imagen" placeholder=" " v-model="producto.img">
                <label class="floating-label" for="imagen">Imagen:</label>
            </div>
            <div class="floating-content">
                <textarea class="floating-input" id="descripcion" placeholder=" " v-model="producto.desc"></textarea>
                <label class="floating-label" for="descripcion">Descripcion:</label>
            </div>
            <div class="floating-content">
                <input class="floating-input" type="number" id="precio" v-model="producto.price">
                <label class="floating-label" for="precio">Precio:</label>
            </div>
            <div class="floating-content">
                <input class="floating-input" type="number" id="stock" v-model="producto.stock">
                <label class="floating-label" for="stock">Stock:</label>
            </div>
            <div class="divEditar">
                <button class="btn-editar edit" @click="editarProducto()">
                    <span>Editar Producto</span>
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
import { mapActions, mapGetters, mapState } from 'vuex'

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
        ...mapActions('products', ['getProductsFromAPI', 'editProduct', 'deleteProduct', 'editProductToAPI']),
        editarProducto() {
            const result = this.editProductToAPI(this.producto);
            if (result) {
                alert(`El producto ${this.producto.name} fue editado exitosamente`);
                this.$router.push('/admin');
            }
        },
    },
    computed: {
        ...mapState(['products']),
        ...mapGetters(['getProducts']),
    },
    mounted() {
        let id = this.$route.params.id;
        this.products.products.forEach(product => {
            if (product.id == id) {
                this.producto = product;
            }
        });
    }
}

</script>

<style scoped>

    .container {
        margin-top: 80px;
    }
    textarea {
        height: 50px;
        padding-top: 10px;
    }
    a {
        text-decoration: none;
    }
</style>
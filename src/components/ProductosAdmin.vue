<template>
  <div class="container">
        <table class="table" v-if="(products.products.length != 0)">
            <thead>
                <th>#</th>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Editar</th>
                <th>Borrar</th>
            </thead>
            <tbody>
                <tr v-for="(product) in products.products" :key="product.id">
                    <td>{{ product.id }}</td>
                    <td><img :src="product.img" :alt="product.name" class="imgProd"></td>
                    <td>{{ product.name }}</td>
                    <td>{{ product.price }}</td>
                    <td>{{ product.stock }}</td>
                    <td>
                        <div class="divAdmin">
                            <button class="btn-admin editar" @click="editarProducto(product.id)"><span>Editar</span></button>
                        </div>
                    </td>
                    <td>
                        <div class="divAdmin">
                            <button class="btn-admin borrar" @click="borrarProducto(product.id)"><span>Borrar</span></button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="divLogin">
            <router-link to="/nuevoProducto">
                <button class="btn-login">
                    <span>Agregar nuevo producto</span>
                </button>
            </router-link>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
    methods: {
        ...mapActions('products', ['getProductsFromAPI', 'editProduct', 'deleteProduct']),
        editarProducto(id) {
            this.$router.push('editarProducto/' + id);
        },
        borrarProducto(id){
            this.deleteProduct(id);
            alert(`El producto fue borrado exitosamente`);
        }
    },
    computed: {
        ...mapState(['products']),
        ...mapGetters(['getProducts']),
    },
    mounted(){
        this.getProductsFromAPI();
    }
}
</script>

<style scoped>
    .container{
        padding-top: 80px;
    }
    .imgProd {
        height: 100px;
    }
</style>
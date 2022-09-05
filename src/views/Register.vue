<template>
<div class = "app">
    <div class="row">
        <h2 class=" text-center display 2 text-white mb-4 pb-2 pb-md-0 mb-md-5">Register New User</h2>
         <div class="col-12 d-flex justify-content-center">
            <form>                
            <div class="col-md-12 mb-2">
                <label for="username" class="form-label">User: </label>
                <input type="text" id="username" class="form-control" @keyup="validarUserName()" v-model="user.username"/>
            </div>
            <div class="col-md-12 mb-2" v-if='mensajeUsername != ""'>
                <p class="errorForm">{{ mensajeUsername }}</p>
            </div>
            
            <div class="col-md-12 mb-2">
                <label for="password" class="form-label"> Password: </label>
                <input type="password" id="password" class="form-control" @keyup="validarPassword()" v-model="user.password"/>
            </div>
            <div class="col-md-12 mb-2" v-if='mensajePassword != ""'>
                <p class="errorForm">{{ mensajePassword }}</p>
            </div>

            <div class="col-md-12 mb-2">
                <label for="nombre" class="form-label">Name and Lastname: </label>
                <input type="text" id="nombre" class="form-control" @keyup="validarNombre($event)" v-model="user.name"/>
            </div>
            <div class="col-md-12 mb-2" v-if='mensajeNombre != ""'>
                <p class="errorForm">{{ mensajeNombre }}</p>
            </div>
           
            <div class="col-md-12 mb-2">
                <label for="email" class="form-label">Mail: </label>
                <input type="text" id="email"  class="form-control" @keyup="validarEmail()" v-model="user.email"/>
            </div>
            <div class="col-md-12 mb-2" v-if='mensajeMail != ""'>
                <p class="errorForm">{{ mensajeMail }}</p>
            </div>
           
            <div class="col-md-12 mb-2">
                <label for="edad" class="form-label">Age: </label>
                <input type="number" id="edad" class="form-control" @keyup="validarEdad()" @change="validarEdad()" v-model="user.edad"/>
            </div>
            <div class="col-md-12 mb-2" v-if='mensajeEdad != ""'>
                <p class="errorForm">{{ mensajeEdad }}</p>
            </div>

            <div class="mt-4 pt-2">
                <input type="button" class="btn btn-secondary btn-lg" value="Add" @click="agregarUsuario"/>
            </div>
            <div class="mt-4 pt-2 pb-2">
                <router-link type="button" class="btn btn-secondary btn-lg" to="/">Back</router-link>
            </div>
        </form>
        </div>
    </div>
</div>
</template>

<script>
import store from '@/store';
import { mapState, mapGetters } from 'vuex';
export default {
    data() {
        return {
            user: {
                username: "",
                name: "",
                email: "",
                edad: 0,
                password: "",
                rol: 1,
            },
            mensajeEdad: "",
            mensajeMail: "",
            mensajeNombre: "",
            mensajePassword: "",
            mensajeUsername: "",
        }
    },
    methods: {
        resetForm() {
            this.user.username = "";
            this.user.name = "";
            this.user.email = "";
            this.user.edad = 0;
            this.user.password = "";
        },
        checkNewUserForm() {
            return (this.validarUserName() && this.validarNombreSubmit() && this.validarEmail() && this.validarEdad() && this.validarPassword())
            },
        validarUserName(){
            let regex1 = /^\S[a-zA-Z]{3,}/;
            if (regex1.test(this.user.username)){
                this.mensajeUsername = "";
                return true;
            } else {
                this.mensajeUsername = "Invalid User name";
                return false;
            }
        },
        validarNombre(event){
            if ((event.wich > 47 && event.wich < 58) || (event.wich > 95 && event.wich < 106)) {
                this.user.name = this.user.name.substring(0,this.user.name.length-1);
                return false;
            }
            let regex = /[a-zA-ZÀ-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-ZÀ-ÖØ-öø-ÿ]+\.?)*/;
            if (regex.test(this.user.name)){
                this.mensajeNombre = "";
                return true;
            } else {
                this.mensajeNombre = "Invalid format name";
                return false;
            }
        },
        validarNombreSubmit(){
            let regex2 = /[a-zA-ZÀ-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-ZÀ-ÖØ-öø-ÿ]+\.?)*/;
            if (regex2.test(this.user.name)){
                this.mensajeNombre = "";
                return true;
            } else {
                this.mensajeNombre = "Invalid name format";
                return false;
            }
        },
        validarEmail(){
            let regex3 = /^[^@]+@[^@]+.[a-zA-Z]{2,}$/;
            if (regex3.test(this.user.email)){
                this.mensajeMail = "";
                return true;
            } else {
                this.mensajeMail = "Invalid mail";
                return false;
            }
        },
        validarEdad(){
            if (this.user.edad >= 18 && this.user.edad <= 100){
                this.mensajeEdad = "";
                return true;
            } else if (this.user.edad < 0) {
                this.user.edad = 0;
            } else if (this.user.edad > 100) {
                this.user.edad = 100;
            }
            this.mensajeEdad = "Invalid age";
            return false;
            },
        validarPassword(){
            let regex4 = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
            if (regex4.test(this.user.password)){
                this.mensajePassword = "";
                return true;
            } else {
                this.mensajePassword = "Invalid pass. Include at least a number, and special character and an uppercase letter"
                return false;
            }
        },
        agregarUsuario() {
            if (this.checkNewUserForm()){
                store.dispatch('users/addUser', this.user);
                this.$router.push("/");
            } else {
                alert("Please, try again and complete the form properly");
            }
        },
    },
    computed: {
        ...mapState(["users", "userLogged", "orders"]),
        ...mapGetters(["getUsers", "getUserLogged", "getOrders"]),
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@200&display=swap');
body{
    font-family: Nunito;
}
.app {
    background: linear-gradient(to bottom right, rgba(240, 147, 251, 1), rgba(245, 87, 108, 1))
}
.errorForm{
    color:white;
    font-size: 20px;
}

</style>
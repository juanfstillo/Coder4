<template>
  <div>
        <section class="vh-100 gradient-custom">
                    <div class="container py-5 h-100">
                     <div class="row justify-content-center align-items-center h-100">
                                  <div class="col-12 col-lg-9 col-xl-7">
                <div class="card shadow-2-strong card-registration" style="border-radius: 15px;">
                <div class="card-body p-4 p-md-5">
                    <h3 class="mb-4 pb-2 pb-md-0 mb-md-5">Login</h3>


        <form>
        <div class="row">
            <div class="col-md-12 mb-4">
                
                <div class="form-outline">
                    <input type="text" id="username" class="form-control form-control-lg" v-model="userForm.username"/>
                    <label class="form-label" for="username">Usuario: </label>
                </div>
                <div class="form-outline">
                    <input type="password" id="password" class="form-control form-control-lg" v-model="userForm.password"/>
                    <label class="form-label" for="password">Contraseña: </label>
                </div>

                <div class="alert alert-danger" v-if="error_login" role="alert">Usuario o contraseña incorrecta</div>

            </div>

            <div class="mt-4 pt-2">
                <input type="button" class="btn btn-secondary btn-lg" value="Login" @click="Login"/>
            </div>
            
            <div class="mt-4 pt-2">
                <router-link type="button" class="btn btn-secondary btn-lg" to="/register">Register</router-link>
            </div>

        </div>

        </form>
            </div>
            </div>
        </div>
     </div>
     </div>

    </section>
    </div>
</template>


<script>

import { mapState, mapActions, mapGetters } from 'vuex';

export default {
    name: 'Login',
    data(){
        return {
            userForm: {
                username: "",
                password: "",
            },
            msgError: "",
            error_login: false
        }
    },
    mounted(){
        this.getUsersFromAPI();
        localStorage.removeItem('user');
    },
    methods: {
        ...mapActions("users", ["getUsersFromAPI", "setUserLogged"]),

        tryToLog(users) {
            for (const element of users){
                if (element.username == this.userForm.username){
                    if(element.password == this.userForm.password){
                        var result = {'isValid': true, 'user': element};
                        return result;
                    } else {
                        result = {'isValid': false}
                    }
                } else {
                    result = {'isValid': false}
                }
            }
            return result;
        },

        Login(){
            this.error_login = false;
            let result = this.tryToLog(this.users.users);
            if (result.isValid){
                this.setUserLogged(result.user);
                delete result.user.password;
                localStorage.setItem('user', JSON.stringify(result.user));
                if(result.user.rol == 99) {
                    this.$router.push('/admin');
                } else {
                    this.$router.push('/index');
                }
            } else {
                this.error_login = true
            }
        },
    },
    computed: {
        ...mapState(["users", ["users", "userLogged", "orders"]]),
        ...mapGetters(["getUsers", "getUserLogged"]),
    }
}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@200&display=swap');
body{
    font-family: Nunito;
    }
.gradient-custom {
/* fallback for old browsers */
background: #f093fb;
/* Chrome 10-25, Safari 5.1-6 */
background: -webkit-linear-gradient(to bottom right, rgba(240, 147, 251, 1), rgba(245, 87, 108, 1));
/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
background: linear-gradient(to bottom right, rgba(240, 147, 251, 1), rgba(245, 87, 108, 1))
}
.card-registration .select-input.form-control[readonly]:not([disabled]) {
font-size: 1rem;
line-height: 2.15;
padding-left: .75em;
padding-right: .75em;
}
.card-registration .select-arrow {
top: 13px;
}
</style>
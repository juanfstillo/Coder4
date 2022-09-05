<template>
<div>
<div v-if="users.userLogged.rol == 1">
   <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
         <router-link class="nav-link" :to="{ name: 'Usuario' }">
            <img src="../assets/logo.png" alt="nrsLogoNavBar" width="30" height="24">       
         </router-link>
         <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'MisOrdenes', params: { id: users.userLogged.id }}">
                         My orders
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'About' }">
                        About
                    </router-link>
                </li>
                 <li class="nav-item">
                    <p class="nav-link" @click="logout" >Salir</p>    
                </li>
            </ul>
         </div>
      </div>
   </nav>
</div>
<div v-if="users.userLogged.rol == 99">
 <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
         <router-link class="nav-link" :to="{ name: 'Usuario' }">
            <img src="../assets/logo.png" alt="nrsLogoNavBar" width="30" height="24">       
         </router-link>
         <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                 <li class="nav-item">
                    <p class="nav-link" @click="logout" >Salir</p>    
                </li>
            </ul>
         </div>
      </div>
   </nav>
</div> 
</div>
</template>

<script>

import { mapGetters, mapState } from 'vuex';

export default {
    name: "Navbar",
    computed: {
            ...mapState(["users", ["userLogged"]]),
            ...mapGetters(["getUserLogged"]),
        },
    methods: {
        logout() {
            localStorage.removeItem('user');
            this.$router.push("/");
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@200&display=swap');
body{
    font-family: Nunito;
}
</style>
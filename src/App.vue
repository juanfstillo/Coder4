<template>
    <div id="app">
        <div id="navbar" v-if="this.$route.path != '/' && this.$route.path != '/register'">
            <Navbar/>
        </div>
        <router-view/>
        <Footer/>

    </div>
</template>

<script>

    import Navbar from './components/Navbar.vue';
    import Footer from './components/Footer.vue'


    export default {
        name: "App",
        components: { Navbar, Footer }
    }
    
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@200&display=swap');
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body{
    font-family: Nunito;
}

    .divLogOff {
    position: relative;
    overflow: hidden;
    justify-content: center;
    vertical-align: center;
    }
    .logOff span{
    font-weight: bold;
    z-index: 2;
}
    .logOff {
    height: 40px;
    width: 80px;
    border: none;
    color: #000;
    background: #b80303;
    transition: .3s ease-in-out all;
    font-weight: bold;
    z-index: 2;
    }
    .logOff::after {
        content: "";
        width: 1px;
        height: 1px;
        background: none;
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        transition: .3s ease-in-out all;
        border-radius: 4000px;
        transform-origin: center;
    }


    .logOff:hover {
        background-color: rgb(20, 20, 20);
        color: #FFF;
    }
</style>
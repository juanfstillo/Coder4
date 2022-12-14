import Vue from 'vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import router from './router';
import store from './store';


Vue.config.productionTip = false;


new Vue({
  store,router,
  render: h => h(App),
}).$mount('#app')

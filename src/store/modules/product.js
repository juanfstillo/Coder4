const axios = require('axios');
const apiURL = process.env.VUE_APP_API_URL;

export default {
    namespaced: true,
    state: {
        products: [],
        actualProduct: null,
    },
    getters: {
        getProducts(state) {
            return state.products
        },
        getActualProduct(state) {
            return state.actualProduct
        },
    },
    mutations: {
        setProducts(state, data) {
            state.products = data;
        },
        setActualProduct(state, data) {
            state.actualProduct = data;
        },
        setProduct(state, data){
            state.products[data.i] = data.product;
        },
        deleteProduct(state, i){
            state.products.splice(i,1);
        },
        addProduct(state, data) {
            state.products.push(data);
        },
        addStockProduct(state, data){
            state.products[data.i].stock += data.stock;
        }
    },
    actions: {
        async getProductsFromAPI({ commit }){
            let result = null;
            result = await axios.get(`${apiURL}/products`)
            .then(response => {
                let result = response.data;
                return result;
            })
            .catch(error => {
                console.error(error);
            });
            if (result != null){
                commit('setProducts', result);
            }
        },
        async addProductToAPI({ commit }, data) {
            let result = null;
            result = await axios.post(`${apiURL}/products`, data)
            .then(response => {
                let result = response.dza;
                return result;
            })
            .catch(error => {
                console.error(error);
            });
            if (result != null) {
                commit('addProduct', data);
            }
        },
        async editProductToAPI({ commit, state }, product){
            let result = null;
            result = await axios.put(`${apiURL}/products/${product.id}`, product)
            .then(response => {
                let result = response.data;
                return result;
            })
            .catch(error => {
                console.error(error);
            });
            if (result != null) {
                for (let i = 0; i < state.products.length; i++) {
                    if (state.products[i].id == product.id) {
                        const data = {
                            'i': i,
                            'product': product
                        };
                        commit('setProduct', data);
                    }
                }
            }
            
        },
        async deleteProduct({ commit, state }, id) {
            let result = null;
            result = await axios.delete(process.env.VUE_APP_API_URL + '/products/' + id)
            .then(response => {
                let result = response.data;
                return result;
            })
            .catch(error => {
                console.error(error);
            });
            if (result != null) {
                for(let i = 0; i < state.products.length; i++) {
                    if (state.products[i].id == id){
                        commit('deleteProduct', i);
                    }
                }
            }
        },
        setActualProduct({ commit, state }, id) {
            for (const element of state.products){
                if (element.id == id){
                    commit('setActualProduct', element);
                }
            }
        },
        updateStockProduct({ commit, state }, data) {
            let payload = null;
            for (let i = 0; i < state.products.length; i++) {
                if (state.products[i].id == data.id) {
                    payload = {
                        'i': i,
                        'stock': data.stock
                    }
                }
            }
            if (payload != null){
                commit('addStockProduct', payload);
            }
        }
    }
}
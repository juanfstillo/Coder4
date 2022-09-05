const axios = require('axios');
const apiURL = process.env.VUE_APP_API_URL;

export default {
    namespaced: true,
    state: {
        users: [],
        userLogged: {},
        orders: []
    },
    getters: {
        getUsers(state) {
            return state.users;
        },
        getUserLogged(state) {
            return state.userLogged;
        },
        getOrders(state) {
            return state.orders;
        }
    },
    mutations: {
        setUsers(state, data) {
            state.users = data;
        },
        setUserLogged(state, data) {
            state.userLogged = data;
        },
        setOrders(state, data) {
            state.orders = data;
        },
        setUser(state, data){
            state.users[data.i] = data.user;
        },
        addUser(state, data) {
            state.users.push(data);
        }
    },
    actions: {
        async getUsersFromAPI({ commit }){
            let result = null;
            result = await axios.get(`${apiURL}/users`)
            .then(response => {
                let result = response.data;
                return result;
            })
            .catch(error => {
                console.error(error);
            });
            if (result != null) {
                commit('setUsers', result);
            };
        },
        async getOrdersFromAPI({ commit, state }) {
            let result = null;
            result = await axios.get(`${apiURL}/users/${state.userLogged.id}/orders`)
            .then(response => {
                let result = response.data;
                return result;
            })
            .catch(error => {
                console.error(error);
            });
            if (result != null) {
                commit('setOrders', result);
            };
        },
        setUserLogged({ commit }, user) {
            commit('setUserLogged', user);
        },
        async setUser({ commit, state }, user) {
            let result = null;
            result = await axios.put(`${apiURL}/users/${user.id}`)
            .then(response => {
                let result = response.data;
                return result;
            })
            .catch(error => {
                console.error(error);
            }) 
            if (result != null) {
                for (i = 0; i < state.users.length; i++) {
                    if (state.users[i].id == user.id) {
                        commit('setUser', {'i': i, 'user': user});
                    };
                };
            };
        },
        async addUser({ commit, state }, user) {
            let result = null;
            result = await axios.post(`${apiURL}/users`, user)
            .then(response => {
                let result = response.data;
                return result;
            })
            .catch(error => {
                console.error(error);
            })
            if (result != null) {
                commit('addUser', user);
            }
        }
    },
    
}
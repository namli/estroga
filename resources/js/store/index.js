import axios from 'axios';
import { createStore } from 'vuex'
import sharedMutations from 'vuex-shared-mutations';


export default createStore({
    state() {
        return {
            user: null,
            code_time: null
        }
    },
    getters: {
        user(state) {
            return state.user;
        },
        code(state) {
            return state.code_time;
        }
    },
    mutations: {

        setUser(state, userData) {
            state.user = userData;
            localStorage.setItem('user', JSON.stringify(userData));
            axios.defaults.headers.common.Authorization = `Bearer ${userData.token}`;
        },
        clearUserData() {
            localStorage.removeItem('user');
            location.reload();
        },
        setCode(state, time) {
            state.code_time = time;
        }


    },

    actions: {

        async login({ commit }, payload) {
            try {
                await axios.get('/sanctum/csrf-cookie');

                await axios.post('/api/login', payload).then((res) => {
                    commit('setUser', res.data)
                    // return dispatch('getUser');
                }).catch((err) => {
                    throw err.response
                });

            } catch (err) {
                // throw err
            }

        },
        async register({ dispatch }, payload) {
            try {
                await axios.post('/api/register', payload).then((res) => {
                    return dispatch('login', { 'email': payload.email, 'password': payload.password })
                }).catch((err) => {
                    throw (err.response)
                })
            } catch (err) {
                // throw (err)
            }
        },
        async logout({ commit }) {
            await axios.post('/api/logout').then((res) => {
                commit('clearUserData')
            }).catch((err) => {
                // throw (err)
            })

        },
        async getUser({ commit }) {
            await axios.get('/api/user').then((res) => {
                commit('setUser', res.data);
            }).catch((err) => {
                // throw (err)
            })
        },
        async getCode({ commit }, payload) {
            await axios.post('/api/delivery/search/' + payload.code).then((res) => {
                commit('setCode', res.data[0].await_delivery_at);
            }).catch((err) => {
                // throw (err)
            })

        },
    },
    plugins: [sharedMutations({ predicate: ['setUser'] })],


})

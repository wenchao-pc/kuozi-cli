/**
 * Created by kuo zi on 2016/10/19.
 */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        //加载中
        spinner: true,
        loading: false,
        // 过渡模式
        transition: false,
        // 敏感词
        sensitiveWords: []
    },
    mutations: {
        spinner(state, param) {
            state.spinner = param;
        },
        loading(state) {
            state.loading = true;
        },
        loaded(state) {
            state.loading = false;
        }
    },
    actions: {},
    getters: {},
    modules: {},
    plugins: []
});

export default store;

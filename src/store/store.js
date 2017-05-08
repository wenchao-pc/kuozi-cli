/**
 * Created by kuo zi on 2016/10/19.
 */
import Vue from "vue";
import Vuex from "vuex";
import pbMessagePlugin from "./plugins/pbMessage.js";

const pbMessage = pbMessagePlugin();

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        username: "pb",
        //加载中
        spinner: true,
        loading: false,
        // 我的自选基金
        myfund: {},
        pbMessageNum: 0
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
    actions: {

    },
    getters: {

    },
    plugins: [pbMessage]
});

export default store;

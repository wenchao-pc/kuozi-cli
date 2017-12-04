// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill";

import Vue from "vue";

import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import "./style/style.less";
import router from './router/router';
import store from './store/store';
import "./directive/directive";
import "./mixin/mixin";
import "./filter/filter";
import App from "./App";

import FastClick from "fastclick";

// 去掉ios上300毫秒延迟
FastClick.attach(document.body);

Vue.use(MintUI);

Vue.config.devtools = true;
let vm = new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
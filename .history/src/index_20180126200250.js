// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill";

import Vue from "vue";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// import "./style/element-variables.scss";

import "./style/style.less";
import "./../config/project/project.css";

import router from "./router/router";
import store from "./store/store";
import "./directive/directive";
import "./mixin/mixin";
import "./filter/filter";
import App from "./App";

Vue.use(ElementUI, { size: "small" });

Vue.config.devtools = true;
let vm = new Vue({
    el: "#app",
    router,
    store,
    render: h => h(App)
});

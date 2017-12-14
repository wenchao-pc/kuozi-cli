/**
 * Created by kuo zi on 2016/10/12.
 */
import Vue from "vue";
import Router from "vue-router";

import Index from "../view/index.vue";
import Login from "../view/login.vue";
import Main from "../view/main.vue";

// 需要登录页面
import { login, needlogin, nologin } from "./loginIntercept";

Vue.use(Router);

let { routes } = require("./router." + (process.env.SPLIT ? "split" : "full") + ".js");

for (let key of Object.keys(routes)) {
    routes[key].meta = routes[key].meta || {};
    routes[key].meta.login = login;
}

for (let page of needlogin) {
    if (!routes[page]) continue;
    routes[page].meta = routes[page].meta || {};
    routes[page].meta.login = true;
}

for (let page of nologin) {
    if (!routes[page]) continue;
    routes[page].meta = routes[page].meta || {};
    routes[page].meta.login = false;
}

let allRoutes = [
    {
        name: "index",
        path: "/index",
        meta: { login: false },
        component: Index
    },
    {
        name: "login",
        path: "/login",
        meta: { login: false },
        component: Login
    },
    {
        name: "main",
        path: "/main",
        meta: { login: true },
        redirect: { name: "home" },
        component: Main,
        children: Object.values(routes)
    }
];

let router = new Router({
    // history模式需要后台支持
    // mode: "history",
    // scrollBehavior: () => ({ y: 0 }),
    routes: allRoutes
});

//路由跳转钱操作
router.beforeEach((to, form, next) => {
    // 登录过滤
    if (to.meta.login && !window.login) {
        next({ name: "login", query: { path: to.fullPath } });
    } else {
        next();
    }
});

export default router;

/**
 * Created by kuo zi on 2016/10/12.
 */
import Vue from "vue";
import Router from "vue-router";

// 是否登录控制
import { login, needlogin, nologin } from "./loginIntercept";

Vue.use(Router);

let { routes } = require("./router." + (process.env.SPLIT ? "split" : "full") + ".js");

// 配置默认login
for (let key of Object.keys(routes)) {
    routes[key].meta = routes[key].meta || {};
    routes[key].meta.login = login;
}

// 配置需要登录页面
for (let page of needlogin) {
    if (!routes[page]) continue;
    routes[page].meta = routes[page].meta || {};
    routes[page].meta.login = true;
}

// 配置不需要登录页面
for (let page of nologin) {
    if (!routes[page]) continue;
    routes[page].meta = routes[page].meta || {};
    routes[page].meta.login = false;
}

let router = new Router({
    // history模式需要后台支持
    // mode: "history",
    // scrollBehavior: () => ({ y: 0 }),
    routes: Object.values(routes)
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

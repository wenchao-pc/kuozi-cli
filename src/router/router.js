/**
 * Created by kuo zi on 2016/10/12.
 */
import Vue from "vue";
import Router from "vue-router";

// 需要登录页面
import loginIntercept from "../utils/loginIntercept";

Vue.use(Router);

let { routes } = require("./router." + (process.env.SPLIT ? "split" : "full") + ".js");

for (let page of loginIntercept) {
    if (!routes[page]) continue;
    routes[page].meta = routes[page].meta || {};
    routes[page].meta.login = true;
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

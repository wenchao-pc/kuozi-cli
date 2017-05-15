/**
 * Created by kuo zi on 2016/10/12.
 */
import Vue from "vue";
import Router from "vue-router";

import index from "./../view/index.vue";
import login from "./../view/login.vue";
import home from "./../view/home";

Vue.use(Router);

let router = new Router({
    // history模式需要后台支持
    // mode: "history",
    scrollBehavior: () => ({ y: 0 }),
    routes: [{
        name: "index",
        path: "/index",
        component: login
    }, {
        name: "login",
        path: "/login",
        component: login
    }, {
        name: "home",
        path: "/home",
        component: home,
        // children: main
    }, ]
});
//路由跳转钱操作
router.beforeEach((to, form, next) => {
    // 登录过滤
    if (to.meta.login && !window.login) {
        next({ name: "login", query: { path: to.fullPath } });
    } else {
        if (to.fullPath.match("http")) {
            console.log(to.fullPath.replace("/", ""));
            window.location.href = to.fullPath.replace("/", "");
        }
        if (to.fullPath.match("www")) {
            window.location.href = to.fullPath.replace("/", "http://");
        }
        next();
    }
})

export default router;

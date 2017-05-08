/**
 * Created by kuo zi on 2016/10/12.
 */
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);


let routes = [];

function importAll(r) {
    r.keys().forEach(key => {
        let path = key.replace(".", "").replace(".vue", "");
        let name = _.last(path.split("/"));
        routes.push({
            name: name,
            path: path,
            component: r(key)
        });
    })
};

importAll(require.context('./../view/', true, /\.vue$/));

let router = new Router({
    // history模式需要后台支持
    // mode: "history",
    scrollBehavior: () => ({ y: 0 }),
    routes: routes
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

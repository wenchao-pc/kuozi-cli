/**
 * Created by kuo zi on 2016/10/12.
 */
let routes = {
	home:{name: "home",path: "/home",meta:{ login: false },component: () => import ("./../view/home.vue")},
	index:{name: "index",path: "/index",meta:{ login: false },component: () => import ("./../view/index.vue")},
};
export { routes };
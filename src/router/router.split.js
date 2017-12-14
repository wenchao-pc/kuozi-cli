/**
 * Created by kuo zi on 2016/10/12.
 */
let routes = {
	home:{name: "home",path: "/home",meta:{ login: false },component: () => import ("./../view/main/home.vue")},
};
export { routes };
import _last from "lodash/last";
let routes = {};
const components = require.context('./../view/main/', true, /\.vue$/);
components.keys().forEach(key => {
    let path = key.replace(".", "").replace(".vue", "");
    let name = _last(path.split("/"));
    let route = {
        name: name,
        path: path,
        meta: { login: false },
        component: components(key)
    };
    routes[name] = route;
});
export { routes };
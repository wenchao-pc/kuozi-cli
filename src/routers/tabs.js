let tabs = [];

function importAll(r) {
    r.keys().forEach(key => {
        let path = key.replace(".", "").replace(".vue", "");
        let name = _.last(path.split("/"));
        if (name != "home") {
            tabs.push({
                name: name,
                title: name,
                component: r(key)
            });
        }
    })
};

importAll(require.context('./../view/tabs/', true, /\.vue$/));

export default tabs;

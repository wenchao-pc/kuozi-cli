import store from "store";
export let forward = {
    methods: {
        forward(e, token) {
            if (e === false) {
                this.$router.replace({ name: "login", query: { path: this.$route.query.path } });
            } else {
                if (e) {
                    window.login = true;
                    if (token) {
                        store.set("$token", token);
                    }
                }
                let path = this.$route.query.path;
                if (path && path != "/" && path != "/index" && path != "/login") {
                    if (token) {
                        this.$router.push({
                            path: this.$route.query.path
                        });
                    } else {
                        this.$router.replace({
                            path: this.$route.query.path
                        });
                    }
                } else {
                    this.$router.replace({
                        name: "main"
                    });
                }
            }
        }
    }
};
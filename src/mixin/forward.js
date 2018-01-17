import store from "store";
import { login } from "../router/loginIntercept";
export default {
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
                if (path && path != "/" && !/^\/index/.test(path) && !/^\/login/.test(path)) {
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
                        name: "home"
                    });
                }
            }
        }
    }
};

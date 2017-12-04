export
let forwardMixin = {
    methods: {
        forward() {
            let path = this.$route.query.path;
            if (path && path != '/' && path != '/index' && path != '/login') {
                this.$router.replace({
                    path: this.$route.query.path
                });
            } else {
                this.$router.replace({
                    name: "home"
                });
            }
        }
    }
}
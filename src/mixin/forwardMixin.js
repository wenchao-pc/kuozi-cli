export
let forwardMixin = {
    methods: {
        forward() {
            if (this.$route.query.path && this.$route.query.path != '/') {
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
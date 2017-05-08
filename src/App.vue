<template>
    <div class="full-height">
        <h1>{{msg}}</h1>
        <router-view></router-view>
    </div>
</template>
<style lang="less">
</style>
<script>
export default {
    data() {
            return {
                msg: "hello"
            }
        },
        created() {
            this.$store.commit("spinner", false);
            // 本地开发 不用index跳转
            if (process.env.NODE_ENV === "production") {
                this.$router.replace({
                    name: "index",
                    query: {
                        path: window.location.hash.replace("#", "")
                    }
                });
            }
        },
        computed: {
            spinner() {
                return this.$store.state.spinner
            },
            loading() {
                return this.$store.state.loading
            }
        }
}
</script>

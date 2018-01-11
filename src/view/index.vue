<template>
    <ui-layout class="index">

    </ui-layout>
</template>
<script>
import { forward } from "./../mixin/forward.js";
export default {
    mixins: [forward],
    data() {
        return {
            fail: {
                auth: false,
                login: false
            }
        };
    },
    created() {
        this.auth();
    },
    methods: {
        // TODO 检查登录
        // token有效 forward(true)
        // token有效 forward(false)
        auth() {
            this.forward(true);
        }
    }
};
</script>
<style lang="less" scoped>
@import "./../style/variables.less";
.index {
    background: @gray url(./../assets/img/logo.png) no-repeat center 150px;
    .index-fail {
        width: 100%;
        height: 100%;
        text-align: center;
        line-height: 500px;
        a {
            color: @info;
            text-decoration: underline;
        }
    }
}
</style>

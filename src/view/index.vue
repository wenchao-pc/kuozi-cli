<template>
    <ui-layout class="index">

    </ui-layout>
</template>
<script>
import forward from "./../mixin/forward.js";
import { login } from "../router/loginIntercept";
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
        // 开始登录校验
        window.intercept = true;
        if (login) {
            this.auth();
        } else {
            this.forward(true);
        }
    },
    methods: {
        // TODO 检查登录
        // token有效 forward(true)
        // token有效 forward(false)
        auth() {
            this.forward(false);
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

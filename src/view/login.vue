<template>
    <ui-layout class="login-container">
        <div class="login">
            <el-button type="primary" @click="login">登录</el-button>
        </div>
    </ui-layout>
</template>

<script>
import { forward } from "./../mixin/forward.js";
export default {
    mixins: [forward],
    data() {
        return {};
    },
    created() {},
    methods: {
        login() {
            this.forward({}, "$token");
        }
    }
};
</script>

<style lang="less">

</style>

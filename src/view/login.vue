<template>
    <ui-layout>
        <ui-head title="登录" no-back></ui-head>
        <ui-container>
            <button @click="login">登录</button>
        </ui-container>
    </ui-layout>
</template>

<script>
import forward from "../mixin/forward";
export default {
    mixins: [forward],
    methods: {
        login() {
            this.forward({}, "token");
        }
    }
};
</script>

<style>

</style>

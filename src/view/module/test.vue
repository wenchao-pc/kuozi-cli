<template>
    <ui-layout>
        <ui-head title="测试"></ui-head>
        <ui-container>
            {{msg}}
        </ui-container>
    </ui-layout>
</template>

<script>
export default {
    data() {
        return {
            msg: "测试"
        };
    },
    created() {},
    methods: {}
};
</script>

<style lang="less" scoped>

</style>

<template>
    <ui-layout>
        <ui-head title="首页" no-back></ui-head>
        <ui-container>
            {{msg}}
        </ui-container>
    </ui-layout>
</template>

<script>
export default {
    data() {
        return {
            msg:"hello"
        };
    },
    created() {
        
    },
    methods: {
        
    }
};
</script>

<style lang="less" scoped>

</style>

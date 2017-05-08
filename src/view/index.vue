<template>
    <div class="full-height">
        
    </div>
</template>
<script>
import {
    forwardMixin
} from "./../mixin/forwardMixin.js";
export default {
    mixins: [forwardMixin],
    data() {
        return {
            auth: 0
        }
    },
    created() {
        let self = this;
        //登录状态检测
        this.$get("auth").then(res => {
            window.login = true;
            this.forward();
        }).catch(() => {
            this.forward();
        });
    }
}
</script>
<style lang="less" scoped>
@import "./../styles/common.less";
.full-height {
    background: white;
}

.auth {
    margin-top: 80%;
    text-align: center;
    color: @info;
    &.auth-fail {
        color: black;
    }
}
</style>

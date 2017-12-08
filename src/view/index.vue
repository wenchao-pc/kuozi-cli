<template>
    <div class="full-height">
        <div v-if="auth == 1" class="auth">认证中...</div>
        <div v-if="auth == 2" class="auth auth-fail">认证失败，
            <span class="text-info" @click="reAuth">点击</span>重试</div>
    </div>
</template>
<script>
import { forward } from "./../mixin/forward.js";
export default {
    mixins: [forward],
    data() {
        return {
            auth: 0
        };
    },
    created() {
        this.auth = 1;
        // 登录状态检测
        // this.$get("auth")
        //     .then(res => {
        //         if (res) {
        //             this.forward(res);
        //         } else {
        //             this.forward(false);
        //         }
        //     })
        //     .catch(() => {
        //         this.auth = 2;
        //     });
        this.forward(false);
    }
};
</script>
<style lang="less" scoped>
@import "../style/variables.less";
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

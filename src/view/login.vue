<template>
    <div class="full-height bg-color22">
        <ui-head title="登录"></ui-head>
        <div class="container">
            <div class="logo"></div>
            <div class="hr"></div>
            <div class="btn-tabs" style="padding:0 10px;">
                <div class="tab" :class="{'active':show == 2}">
                    <button @click="show = 2">身份证</button>
                </div>
                <div class="tab" :class="{'active':show == 1}">
                    <button @click="show = 1">基金账号</button>
                </div>
            </div>
            <div class="hr"></div>
            <div class="hr-20"></div>
            <div>
                <mt-field label="账号" placeholder="请输入账号" v-model="lognumber"></mt-field>
                <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
            </div>
            <div style="padding:50px 10px">
                <button class="btn btn-info" @click="login">登录</button>
            </div>
        </div>
    </div>
</template>
<script>
import {
    forwardMixin
} from "./../mixin/forwardMixin";
export default {
    mixins: [forwardMixin],
    data() {
        return {
            lognumber: "",
            password: "",
            show: 2
        }
    },
    methods: {
        login() {
            if (!this.lognumber) {
                return this.$toast("请输入账号");
            }
            if (this.show == 2) {
                if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.lognumber)) {
                    return this.$toast("请输入正确的身份证号");
                }
            }
            if (this.show == 1) {
                if (!/^[A-Za-z0-9]+$/.test(this.lognumber)) {
                    return this.$toast("请输入正确的基金账号");
                }
            }
            if (!this.password) {
                return this.$toast("请输入密码");
            }
            this.$post("loginHundsun", {
                lognumber: this.lognumber,
                password: this.password,
                logtype: this.show
            }).then(res => {
                window.login = true;
                this.forward();
            });
            // window.login = true;
            // this.forward();
        }
    }
}
</script>
<style lang="less">
@import "./../styles/common.less";
</style>

<template>
    <ui-layout class="login-container">
        <div class="login">
            <div class="login-form">
                <el-form :model="form" status-icon :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="用户名" prop="username">
                        <el-input type="text" v-model="form.username" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="pwd">
                        <el-input type="password" v-model="form.pwd" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('form')">提交</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </ui-layout>
</template>

<script>
import { forward } from "./../mixin/forward.js";
export default {
    mixins: [forward],
    data() {
        return {
            form: {
                username: "",
                pwd: ""
            },
            rules: {
                username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
                pwd: [{ required: true, message: "请输入密码", trigger: "blur" }]
            }
        };
    },
    created() {},
    methods: {
        login() {
            this.forward({}, "$token");
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.forward({}, "$token");
                } else {
                    return false;
                }
            });
        }
    }
};
</script>

<style lang="less">
.login {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    background: #fff;
    .login-form {
        width: 500px;
        padding-top: 300px;
    }
}
</style>
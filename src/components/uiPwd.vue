<template>
    <div>
        <div class="pwd-input">
            <div class="pwds">
                <div v-text="len > 0 ? '●' : ''"></div>
                <div v-text="len > 1 ? '●' : ''"></div>
                <div v-text="len > 2 ? '●' : ''"></div>
                <div v-text="len > 3 ? '●' : ''"></div>
                <div v-text="len > 4 ? '●' : ''"></div>
                <div v-text="len > 5 ? '●' : ''"></div>
            </div>
            <input type="number" v-model="pwd" @input="input()" />
        </div>
    </div>
</template>
<script>
export default {
    props: {
        value: [String, Number]
    },
    data() {
        return {
            pwd: this.value
        }
    },
    methods: {
        input() {
            if (this.pwd.toString().length > 6) {
                this.pwd = this.pwd.toString().substring(0, 6) / 1;
            }
            this.$emit("input", this.pwd);
            if (this.pwd.toString().length == 6) {
                this.$emit("finish");
            }
        },
    },
    computed: {
        len() {
            if (this.value.toString().length == 0) {
                this.pwd = "";
            }
            return this.value.toString().length;
        }
    }
}
</script>
<style lang="less">
@import "./../assets/css/common.less";
.pwd-input {
    position: relative;
    .pwds {
        display: flex;
        width: 210px;
        height: 35px;
        margin: 0 auto;
        border: 1px @color47;
        border-style: solid solid solid none;
        >div {
            flex: 1;
            text-align: center;
            line-height: 35px;
            border-left: 1px solid @color47;
        }
    }
    input {
        position: absolute;
        width: 100%;
        width: 210px;
        height: 35px;
        left: 50%;
        top: 0;
        margin-left: -105px;
        opacity: 0;
    }
}
</style>

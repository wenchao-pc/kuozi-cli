<template>
    <div class="input-number">
        <button class="btn1" @click="sub"></button>
        <input type="number" v-model="value" @blur="check">
        <button class="btn2" @click="add"></button>
    </div>
</template>
<script>
export default {
    props: {
        step: {
            type: Number,
            default: 1
        }
    },
    data() {
        return {
            value: 0,
        }
    },
    methods: {
        sub() {
            if (this.value >= this.step) {
                this.value = this.value - this.step;
            } else {
                this.value = 0;
            }
            this.$emit("input", this.value);
        },
        add() {
            this.value = this.value + this.step;
            this.$emit("input", this.value);
        },
        check() {
            if (this.value % this.step != 0 || this.value < 0) {
                this.value = 0;
                this.$emit("input", this.value);
            }
        }
    }
}
</script>
<style lang="less">
@import "./../assets/css/common.less";
.input-number {
    display: flex;
    width: 100px;
    height: 25px;
    button {
        width: 25px;
        border: 1px @hr;
    }
    input {
        flex: 1;
        width: 100%;
        text-align: center;
        border: 1px @hr;
        border-style: solid none;
    }
    .btn1 {
        background: url(./../assets/img/-.png);
        background-size: 25px 25px;
        &:active {
            background-image: url(./../assets/img/- 点击.png);
        }
    }
    .btn2 {
        background: url(./../assets/img/+.png);
        background-size: 25px 25px;
        &:active {
            background-image: url(./../assets/img/+点击x.png);
        }
    }
}
</style>

<template>
    <div class="switch" :class="{'c':type == 'c'}">
        <template v-if="type == 's'">
            <div class="square">
                <button :class="{'active':!value}" v-text="tl" @click="changeValue(value)"></button>
                <button :class="{'active':value}" v-text="tr" @click="changeValue(value)"></button>
            </div>
        </template>
        <template v-if="type == 'c'">
            <div class="circle" :class="{'active':value}" @click="changeValue(value)">
            </div>
        </template>
    </div>
</template>
<script>
export default {
    props: {
        type: String,
        value: {
            type: [Boolean, Number]
        },
        tl: String,
        tr: String
    },
    methods: {
        changeValue(e) {
            this.$emit("input", !e);
            this.$emit("changeValue");
        }
    }
}
</script>
<style lang="less">
@import "./../common/less/common.less";
.switch {
    position: relative;
    width: 2.533333rem;
    height: 0.8rem;
    display: inline-block;
    border: 1px solid @hr;
    border-radius: 0.106667rem;
    background: @fff;
    .square {
        overflow: hidden;
        height: 100%;
        button {
            float: left;
            width: 50%;
            height: 100%;
            border: none;
            outline: none;
            .font-size(30px);
            color: @text-color2;
            &.active {
                background: @info;
                color: @fff;
            }
        }
    }
    .circle {
        width: 1.4rem;
        height: 0.8rem;
        border: 0.013333rem solid #d9d9d9;
        border-radius: 0.8rem;
        background: @fff;
        &.active {
            background: @info;
            &:before {
                margin-left: 0.59rem;
                border: none;
                transition: margin-left .5s;
            }
        }
        &:before {
            content: "";
            display: block;
            width: 0.78rem;
            height: 0.78rem;
            border: 0.013333rem solid #d9d9d9;
            border-radius: 0.8rem;
            background: @fff;
            margin-left: 0;
            transition: margin-left .5s;
        }
    }
    &.c {
        width: 1.4rem;
        border-radius: 0.8rem;
    }
}
</style>

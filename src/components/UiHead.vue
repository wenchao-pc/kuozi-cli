<template>
    <div class="ui-head">
        <div class="head-btns">
            <template v-if="!noBack">
                <a v-if="close" class="head-back" href="close"></a>
                <div v-else class="head-back" @click="back"></div>
            </template>
            <div class="head-btns-container"></div>
            <slot name="right"></slot>
        </div>
        <div class="head-title" :class="{'head-title-text':title}">
            <span v-if="title" v-text="title"></span>
            <slot name="title"></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {},
        noBack: {
            type: Boolean,
            default: false
        },
        close: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        back() {
            this.$back();
        }
    }
};
</script>

<style lang="less">
@import "../style/variables.less";
@head-height: 50px;
@padding-top: 0px;
.ui-head {
    position: relative;
    height: @head-height;
    background: @bg-head;
    .head-title {
        height: @head-height;
        padding-top: @padding-top;
        &.head-title-text {
            width: 100%;
            line-height: @head-height;
            text-align: center;
            font-size: 18px;
            color: white;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
    .head-btns {
        display: flex;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: @head-height;
        padding-top: @padding-top;
        line-height: @head-height;
        .head-back {
            width: 35px;
            background: url(../assets/img/返回-默认.png) no-repeat center;
            background-size: 9px 17px;
            &:active {
                background-image: url(../assets/img/返回-点击.png);
            }
        }
        .head-btns-container {
            flex: 1;
        }
    }
}
</style>

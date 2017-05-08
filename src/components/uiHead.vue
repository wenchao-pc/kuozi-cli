<template>
    <div>
        <div id="head" class="head" :class="{'transparent':transparent}">
            <a v-if="close" class="back" href="close"></a>
            <div v-else class="back" @click="$back"></div>
            <a href="pobo:pageId=800013" class="search"></a>
            <div class="title" v-text="title"></div>
            <a href="pobo:uncheck=0&pageId=900004&title=客服中心&url=community/index.html" class="kefu"></a>
            <a href="pobo:pageId=900005&url=message/index.html" class="msg">
                <div v-if="pbMessageNum > 0" class="message-num" v-text="pbMessageNum<99?pbMessageNum:'...'"></div>
            </a>
        </div>
        <div v-if="!transparent" style="height:64px;"></div>
    </div>
</template>
<script>
export default {
    props: {
        transparent: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: "基金"
        },
        close: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        pbMessageNum() {
            return this.$store.state.pbMessageNum;
        }
    }
}
</script>
<style lang="less">
@import "./../assets/css/common.less";
.head {
    position: fixed;
    z-index: 99;
    display: flex;
    width: 100%;
    height: 64px;
    line-height: 44px;
    padding-top: 20px;
    background: @info;
    &.transparent {
        background: transparent;
    }
    .text-color15;
    .back {
        width: 30px;
        background: url(./../assets/img/导航栏-返回.png) no-repeat center;
        background-size: 9px 17px;
    }
    .search {
        width: 30px;
        margin-right: 8px;
        background: url(./../assets/img/导航栏-搜搜.png) no-repeat center;
        background-size: 17px 17px;
    }
    .title {
        flex: 1;
        text-align: center;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        word-break: break-all;
        .font-24;
        .text-color15;
    }
    .kefu {
        width: 30px;
        background: url(./../assets/img/导航栏-客服.png) no-repeat center;
        background-size: 17px 18px;
    }
    .msg {
        position: relative;
        width: 38px;
        background: url(./../assets/img/导航栏-短信.png) no-repeat center;
        background-size: 17px 14px;
        .message-num {
            position: absolute;
            top: 3px;
            right: -2px;
            width: 24px;
            height: 24px;
            line-height: 24px;
            text-align: center;
            background: #fff;
            border-radius: 100px;
            font-size: 14px;
            transform: scale(0.5, 0.5);
            color: #333;
        }
    }
}
</style>

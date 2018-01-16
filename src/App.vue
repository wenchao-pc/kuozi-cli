<template>
    <div class="app" :class="{'bg-head':hasHead}">
        <transition :name="transition" @afterLeave="afterLeave">
            <!-- <keep-alive> -->
            <router-view></router-view>
            <!-- </keep-alive> -->
        </transition>
        <mt-spinner v-if="spinner" type="double-bounce" class="spinner" :color="color" :size="30"></mt-spinner>
        <mt-spinner v-if="!spinner && loading" type="triple-bounce" class="spinner" :color="color" :size="30"></mt-spinner>
    </div>
</template>
<script>
export default {
    data() {
        return {
            color: "#3366cc",
            flexRow: false,
            // 默认所有页面有head
            hasHead: true
        };
    },
    created() {
        this.$store.commit("spinner", false);
        let to = { name: "index", query: {} };
        let path = window.location.hash.replace("#", "");
        if (path.match("/login")) {
            to.query.path = decodeURIComponent(path.replace("/login?path=", ""));
        } else if (path.match("/index")) {
            to.query.path = decodeURIComponent(path.replace("/index?path=", ""));
        } else {
            to.query.path = decodeURIComponent(path);
        }
        this.$store.commit("transition", "");
        window.intercept = true;
        this.$router.replace(to);
    },
    methods: {
        afterLeave() {
            this.$store.commit("transition", "pop-in");
        }
    },
    computed: {
        transition() {
            return this.$store.state.transition;
        },
        spinner() {
            return this.$store.state.spinner;
        },
        loading() {
            return this.$store.state.loading;
        }
    }
};
</script>
<style lang="less">
@import "./style/variables.less";
// 页面过渡时间
@time: 500ms;
// 普通状态栏高度
// @ztl1: 20px;
@ztl1: 0px;
// iphonex状态栏高度
@ztl2: 40px;
.app {
    height: 100%;
    overflow: hidden;
    width: 100%;
    padding-top: @ztl1;
    &.bg-head {
        position: relative;
        &::before {
            content: "";
            position: absolute;
            top: 0;
            width: 100%;
            height: @head-height + @ztl1;
            background: @info;
        }
    }
    > div {
        width: 100%;
    }
}
.pop-out-enter-active,
.pop-out-leave-active,
.pop-in-enter-active,
.pop-in-leave-active {
    position: absolute;
    top: @ztl1;
    width: 100%;
    height: 100%;
    will-change: transform;
    backface-visibility: hidden;
    perspective: 1000;
    transition: @time;
    transition-property: transform, opacity;
    padding-bottom: @ztl1;
}
.pop-out-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
}
.pop-out-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
}
.pop-in-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
}
.pop-in-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
}

.spinner {
    position: fixed;
    top: 40%;
    left: 50%;
    margin-left: -20px;
    &:before {
        content: "";
        position: fixed;
        left: 0;
        top: 0;
        z-index: 999;
        width: 100%;
        height: 100%;
        background: #000;
        opacity: 0;
    }
}
@media screen and (width: 375px) and (height: 812px) {
    .app {
        padding-top: @ztl2;
        &.bg-head {
            &::before {
                height: @head-height + @ztl2;
            }
        }
    }
    .pop-out-enter-active,
    .pop-out-leave-active,
    .pop-in-enter-active,
    .pop-in-leave-active {
        top: @ztl2;
        padding-bottom: @ztl2;
    }
}
</style>
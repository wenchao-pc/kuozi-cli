<template>
    <div class="ui-side" :class="{collapse:collapse}">
        <el-menu default-active="0" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="collapse">
            <el-menu-item index="0" @click.native="$to({name:'home'})">
                <i class="fa fa-home fa-fw fa-lg"></i>
                <span slot="title">首页</span>
            </el-menu-item>
        </el-menu>
        <div class="dock" @click="collapse = !collapse">
            <i v-if="collapse" class="el-icon-arrow-right"></i>
            <i v-else class="el-icon-arrow-left"></i>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            collapse: false
        };
    },
    methods: {
        handleOpen(key, keyPath) {},
        handleClose(key, keyPath) {}
    }
};
</script>

<style lang="less">
.ui-side {
    position: relative;
    width: 250px;
    height: 100%;
    &.collapse {
        width: 64px;
    }
    > ul {
        height: 100%;
    }
    .dock {
        position: absolute;
        width: 15px;
        height: 50px;
        top: 50%;
        margin-top: -5px;
        right: -15px;
        background: white;
        border: 1px #ccc;
        border-style: solid solid solid none;
        border-radius: 0 5px 5px 0;
        line-height: 50px;
    }
}
</style>

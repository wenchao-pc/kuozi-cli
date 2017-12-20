<template>
    <div class="ui-layout">
        <div v-if="brs.length > 0" class="breadcrumbs">
        <!-- <div v-if="false" class="breadcrumbs"> -->
            <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="br in brs" :key="br.name" @click.native="$to(br.to)">{{br.name}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div v-else style="height:20px;"></div>
        <div class="ui-layout-container">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        brs: {
            type: Array,
            default: () => []
        }
    }
};
</script>

<style lang="less">
.ui-layout {
    display: flex;
    flex-direction: column;
    height: 100%;
    .breadcrumbs {
        padding: 20px;
        .el-breadcrumb {
            font-size: 16px;
        }
    }
    .ui-layout-container {
        flex: 1;
        overflow: auto;
    }
}
</style>

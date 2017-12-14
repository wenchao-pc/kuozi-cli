<template>
    <div class="ui-page">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :layout="layout" :page-size="pageSize" :total="total" background></el-pagination>
    </div>
</template>

<script>
export default {
    props: {
        layout: {
            type: String,
            default: "total, prev, pager, next, jumper"
        },
        pageSize: {
            type: Number,
            default: 20
        },
        total: {
            type: Number,
            default: 0
        }
    },
    methods: {
        handleSizeChange(val) {
            this.$emit("size-change", val);
        },
        handleCurrentChange(val) {
            this.$emit("current-change", val);
        }
    }
};
</script>

<style>
.ui-page {
    text-align: center;
    padding: 20px 150px 20px 0;
}
</style>

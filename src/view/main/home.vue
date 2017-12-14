<template>
    <ui-layout :brs="brs">
        <ui-container>
            <el-row>
                <el-col>
                    <el-form :inline="true" :model="formInline" class="demo-form-inline">
                        <el-row>
                            <el-form-item label="关键字">
                                <el-input v-model="formInline.user" placeholder="合同号、自然人证件、机构证件"></el-input>
                            </el-form-item>
                            <el-form-item label="项目名">
                                <el-input v-model="formInline.user" placeholder="项目名"></el-input>
                            </el-form-item>
                            <el-form-item label="投资人">
                                <el-input v-model="formInline.user" placeholder="投资人姓名"></el-input>
                            </el-form-item>
                            <el-form-item label="姓名（机构）">
                                <el-input v-model="formInline.user" placeholder="姓名（机构）"></el-input>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item label="成立日期">
                                <el-date-picker v-model="formInline.date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary">查询</el-button>
                                <el-button type="primary">添加</el-button>
                            </el-form-item>
                        </el-row>
                    </el-form>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <el-table :data="tableData" border style="width: 100%">
                        <el-table-column prop="date" label="日期">
                        </el-table-column>
                        <el-table-column prop="name" label="姓名">
                        </el-table-column>
                        <el-table-column prop="address" label="地址">
                        </el-table-column>
                        <el-table-column label="地址">
                            <template slot-scope="scope">
                                <el-button type="text" size="small">查看</el-button>
                                <el-button type="text" size="small">编辑</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
            <el-row>
                <ui-page :total="1000"></ui-page>
            </el-row>
        </ui-container>
    </ui-layout>
</template>

<script>
import UiPage from "../../components/UiPage.vue";
export default {
    components: { UiPage },
    data() {
        return {
            brs: [{ name: "首页", to: { name: "home" } }],
            formInline: {
                user: "",
                date: ""
            },
            tableData: [
                {
                    date: "2016-05-03",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
                {
                    date: "2016-05-02",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
                {
                    date: "2016-05-04",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
                {
                    date: "2016-05-01",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
                {
                    date: "2016-05-08",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
                {
                    date: "2016-05-06",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
                {
                    date: "2016-05-07",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                }
            ]
        };
    }
};
</script>

<style>

</style>
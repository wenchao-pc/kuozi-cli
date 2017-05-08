<template>
    <div class="nav">
        <div>
            <router-link to="home" exact>首页</router-link>
        </div>
        <div>
            <router-link :to="{name:'autoInvestmentOrder'}" exact>定投排行</router-link>
        </div>
        <div>
            <router-link :to="{name:'trade'}" exact>交易</router-link>
        </div>
    </div>
</template>
<style lang="less">
@import "./../assets/css/common.less";
@nav-height: 50px;
@nav-bg: #f9f9f9;
@nav-shabow: #adaddf;
.nav {
    display: flex;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: @nav-height;
    background: @nav-bg;
    box-shadow: 0 -1px 1px @nav-shabow;
    div {
        flex: 1;
        a {
            display: inline-block;
            width: 100%;
            height: 100%;
            text-align: center;
            line-height: @nav-height;
            text-decoration: none;
            color: black;
            &.router-link-active {
                color: @info;
            }
        }
    }
}
</style>

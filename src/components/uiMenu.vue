t<template>
    <div class="menus" :class="type">
        <router-link v-for="menu in menus" class="menu-item" :to="menu.to" :style="style">
            <img :src="menu.src" />
            <span v-if="type == 'type2'" v-text="menu.text"></span>
        </router-link>
    </div>
</template>
<script>
export default {
    props: {
        menus: {
            type: Array,
            default: []
        },
        type: {
            type: String,
            default: "type1"
        }
    },
    computed: {
        style() {
            let len = this.menus.length;
            if (len < 4) {
                return {
                    width: 100 / len + "%"
                }
            }
            return {};
        }
    }
}
</script>
<style lang="less">
@import "./../assets/css/common.less";
.menus {
    background: #fff;
    &.type1 {
        width: 100%;
        padding: 5px 0 10px 0;
        overflow-x: auto;
        overflow-y: hidden;
        white-space: nowrap;
        .menu-item {
            display: inline-block;
            width: 25%;
            padding: 0 5px;
            img {
                display: block;
                width: 100%;
                min-height: 30px;
                background: red;
            }
            &:first-child {
                padding: 0 0 0 10px;
            }
            &:last-child {
                padding: 0 10px 0 0;
            }
        }
    }
    &.type2 {
        width: 100%;
        height: 120px;
        overflow-x: auto;
        overflow-y: hidden;
        white-space: nowrap;
        .menu-item {
            display: inline-block;
            width: 25%;
            text-align: center;
            text-decoration: none;
            .font-23;
            .text-color18;
            img {
                display: block;
                width: 38px;
                height: 38px;
                margin: 26px auto 19px auto;
            }
        }
    }
}
</style>

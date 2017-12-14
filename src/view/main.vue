<template>
    <div class="main">
        <div class="main-header">
            <ui-header></ui-header>
        </div>
        <div class="main-body">
            <div class="main-side">
                <ui-side></ui-side>
            </div>
            <div class="main-container">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import UiHeader from "./../components/UiHeader";
import UiSide from "./../components/UiSide";
export default {
    components: { UiHeader, UiSide },
    data() {
        return {};
    },
    methods: {},
    computed: {}
};
</script>

<style lang="less">
@import "../style/variables.less";
.main {
    display: flex;
    flex-direction: column;
    height: 100%;
    .main-body {
        display: flex;
        flex: 1;
        .main-side {
        }
        .main-container {
            flex: 1;
        }
    }
}
</style>

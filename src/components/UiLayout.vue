<template>
    <div class="ui-layout">
        <div class="ui-layout-container">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.ui-layout {
    height: 100%;
    background: white;
    .ui-layout-container {
        display: flex;
        flex-direction: column;
        height: 100%;
    }
}
</style>

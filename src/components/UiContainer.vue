<template>
    <div class="container">
        <slot></slot>
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

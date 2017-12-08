<template>
    <div class="container">
        <slot></slot>
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
.container {
    flex: 1;
    overflow: auto;
    background-color: white;
    webkit-overflow-scrolling: touch;
}
</style>

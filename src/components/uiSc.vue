<template>
    <div class="sc" :class="{'active':active}" @click="clickSc"></div>
</template>
<script>
export default {
    props: {
        id: {
            type: [String, Number]
        }
    },
    methods: {
        clickSc() {
            this.$store.commit(this.active ? "subMyFunds" : "addMyFunds", [this.id]);
        }
    },
    computed: {
        active() {
            return this.$store.state.myfund[this.id];
        }
    }
}
</script>

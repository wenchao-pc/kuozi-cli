<template>
    <div class="ui-carousel">
        <div class="ui-carousel-content" :style="contentStyle">
            <template v-for="(carousel,index) in carousels">
                <router-link tag="img" :to="carousel.url" :src="PrefixImg+carousel.name" :style="imgStyle" v-swipe-left="{method:active,params:index+1}" v-swipe-right="{method:active,params:index-1}"></router-link>
            </template>
        </div>
        <ul v-if="hasCircle" class="ui-carousel-circle" :style="circleStyle">
            <template v-for="(carousel,index) in carousels">
                <li :class="{active:index == activeIndex}"></li>
            </template>
        </ul>
    </div>
</template>
<style lang="less" scoped>
@import "./../assets/css/common";
.ui-carousel {
    position: relative;
    width: 100%;
    overflow: hidden;
    .ui-carousel-content {
        position: relative;
        top: 0;
        left: 0;
        overflow: hidden;
        transition: left .5s linear;
        img {
            float: left;
            min-height: 100px;
        }
    }
    .ui-carousel-circle {
        position: absolute;
        bottom: 0;
        text-align: center;
        li {
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 8px;
            background: white;
            opacity: .5;
            margin: 5px;
            &.active {
                background: @info;
            }
        }
    }
}
</style>
<script>
export default {
    props: {
        carousels: {
            type: Array,
            default: []
        },
        time: {
            type: Number,
            default: 3000
        },
        hasCircle: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            basicWidth: "",
            contentStyle: {
                width: "",
                left: 0
            },
            imgStyle: {
                width: ""
            },
            circleStyle: {
                width: ""
            },
            activeIndex: 0
        }
    },
    mounted() {
        this.basicWidth = this.$parent.$el.clientWidth;
        this.imgStyle.width = this.basicWidth + "px";
        this.circleStyle.width = this.basicWidth + "px";
        this.contentStyle.width = this.carousels.length * this.basicWidth + "px";
        if (this.carousels.length > 1) {
            this.loop(0);
        }
    },
    methods: {
        //显示index为i的图 从0开始
        active(i) {
            this.activeIndex = i % this.carousels.length;
            if (this.activeIndex < 0) {
                this.activeIndex = this.carousels.length - 1;
            }
            this.contentStyle.left = (-1 * this.activeIndex * this.basicWidth) + "px";
            this.loop(this.activeIndex);
        },
        //循环轮播
        loop(i) {
            this.interval ? clearInterval(this.interval) : null;
            const self = this;
            this.interval = setInterval(function() {
                i++;
                self.active(i);
            }, self.time ? self.time : 3000);
        }
    },
    watch: {
        //异步加载时监听carousels开始循环
        carousels(value) {
            this.carousels = value;
            this.contentStyle.width = this.carousels.length * this.basicWidth + "px";
            if (this.carousels.length > 1) {
                this.loop(0);
            }
        }
    }
}
</script>

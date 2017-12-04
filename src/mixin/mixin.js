/**
 * Created by kuo zi on 2016/10/18.
 */
import Vue from "vue";
import axios from "axios";
import store from "store";

import project from "./../../config/project";

import urls from "./../utils/urls";
import { fetch, $get, $post } from "../utils/fetch";

import UiLayout from "../components/UiLayout.vue";
import UiHead from "../components/UiHead.vue";
import UiContainer from "../components/UiContainer.vue";

//全局混合
Vue.mixin({
    components: { UiLayout, UiHead, UiContainer },
    data() {
        return {
            PageSize: 15,
            Store: store
        };
    },
    methods: {
        /**
         *get请求
         * @param restKey [项目索引,url键]
         * @param join url拼接
         */
        $get(restKey, join, options, noLoading, noToast) {
            return $get(restKey, join, options, noLoading, noToast, this);
        },
        $getDirect(url, options, noLoading, noToast) {
            return fetch("get", "", url, null, options, noLoading, noToast, this);
        },
        /**
         *post请求
         * @param restKey [项目索引,url键]
         * @param params 请求参数
         */
        $post(restKey, params, join, options, noLoading, noToast) {
            return $post(restKey, params, join, options, noLoading, noToast, this);
        },
        $postDirect(url, params, options, noLoading, noToast) {
            return fetch("post", "", url, params, options, noLoading, noToast, this);
        },
        /**
         * [$back description]返回事件
         * @return {[type]} [description]
         */
        $back() {
            this.$store.commit("transition", "pop-out");
            window.history.back("-1");
        },
        $to(p) {
            this.$router.push(p);
        },
        $loading() {
            this.$store.commit("loading");
        },
        $loaded() {
            this.$store.commit("loaded");
        },
        /**
         * [$encodeURI description] encode url 默认encode当前url
         * @param  {[type]} url [description]
         * @return {[type]}     [description]
         */
        $encodeURI(url) {
            return window.encodeURIComponent(url ? url : window.location);
        },
        /**
         * [$decodeURI description] decode url
         * @param  {[type]} url [description]
         * @return {[type]}     [description]
         */
        $decodeURI(url) {
            return window.decodeURIComponent(url);
        },
        $getParam(key, url) {
            var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
            var r = (url ? url : window.location).search.substr(1).match(reg);
            if (r != null) return decodeURI(r[2]);
            return null;
        }
    },
    beforeDestroy() {
        this.$loaded ? this.$loaded() : null;
        this.$loaded ? this.$loaded() : null;
        this.$indicator ? this.$indicator.close() : null;
    }
});

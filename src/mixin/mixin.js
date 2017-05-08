/**
 * Created by kuo zi on 2016/10/18.
 */
import Vue from "vue";
import urls from "./../utils/urls.js";
import project from "./../../config/project.js";
import _fetch from "./../utils/fetch.js";

//全局混合
Vue.mixin({
    components: {

    },
    data() {
        return {
            // 图片服务器前缀
            PrefixImg: project.PrefixImg + "/",
            pageSize: 15
        }
    },
    methods: {
        /**
         *get请求
         * @param restKey [项目索引,url键]
         * @param join url拼接
         */
        $get(restKey, join, options) {
            //快捷写法 默认第一个项目
            if (typeof restKey === "string") {
                restKey = ["default", restKey];
            }
            return _fetch("get", project.projectConfig[restKey[0]].baseURL + "/" + project.projectConfig[restKey[0]].rootPath, join ? urls[restKey[1]].url + "/" + join : urls[restKey[1]].url, null, this, options);
        },
        /**
         *post请求
         * @param restKey [项目索引,url键]
         * @param params 请求参数
         */
        $post(restKey, params, join, options) {
            if (typeof restKey === "string") {
                restKey = ["default", restKey];
            }
            return _fetch("post", project.projectConfig[restKey[0]].baseURL + "/" + project.projectConfig[restKey[0]].rootPath, join ? urls[restKey[1]].url + "/" + join : urls[restKey[1]].url, params, this, options);
        },
        /**
         * [$back description]返回事件
         * @return {[type]} [description]
         */
        $back() {
            window.history.back("-1");
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

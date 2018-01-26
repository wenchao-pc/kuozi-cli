import project from "../../config/project/project.env";
import urls from "./../utils/urls";

import axios from "axios";

axios.defaults.headers["x-requested-with"] = "XMLHttpRequest";

let fetch = function(method, baseURL, url, data, options, noLoading, noToast, vue) {
    return new Promise((resolve, reject) => {
        let token = localStorage.getItem("$token");
        let o = options || {
            headers: {}
        };
        o.method = method;
        o.baseURL = baseURL;
        o.url = url;
        o.data = data;
        o.headers["x-token"] = token;
        if (!noLoading) {
            // vue && vue.$$loading();
        }
        axios(o)
            .then(data => {
                let res = data.data;
                if (!noLoading) {
                    // vue && vue.$loaded();
                }
                if (res.code == 0) {
                    if (res.data === null || res.data === undefined) {
                        resolve({});
                    } else {
                        resolve(res.data);
                    }
                } else {
                    if (res.code == 999 && vue.$route.name != "index") {
                        vue && vue.$to({ name: "login", query: { path: vue.$route.fullPath } });
                    } else {
                        if (!noToast) {
                            vue &&
                                vue.$message({
                                    showClose: true,
                                    message: res.message,
                                    type: "error"
                                });
                        }
                    }
                    reject();
                }
            })
            .catch(error => {
                if (!noToast) {
                    if (error.response && error.response.status) {
                        switch (error.response.status) {
                            case 404:
                                vue &&
                                    vue.$message.error({
                                        showClose: true,
                                        message: "错误代码404",
                                        type: error
                                    });
                                break;
                            case 502:
                                vue &&
                                    vue.$message.error({
                                        showClose: true,
                                        message: "服务器正在升级,请稍后再试",
                                        type: error
                                    });
                                break;
                            case 504:
                                vue &&
                                    vue.$message.error({
                                        showClose: true,
                                        message: "网络已断开",
                                        type: error
                                    });
                                break;
                            default:
                                vue &&
                                    vue.$message.error({
                                        showClose: true,
                                        message: `请求服务异常,请稍后再试（${error.response.status}）`,
                                        type: error
                                    });
                                break;
                        }
                    }
                }
                if (!noLoading) {
                    // vue && vue.$loaded();
                }
                reject();
            });
    });
};

let $get = function(restKey, join, options, noLoading, noToast, vue) {
    if (typeof restKey === "string") {
        restKey = ["default", restKey];
    }
    return fetch("get", project.projectConfig[restKey[0]].baseURL + "/" + project.projectConfig[restKey[0]].rootPath, join ? urls[restKey[1]].url + "/" + join : urls[restKey[1]].url, null, options, noLoading, noToast, vue);
};

let $post = function(restKey, params, join, options, noLoading, noToast, vue) {
    if (typeof restKey === "string") {
        restKey = ["default", restKey];
    }
    return fetch("post", project.projectConfig[restKey[0]].baseURL + "/" + project.projectConfig[restKey[0]].rootPath, join ? urls[restKey[1]].url + "/" + join : urls[restKey[1]].url, params, options, noLoading, noToast, vue);
};
export { fetch, $get, $post };

import axios from "axios";
axios.defaults.headers['x-requested-with'] = "XMLHttpRequest";
export default function(method, baseURL, url, data, vue, options) {
    return new Promise((resolve, reject) => {
        let o = options || {};
        o.method = method;
        o.baseURL = baseURL;
        o.url = url;
        o.data = data;
        if (!o.noLoading) {
            vue.$loading();
        }
        axios(o).then(res => {
            if (!o.noLoading) {
                vue.$loaded();
            }
            if (res.data.code == 0) {
                resolve(res.data.data || {});
            } else {
                if (!o.noToast) {
                    // todo 异常提示
                }
                reject();
            }
        }).catch((error) => {
            if (!o.noLoading) {
                vue.$loaded();
            }
            if (!o.noToast) {
                // todo 异常提示
            }
            console.error(error);
            reject();
        });
    });
}

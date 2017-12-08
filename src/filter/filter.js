import Vue from "vue";
Vue.filter("dateFmt", function(value, fmt) {
    var date = new Date(value);
    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        S: date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    return fmt;
});
Vue.filter("strDateFmt", function(value, fmt) {
    var pattern = /(\d{4})(\d{2})(\d{2})/;
    if (!value) {
        return value;
    }
    var formatedDate = (value + "").replace(pattern, "$1-$2-$3");
    var date = new Date(formatedDate);
    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        S: date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    return fmt;
});
Vue.filter("dateDiff", function(date1, date2) {
    let diff = Math.floor((date2 - date1) / 1000);
    let ss, mm, hh, dd;
    // 分
    let minmm = 60;
    // 小时
    let minhh = 60 * 60;
    // 天
    let mindd = 60 * 60 * 24;
    // 秒
    if (diff < minmm) {
        ss = diff;
        return ss + "秒";
    } else if (diff < minhh) {
        mm = Math.floor(diff / minmm);
        ss = diff - mm * minmm;
        if (ss < 10) {
            ss = "0" + ss;
        }
        return mm + "分" + ss + "秒";
    } else if (diff < mindd) {
        hh = Math.floor(diff / minhh);
        mm = Math.floor((diff - hh * minhh) / minmm);
        ss = diff - hh * minhh - mm * minmm;
        if (ss < 10) {
            ss = "0" + ss;
        }
        if (mm < 10) {
            mm = "0" + mm;
        }
        return hh + "时" + mm + "分" + ss + "秒";
    } else {
        dd = Math.floor(diff / mindd);
        hh = Math.floor((diff - dd * mindd) / minhh);
        mm = Math.floor((diff - dd * mindd - hh * minhh) / minmm);
        ss = diff - dd * mindd - hh * minhh - mm * minmm;
        if (ss < 10) {
            ss = "0" + ss;
        }
        if (mm < 10) {
            mm = "0" + mm;
        }
        if (hh < 10) {
            hh = "0" + hh;
        }
        return dd + "天" + hh + "时" + mm + "分" + ss + "秒";
    }
});

Vue.filter("nullFmt", function(value, str) {
    if (value == null || value === "") {
        return "--";
    }
    if (value / 1 == 0 && str == "%") {
        return "0%";
    }
    return value + "" + str;
});

Vue.filter("numFmt", function(s) {
    var f = false;
    if (s / 1 < 0) {
        f = true;
        s = Math.abs(s);
    }
    if (/[^0-9\.]/.test(s)) return "invalid value";
    s = (s + "").replace(/^(\d*)$/, "$1.");
    s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
    s = s.replace(".", ",");
    var re = /(\d)(\d{3},)/;
    while (re.test(s)) s = s.replace(re, "$1,$2");
    s = s.replace(/,(\d\d)$/, ".$1");
    return (f ? "-" : "") + s.replace(/^\./, "0.").toString();
});

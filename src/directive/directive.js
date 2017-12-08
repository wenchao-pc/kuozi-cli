/**
 * Created by kuo zi on 2016/10/17.
 */
import Vue from "vue";

/**
 * v-focus
 * 元素获取焦点
 */
Vue.directive("focus", {
    // 当绑定元素插入到 DOM 中。
    inserted(el) {
        // 聚焦元素
        el.focus();
    }
});

Vue.directive("scroll-bottom", {
    inserted(el, binding) {
        el.addEventListener("scroll", () => {
            if (el.scrollHeight - el.scrollTop - el.clientHeight <= binding.value) {
                el.setAttribute("data-scroll-bottom", "y");
            } else {
                el.setAttribute("data-scroll-bottom", "n");
            }
        });
        setTimeout(function() {
            el.scrollTop = el.scrollHeight;
        }, 10);
    },
    componentUpdated(el, binding) {
        setTimeout(function() {
            if (el.getAttribute("data-scroll-bottom") != "n") {
                el.scrollTop = el.scrollHeight;
            }
        }, 10);
    }
});

Vue.directive("scroll-head", {
    inserted(el) {
        el.addEventListener("scroll", () => {
            let head = document.getElementById("head");
            if (el.scrollTop == 0) {
                head.setAttribute("class", "head transparent");
                head.style.opacity = 0.95;
            } else {
                head.setAttribute("class", "head");
                if (el.scrollTop < 95) {
                    head.style.opacity = el.scrollTop / 100;
                } else {
                    head.style.opacity = 0.95;
                }
            }
        });
    }
});

//移动端滑动
var touchStart = function(e, el) {
    var touches = e.touches[0];
    el.dataset.tsx = touches.pageX;
    el.dataset.tsy = touches.pageY;
    el.dataset.time = new Date().getTime();
};
var touchEnd = function(e, el, callback) {
    var touches = e.changedTouches[0];
    el.dataset.cx = touches.pageX - el.dataset.tsx;
    el.dataset.cy = touches.pageY - el.dataset.tsy;
    el.dataset.ct = new Date().getTime() - el.dataset.time;
    callback(el.dataset.cx, el.dataset.cy, el.dataset.ct);
};

/**
 * v-swipe-left
 * 左滑
 */
Vue.directive("swipe-left", {
    acceptStatement: true,
    bind: function(el, binding) {
        var swipeLeft = function(cx, cy, ct) {
            if (Math.abs(cx) > Math.abs(cy) && cx < 0 && ct > 10) {
                try {
                    if (typeof binding.value === "function") {
                        binding.value();
                    } else {
                        binding.value.method(binding.value.params);
                    }
                } catch (e) {
                    throw new Error("v-swipe-left error parameter");
                }
            }
        };
        el.addEventListener("touchstart", function(e) {
            touchStart(e, el);
        });
        el.addEventListener("touchend", function(e) {
            touchEnd(e, el, swipeLeft);
        });
    }
});
/**
 * v-swipe-left
 * 右滑
 */
Vue.directive("swipe-right", {
    acceptStatement: true,
    bind: function(el, binding) {
        var swipeLeft = function(cx, cy, ct) {
            if (Math.abs(cx) > Math.abs(cy) && cx > 0 && ct > 10) {
                try {
                    if (typeof binding.value === "function") {
                        binding.value();
                    } else {
                        binding.value.method(binding.value.params);
                    }
                } catch (e) {
                    throw new Error("v-swipe-left error parameter");
                }
            }
        };
        el.addEventListener("touchstart", function(e) {
            touchStart(e, el);
        });
        el.addEventListener("touchend", function(e) {
            touchEnd(e, el, swipeLeft);
        });
    }
});

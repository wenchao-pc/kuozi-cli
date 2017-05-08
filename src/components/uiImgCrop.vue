<template>
    <div class="cropper">
        <div class="cropper-page" v-show="isShow" id="cropperPage">
            <img src="" class="cropper-img" :style="imageStyle" id="cropperImg">
            <div class="cover" :style="{height: coverHeight + 'px'}"></div>
            <div class="cropper-box" @touchstart.prevent="touchStart" @touchmove.prevent="touchMove" @touchend.prevent="touchEnd" id="cropBox"></div>
            <div class="cover" :style="{height: coverHeight + 'px'}">
                <button class="confirm" @click="confirm"></button>
            </div>
        </div>
        <input id="file" type="file" accept="image/*" @change="readImage">
    </div>
</template>
<style lang="less">
.cropper {
    position: absolute;
    top: 1.44rem;
    left: 0;
    width: 100%;
    height: 1.813333rem;
    .cropper-page {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 999;
        background-color: #fff;
        overflow: hidden;
    }
    .cover {
        text-align: center;
        background-color: rgba(0, 0, 0, 0.2);
        .confirm {
            width: 1.333333rem;
            height: 1.333333rem;
            margin-top: 0.4rem;
            // background: url("./../assets/选中.png") no-repeat center;
            background-size: 1.333333rem 1.333333rem;
            border: none;
            outline: none;
        }
    }
    .cropper-img {
        position: absolute;
        z-index: -1;
    }
    input[type="file"] {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
    }
}
</style>
<script>
import EXIF from "exif-js";
const getDinstance = function(point0, point1) {
    return Math.sqrt(Math.pow(point0.pageY - point1.pageY, 2) + Math.pow(point0.pageX - point1.pageX, 2))
}
export default {
    name: 'ImageCropper',
    props: {
        callback: {
            type: Function,
            default () {}
        }
    },
    data() {
        return {
            EXIF: EXIF,
            coverHeight: 0,
            cropperHeight: 0,
            imgInitTop: 0,
            amplitude: 0,
            imageState: {
                left: 0,
                top: 0,
                scale: 1,
                width: 0,
                height: 0,
                originX: 0,
                originY: 0
            },
            distance: 0,
            imageStyle: {
                top: '0',
                transform: 'translate3d(0px, 0px, 0px) scale(1)',
                transformOrigin: 'left top'
            },
            cropBoxRect: {},
            touchPos: {
                x: 0,
                y: 0
            },
            isShow: false,
            minScale: 0,
            info: ''
        }
    },
    events: {
        showCropper() {
            this.$els.file.click()
        }
    },
    watch: {
        'imageState': {
            handler(val, oldVal) {
                console.log(this.imageState.scale)
                    // this.imageStyle.transformOrigin = val.originX + '% ' + val.originY + '%'
                this.imageStyle.transform = 'translate3d(-' + val.left + 'px, -' + val.top + 'px, 0px) scale(' + val.scale + ')'
            },
            deep: true
        }
    },
    methods: {
        readImage(event) {
            console.log('read')
            var self = this;
            var file = event.target.files[0]
            if(!file){
                return false;
            }
            self.EXIF.getData(file, function() {
                // alert(EXIF.pretty(this));
                self.EXIF.getAllTags(this);
                //alert(EXIF.getTag(this, 'Orientation'));
                self.orientation = self.EXIF.getTag(this, 'Orientation');
                console.log(self.orientation);
                //return;
            });

            var reader = new window.FileReader()
            reader.onload = () => {
                // 通过 reader.result 来访问生成的 DataURL
                var img = document.getElementById("cropperImg");
                img.src = reader.result;
                //图片加载之后调用initCropper
                img.onload = () => {
                    self.initCropper();
                }
            }
            reader.readAsDataURL(file)
        },
        initCropper() {
            this.isShow = true // 显示裁剪界面
                // 回调会在dom更新后调用，如果不使用$nextTick，无法获取元素正确的高度
            this.$nextTick(() => {
                let cropperPage = document.getElementById("cropperPage");
                let pageWidth = cropperPage.clientWidth
                let pageHeight = cropperPage.clientHeight
                let headerHeight = 0;
                this.coverHeight = (pageHeight - headerHeight - pageWidth) / 2
                let cropBoxTop = this.coverHeight + headerHeight
                this.imageState.left = 0
                this.imageState.top = 0
                this.imageStyle.top = cropBoxTop + 'px'
                document.getElementById("cropBox").style.height = pageWidth + 'px'
                    // var cropBoxRect = this.$els.cropBox.getBoundingClientRect() // 获取的元素没有预期的参数
                this.cropBoxRect = {
                    left: 0,
                    top: cropBoxTop,
                    width: pageWidth,
                    height: pageWidth
                }


                let img = document.getElementById("cropperImg")

                var width = this.imageState.width = img.width
                var height = this.imageState.height = img.height
                console.log(img.naturalWidth);
                console.log(img.naturalHeight);
                // 计算imageState
                if (width > height) {
                    this.minScale = this.imageState.scale = this.cropBoxRect.height / height
                    this.imageState.left = (width * this.imageState.scale - this.cropBoxRect.width) / 2
                } else {
                    this.minScale = this.imageState.scale = this.cropBoxRect.width / width
                    this.imageState.top = (height * this.imageState.scale - this.cropBoxRect.height) / 2
                }
            })
        },
        confirm() {
            let imageState = this.imageState
            let cropBoxRect = this.cropBoxRect
            let scale = imageState.scale
            let image = document.getElementById("cropperImg")
            let height = cropBoxRect.height
            let width = cropBoxRect.width
            let canvas = document.createElement('canvas')
            canvas.width = cropBoxRect.width
            canvas.height = cropBoxRect.height
            let ctx = canvas.getContext('2d')
                // 添加白色背景
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            //画图
            ctx.drawImage(image, imageState.left / scale, imageState.top / scale, width / scale, height / scale, 0, 0, width, height)

            if (navigator.userAgent.match(/iphone/i) && this.orientation && this.orientation != 1) {
                switch (this.orientation) {
                    case 6: //需要顺时针（向左）90度旋转
                        console.log('需要顺时针（向左）90度旋转');
                        this.rotateImg(image, 'left', canvas, imageState.left / scale, imageState.top / scale, width / scale, height / scale, width, height);
                        break;
                    case 8: //需要逆时针（向右）90度旋转
                        console.log('需要顺时针（向右）90度旋转');
                        this.rotateImg(image, 'right', canvas, imageState.left / scale, imageState.top / scale, width / scale, height / scale, width, height);
                        break;
                    case 3: //需要180度旋转
                        console.log('需要180度旋转');
                        this.rotateImg(image, 'right', canvas, imageState.left / scale, imageState.top / scale, width / scale, height / scale, width, height); //转两次
                        this.rotateImg(image, 'right', canvas, imageState.left / scale, imageState.top / scale, width / scale, height / scale, width, height);
                        break;
                }
            }

            var encoder = 0.1;
            if (image.src.length < 100 * 1024) {
                encoder = 1.0;
            } else {
                encoder = 100 * 1024 / image.src.length;
            }
            let data = canvas.toDataURL('image/jpeg', encoder)
                // 调用处理函数
                // this.callback(data)
            this.$emit("input", data);
            this.$emit("saveHead");
            this.isShow = false
        },
        getFocalPoint(point0, point1) {
            return {
                x: (point0.pageX + point1.pageX) / 2,
                y: (point0.pageY + point1.pageY) / 2
            }
        },
        touchStart(event) {
            var fingerCount = event.touches.length
            if (fingerCount) {
                // 记录触摸初始位置
                let touchEvent = event.touches[0]
                this.touchPos = {
                    x: touchEvent.pageX,
                    y: touchEvent.pageY
                }
            }
            if (fingerCount >= 2) {
                // 获取两点距离、中点位置；两点距离old/new=放大倍数；中点位置，缩放中心；
                let point0 = event.touches[0]
                let point1 = event.touches[1]
                this.distance = getDinstance(point0, point1)
                this.touchPos = this.getFocalPoint(point0, point1)
                    // 设置缩放倍数，
            }
        },
        touchMove(event) {
            // 根据触摸点位移，移动图片，重置触摸点位置
            var fingerCount = event.touches.length
            var touchEvent = event.touches[0]
            if (fingerCount === 1) {
                let distX = touchEvent.pageX - this.touchPos.x
                let distY = touchEvent.pageY - this.touchPos.y
                let newX = this.imageState.left - distX
                let newY = this.imageState.top - distY
                let scale = this.imageState.scale
                let maxX = this.imageState.width * scale - this.cropBoxRect.width
                let maxY = this.imageState.height * scale - this.cropBoxRect.height
                this.imageState.left = newX < 0 ? 0 : (newX > maxX ? maxX : newX)
                this.imageState.top = newY < 0 ? 0 : (newY > maxY ? maxY : newY)
                this.touchPos.x = touchEvent.pageX
                this.touchPos.y = touchEvent.pageY
            } else if (fingerCount > 1) {
                let point0 = event.touches[0]
                let point1 = event.touches[1]
                let distance = getDinstance(point0, point1)
                let zoom = distance / this.distance
                let scale = zoom * this.imageState.scale
                let maxX = this.imageState.width * scale - this.cropBoxRect.width
                let maxY = this.imageState.height * scale - this.cropBoxRect.height
                let touchPos = this.getFocalPoint(point0, point1)
                let newX = zoom * (this.imageState.left + touchPos.x) - touchPos.x
                let newY = zoom * ((this.imageState.top - this.imgInitTop) + touchPos.y) - touchPos.y + this.imgInitTop
                    // 限制缩放
                    // 图片新位置:由中点位置确认;(新位置到中点)/(旧位置到中点)=(new scale)/(old scale)
                    // newLeft - touchPos.x = (distance / this.distance) * (oldLetf - touchPos.x)
                    // oldLeft = 0 - this.imageState.left
                    // oldTop = imgInitTop - this.imageState.top
                this.distance = distance
                if (scale < this.minScale) {
                    this.imageState.scale = this.minScale
                } else {
                    this.imageState.scale = scale
                    this.imageState.left = newX < 0 ? 0 : (newX > maxX ? maxX : newX)
                    this.imageState.top = newY < 0 ? 0 : (newY > maxY ? maxY : newY)
                }
                this.touchPos = touchPos
            }
        },
        touchEnd(event) {
            console.log('end')
        },
        rotateImg(img, direction, canvas, leftScale, topScale, widthScale, heightScale, iwidth, iheight) {
            //alert(img);
            //最小与最大旋转方向，图片旋转4次后回到原方向
            var min_step = 0;
            var max_step = 3;
            //var img = document.getElementById(pid);
            if (img == null) return;
            //var step = img.getAttribute('step');
            var step = 2;
            if (step == null) {
                step = min_step;
            }
            if (direction == 'right') {
                step++;
                //旋转到原位置，即超过最大值
                step > max_step && (step = min_step);
            } else {
                step--;
                step < min_step && (step = max_step);
            }
            //img.setAttribute('step', step);
            /*var canvas = document.getElementById('pic_' + pid);
            if (canvas == null) {
                img.style.display = 'none';
                canvas = document.createElement('canvas');
                canvas.setAttribute('id', 'pic_' + pid);
                img.parentNode.appendChild(canvas);
            }  */
            //旋转角度以弧度值为参数
            var degree = step * 90 * Math.PI / 180;
            var ctx = canvas.getContext('2d');
            switch (step) {
                case 0:
                    canvas.width = iwidth;
                    canvas.height = iheight;
                    ctx.drawImage(img, leftScale, topScale, widthScale, heightScale, 0, 0, iwidth, iheight);
                    break;
                case 1:
                    canvas.width = iheight;
                    canvas.height = iheight;
                    ctx.rotate(degree);
                    ctx.drawImage(img, leftScale, topScale, widthScale, heightScale, 0, -iheight, iwidth, iheight);
                    break;
                case 2:
                    canvas.width = iheight;
                    canvas.height = iheight;
                    ctx.rotate(degree);
                    ctx.drawImage(img, leftScale, topScale, widthScale, heightScale, -iwidth, -iheight, iwidth, iheight);
                    break;
                case 3:
                    canvas.width = iheight;
                    canvas.height = iheight;
                    ctx.rotate(degree);
                    ctx.drawImage(img, leftScale, topScale, widthScale, heightScale, -iwidth, 0, iwidth, iheight);
                    break;
            }
        }
    }
}
</script>

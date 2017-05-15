var gulp = require("gulp");

var express = require("express");
var proxyMiddleware = require('http-proxy-middleware')

var clean = require("gulp-clean");
var webpack = require("webpack");

var sftp = require('gulp-sftp');

var project = require("./config/project.js");
var ssh = require("./config/ssh");

/**
 * dev-server
 */
gulp.task("dev", function() {
    var app = express();

    var compiler = webpack(require("./webpack.config"));

    //使用webpack-dev-middleware
    var devMiddleware = require("webpack-dev-middleware")(compiler, {
        publicPath: "/",
        stats: {
            colors: true,
            chunks: false
        }
    });
    app.use(devMiddleware);

    // 开发环境配置代理
    var proxyTable = {};
    for (var p of Object.values(project.projectConfig)) {
        proxyTable["/" + p.baseURL] = {
            target: p.proxyServer,
            changeOrigin: true,
            pathRewrite: {
                ["/" + p.baseURL]: p.baseURL
            }
        }
    };
    Object.keys(proxyTable).forEach(function(context) {
        var options = proxyTable[context]
        if (typeof options === 'string') {
            options = { target: options }
        }
        app.use(proxyMiddleware(context, options))
    })

    //使用webpack-hot-middleware热加载
    var hotMiddleware = require("webpack-hot-middleware")(compiler);
    app.use(hotMiddleware);

    // //创建虚拟目录static放static目录下的静态资源
    app.use("/static", express.static("./static"));

    // 启动expres服务
    app.listen(project.devPort, function(error) {
        if (error) {
            console.log(error);
            return;
        }
        console.log('Listening at http://localhost:' + project.devPort + '\n');
    });
});



/**
 * gulp+webpack Build
 */
//删除dist
gulp.task("clean", function() {
    return gulp.src("./dist", {
        read: false
    }).pipe(clean());
});

//复制static目录
gulp.task("cp", ["clean"], function() {
    gulp.src("./static/**")
        .pipe(gulp.dest("./dist/static"));
});

//webpack打包
gulp.task("build", ["cp"], function(cb) {
    webpack(require("./webpack.config"), function(err, stats) {
        if (err) throw err
        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n');
        cb(err);
    });
});

/**
 * Build+部署
 */
// sftp上传开发环境
gulp.task("sftp-test", function() {
    return gulp.src('./dist/**')
        .pipe(sftp(ssh.testPublish));
});

// sftp上传生产环境
gulp.task("sftp-pro", function() {
    return gulp.src('./dist/**')
        .pipe(sftp(ssh.proPublish));
});

// 开发环境发布
gulp.task("publish-test", ["build"], function() {
    return gulp.src('./dist/**')
        .pipe(sftp(ssh.testPublish));
});

// 生产环境发布
gulp.task("publish-pro", ["build"], function() {
    return gulp.src('./dist/**')
        .pipe(sftp(ssh.proPublish));
});

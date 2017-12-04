var gulp = require("gulp");

var express = require("express");
var proxyMiddleware = require('http-proxy-middleware')

var clean = require("gulp-clean");
var webpack = require("webpack");

var sftp = require('gulp-sftp');

var path = require("path");
var fs = require("fs");
var replace = require("gulp-replace");
var rename = require("gulp-rename");
var colors = require("colors");

var readline = require('readline');
var argvs = JSON.parse(process.env.npm_config_argv || "{}").original || [];
gulp.task("choose-env", function () {
    if (argvs[1] != 'dev') {
        return new Promise((resolve) => {
            var rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            rl.question(`\n**********NODE_ENV(test):**********\n1.test\n2.production\n`.yellow, function (answer) {
                switch (answer) {
                case "1":
                    process.env.NODE_ENV = "test";
                    break;
                case "2":
                    process.env.NODE_ENV = "production";
                    break;
                default:
                    process.env.NODE_ENV = "test";
                    break;
                }
                rl.close();
                resolve();
            });
        });
    } else {
        process.env.NODE_ENV = "dev";
    }
});
gulp.task("choose-split", ["choose-env"], function () {
    return new Promise((resolve) => {
        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question(`\n**********SPLIT(y/n):**********\n`.yellow, function (answer) {
            switch (answer) {
            case "y":
                process.env.SPLIT = true;
                break;
            case "n":
                process.env.SPLIT = false;
                break;
            default:
                process.env.SPLIT = false;
                break;
            }
            rl.close();
            resolve();
        });
    });
});

gulp.task("choose-hash", ["choose-split"], function () {
    if (argvs[1] == 'dev') {
        process.env.HASH = true;
    } else {
        return new Promise((resolve) => {
            var rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            rl.question(`\n**********HASH(y/n):**********\n`.yellow, function (answer) {
                switch (answer) {
                case "y":
                    process.env.HASH = true;
                    break;
                case "n":
                    process.env.HASH = false;
                    break;
                default:
                    process.env.HASH = true;
                    break;
                }
                rl.close();
                resolve();
            });
        });
    }
});

gulp.task("choose-ugfjs", ["choose-hash"], function () {
    if (argvs[1] == 'dev') {
        process.env.UGFJS = false;
    } else {
        return new Promise((resolve) => {
            var rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            rl.question(`\n**********UGFJS(y/n):**********\n`.yellow, function (answer) {
                switch (answer) {
                case "y":
                    process.env.UGFJS = true;
                    break;
                case "n":
                    process.env.UGFJS = false;
                    break;
                default:
                    process.env.UGFJS = false;
                    break;
                }
                rl.close();
                resolve();
            });
        });
    }
});

// 清除router文件
gulp.task("clean-router-split", ["choose-ugfjs"], function () {
    console.log((colors.green("**********NODE_ENV:") + colors.yellow(process.env.NODE_ENV) + colors.green(" SPLIT:") + colors.yellow(process.env.SPLIT) + colors.green(" HASH:") + colors.yellow(process.env.HASH) + colors.green(" UGFJS:") + colors.yellow(process.env.UGFJS) + colors.green("**********\n")));
    if (process.env.SPLIT === "true") {
        return gulp.src("./src/router/router.split.js", {
            read: false
        }).pipe(clean());
    }
});
//生成router文件
gulp.task("split", ["clean-router-split"], function () {
    if (process.env.SPLIT === "true") {
        var dir = "./src/view";
        let routes = [];
        var readdir = function (d) {
            var files = fs.readdirSync(d);
            for (let filename of files) {
                var fullname = path.join(d, filename);
                var stats = fs.statSync(fullname);
                if (stats.isDirectory()) {
                    readdir(fullname);
                } else {
                    if (/.vue$/.test(filename)) {
                        routes.push({
                            name: filename.replace(".vue", "").toString(),
                            path: fullname.replace("src/view", "").replace("src\\view", "").replace(".vue", "").toString(),
                            meta: "{ login: false }",
                            component: `() => import ("${fullname.replace("src", "./..")}")`
                        });
                    }
                }
            }
        }
        readdir(dir);
        var code = "{\n";
        for (let r of routes) {
            code = code + `\t${r.name}:{name: "${r.name}",path: "${r.path.replace(/\\/g,"/")}",meta:${r.meta},component: ${r.component.replace(/\\/g,"/")}},\n`
        }
        code = code + "}"
        gulp.src("./src/router/router.split.src.js")
            .pipe(replace("$routes", code))
            .pipe(rename("router.split.js"))
            .pipe(gulp.dest('./src/router/'))
    }
});

/**
 * dev-server
 */
gulp.task("dev", ["split"], function () {
    var app = express();
    let c = require("./webpack.config");
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
    var project = require("./config/project.js");
    for (var k of Object.keys(project.projectConfig)) {
        var p = project.projectConfig[k];
        proxyTable["/" + p.baseURL] = {
            target: p.proxyServer,
            changeOrigin: true,
            pathRewrite: {
                ["/" + p.baseURL]: ""
            }
        }
    };
    Object.keys(proxyTable).forEach(function (context) {
        var options = proxyTable[context]
        if (typeof options === 'string') {
            options = {
                target: options
            }
        }
        app.use(proxyMiddleware(context, options))
    })

    //使用webpack-hot-middleware热加载
    var hotMiddleware = require("webpack-hot-middleware")(compiler);
    app.use(hotMiddleware);

    // //创建虚拟目录static放static目录下的静态资源
    app.use("/static", express.static("./static"));

    // 启动expres服务
    app.listen(project.devPort, function (error) {
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
gulp.task("clean", ["split"], function () {
    return gulp.src("./dist", {
        read: false
    }).pipe(clean());
});

//复制static目录
gulp.task("cp", ["clean"], function () {
    gulp.src("./static/**")
        .pipe(gulp.dest("./dist/static"));
});

//webpack打包
gulp.task("build", ["cp"], function (cb) {
    webpack(require("./webpack.config"), function (err, stats) {
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
gulp.task("sftp", ["choose-env"], function () {
    var ssh = require("./config/ssh");
    return gulp.src('./dist/**')
        .pipe(sftp(ssh[process.env.NODE_ENV]));
});

//发布
gulp.task("publish", ["build"], function () {
    var ssh = require("./config/ssh");
    return gulp.src('./dist/**')
        .pipe(sftp(ssh[process.env.NODE_ENV]));
});
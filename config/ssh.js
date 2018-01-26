module.exports = {
    default: {
        //测试环境发布
        test: {
            host: '',
            port: "",
            user: '',
            pass: '',
            timeout: 100000,
            remotePath: ""
        },
        //生产环境发布
        production: {
            host: '',
            port: "",
            user: '',
            pass: '',
            timeout: 100000,
            remotePath: ""
        }
    },
}
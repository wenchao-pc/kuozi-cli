module.exports = {
    //测试环境发布
    testPublish: {
        host: 'test.yunyesoft.com',
        port: "",
        user: '',
        pass: '',
        timeout: 100000,
        remotePath: "/opt/tomcat/tomcat-fund/webapps/ROOT/dist"
    },
    //生产环境发布
    proPublish: {
        host: '',
        port: "",
        user: '',
        pass: '',
        timeout: 100000,
        remotePath: ""
    }
}

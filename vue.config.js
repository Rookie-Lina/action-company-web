// const { defineConfig } = require('@vue/cli-service')
module.exports = ({
    // transpileDependencies: true,
    // lintOnSave:false,
    // 开启代理服务器
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8888',
                pathRewrite: { '^/api': '' }, //将请求头中的字符替换掉
                ws: true, //用于支持websocket
                changeOrigin: true //用于支持请求头中的host值
            }
        }
    }
})

const path = require('path')
module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/dist/'
        : '/',
    chainWebpack: config => {
        config.resolve.alias
            .set('@', path.resolve(__dirname, 'src'));
    }
}
// 配置多语言转化插件，vue-i18n-transform，测试文件可看src/test/index.vue
module.exports = {
  entry: 'src/test', // 编译入口文件夹,默认是 src
  outdir: 'src/locales', // i18n 输出文件夹 默认是 src/locales
  exclude: ['src/locales'], // 不重写的文件夹, 默认是 ['src/locales']
  extensions: ['.vue', '.js', '.ts'], // 重写的文件类型，默认是 ['.js', '.vue', '.ts']
  single: false, // 是否为单文件编译, 默认为 false. 如果为 true, 则 entry 需为文件而不是文件夹, 如 entry: 'src/index.vue'
  filename: 'zh_cn' // 输入的中文 json 文件名,默认为 zh_cn
}

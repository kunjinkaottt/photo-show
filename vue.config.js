const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath:'./',  //解决打包的dist文件夹中的index.html打开为空白界面 因为默认 / 引用不到js文件
  transpileDependencies: true,
  lintOnSave:false
})

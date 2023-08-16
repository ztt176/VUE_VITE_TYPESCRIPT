import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
// 如果编辑器提示 path 模块找不到，则可以安装一下 @types/node -> npm i @types/node -D
import { resolve } from "path";
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"), // 设置 `@` 指向 `src` 目录
      },
    },
    base: "./", // 设置打包路径
    plugins: [vue()],
    server: {
      hmr: { overlay: false },
      port: 5173,
      host: true,
      open: true, //服务启动时自动在浏览器中打开应用
      cor: true,
      // 跨域设置
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: 'http://192.168.1.8:8087/',
          changeOrigin: true,
          secure: false,
          rewrite: path => {
            const envApi = new RegExp(env.VITE_APP_BASE_API, 'g') // 配置需要前缀 VITE_
            return path.replace(envApi, '')
          }
        },
      },
      // 引入第三方的配置
      optimizeDeps: {
        include: [] //例["moment", "echarts", "axios", "mockjs", "@ant-design/icons-vue"]
      },
    },
  }
})

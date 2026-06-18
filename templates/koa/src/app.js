import Koa from 'koa'
import { router } from './router/index.js'

// 创建 Koa 应用实例。
const app = new Koa()
// 优先读取环境变量 PORT，没有配置时默认使用 3000。
const port = process.env.PORT || 3000

// 注册路由中间件。
app.use(router.routes())
// 注册 allowedMethods，用于自动处理 405 / 501 等方法相关响应。
app.use(router.allowedMethods())

// 启动 HTTP 服务，监听指定端口。
app.listen(port, () => {
  console.log(`{{projectName}} is running at http://localhost:${port}`)
})

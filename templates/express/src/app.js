import express from 'express'
import { router } from './router/index.js'

// 创建 Express 应用实例。
const app = express()
// 优先读取环境变量 PORT，没有配置时默认使用 3000。
const port = process.env.PORT || 3000

// 注册 JSON 请求体解析中间件，便于后续接收 application/json 请求。
app.use(express.json())
// 将业务路由统一挂载到 /api 前缀下。
app.use('/api', router)

// 启动 HTTP 服务，监听指定端口。
app.listen(port, () => {
  console.log(`{{projectName}} is running at http://localhost:${port}`)
})

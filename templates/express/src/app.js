import express from 'express'
import { router } from './router/index.js'
import { requestLogger } from './middleware/requestLogger.js'
import { notFoundHandler } from './middleware/notFoundHandler.js'
import { errorHandler } from './middleware/errorHandler.js'

// 创建 Express 应用实例。app.js 只负责组装应用，不直接启动端口。
export const app = express()

// 注册请求日志中间件，便于开发和排查接口调用情况。
app.use(requestLogger)

// 注册 JSON 请求体解析中间件，便于接收 application/json 请求。
app.use(express.json())

// 注册 urlencoded 请求体解析中间件，便于接收表单提交的数据。
app.use(express.urlencoded({ extended: true }))

// 将业务路由统一挂载到 /api 前缀下，方便后续做版本管理，例如 /api/v1。
app.use('/api', router)

// 兜底处理未匹配到的路由，必须放在业务路由之后。
app.use(notFoundHandler)

// 统一错误处理中间件必须放在最后，接收前面流程中抛出的错误。
app.use(errorHandler)
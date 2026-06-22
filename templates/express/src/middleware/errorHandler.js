import { config } from '../config/index.js'
import { fail } from '../utils/response.js'

/**
 * 统一错误处理中间件。
 * Express 约定带有四个参数的中间件用于集中处理错误。
 */
export const errorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || 500
  const message = statusCode === 500 ? 'Internal Server Error' : error.message

  // 开发环境打印错误堆栈，生产环境应接入日志系统并避免泄露敏感信息。
  if (config.env !== 'production') {
    console.error(error)
  }

  fail(res, {
    statusCode,
    message,
    details: config.env === 'production' ? undefined : error.stack
  })
}
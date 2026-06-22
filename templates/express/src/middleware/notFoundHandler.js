import { fail } from '../utils/response.js'

/**
 * 404 处理中间件。
 * 当前面所有路由都没有命中时，会进入这个中间件。
 */
export const notFoundHandler = (req, res) => {
  fail(res, {
    statusCode: 404,
    message: `Route not found: ${req.method} ${req.originalUrl}`
  })
}
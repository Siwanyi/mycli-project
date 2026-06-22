/**
 * 请求日志中间件。
 * 企业项目中通常会接入更完整的日志库，这里先保留最小可读版本。
 */
export const requestLogger = (req, res, next) => {
  const startedAt = Date.now()

  res.on('finish', () => {
    const duration = Date.now() - startedAt
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`)
  })

  next()
}
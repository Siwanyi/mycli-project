/**
 * 简易参数校验中间件工厂。
 * 当前实现只演示 validator 层的位置和职责，不依赖第三方校验库。
 */
export const validateQuery = (schema) => {
  return (req, res, next) => {
    for (const [field, rule] of Object.entries(schema)) {
      const value = req.query[field]

      if (rule.required && value === undefined) {
        const error = new Error(`Missing required query: ${field}`)
        error.statusCode = 400
        next(error)
        return
      }

      if (value !== undefined && rule.type === 'boolean-string' && !['true', 'false'].includes(value)) {
        const error = new Error(`Invalid query ${field}: expected true or false`)
        error.statusCode = 400
        next(error)
        return
      }
    }

    next()
  }
}
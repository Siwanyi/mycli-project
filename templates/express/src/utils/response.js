/**
 * 统一成功响应。
 * 统一响应结构可以降低前后端联调成本。
 */
export const success = (res, data = null, message = 'success') => {
  res.json({
    code: 0,
    message,
    data
  })
}

/**
 * 统一失败响应。
 * 这里用 http 状态码表达请求级别结果，用 code/message 表达业务级别结果。
 */
export const fail = (res, { statusCode = 500, code = statusCode, message = 'error', details }) => {
  res.status(statusCode).json({
    code,
    message,
    details
  })
}
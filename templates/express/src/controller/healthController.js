import { getHealthInfo } from '../service/healthService.js'
import { success } from '../utils/response.js'

/**
 * 健康检查控制器。
 * controller 层只负责处理 HTTP 入参和响应，不直接堆业务逻辑。
 */
export const getHealth = (req, res) => {
  const data = getHealthInfo()

  success(res, data)
}
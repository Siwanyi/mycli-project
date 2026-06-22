/**
 * 健康检查服务。
 * service 层用于承载业务逻辑，controller 只负责调用它并返回结果。
 */
export const getHealthInfo = () => {
  return {
    name: '{{projectName}}',
    template: '{{template}}',
    status: 'ok',
    timestamp: new Date().toISOString()
  }
}
/**
 * 健康检查控制器。
 * 用于确认服务是否启动成功，也演示 Express 中 req/res 的基本用法。
 */
export const getHealth = (req, res) => {
  res.json({
    name: '{{projectName}}',
    template: '{{template}}',
    status: 'ok'
  })
}

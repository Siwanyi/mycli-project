/**
 * 健康检查控制器。
 * Koa 中通过 ctx.body 设置响应体。
 */
export const getHealth = (ctx) => {
  ctx.body = {
    name: '{{projectName}}',
    template: '{{template}}',
    status: 'ok'
  }
}

'use strict'

const Controller = require('egg').Controller

/**
 * Egg.js 健康检查控制器。
 * Egg 约定 controller 中的方法可以通过 router 映射为接口处理函数。
 */
class HealthController extends Controller {
  // GET /api/health 对应的处理方法。
  async index() {
    this.ctx.body = {
      name: '{{projectName}}',
      template: '{{template}}',
      status: 'ok'
    }
  }
}

module.exports = HealthController

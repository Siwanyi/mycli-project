'use strict'

/**
 * Egg.js 路由配置。
 * app.router 用于声明 URL 和 controller 方法之间的映射关系。
 */
module.exports = app => {
  const { router, controller } = app

  // 健康检查接口：GET /api/health。
  router.get('/api/health', controller.health.index)
}

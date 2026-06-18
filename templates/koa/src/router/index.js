import Router from '@koa/router'
import { getHealth } from '../controller/healthController.js'

// 创建 Koa Router，并统一设置 /api 前缀。
export const router = new Router({
  prefix: '/api'
})

// 健康检查接口：GET /api/health。
router.get('/health', getHealth)

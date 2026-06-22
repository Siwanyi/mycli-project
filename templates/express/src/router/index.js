import { Router } from 'express'
import { getHealth } from '../controller/healthController.js'
import { validateQuery } from '../validator/index.js'
import { healthQuerySchema } from '../validator/schema/healthSchema.js'

// 创建 Express 路由实例，集中维护当前模块下的接口。
export const router = Router()

// 健康检查接口：GET /api/health。
// validateQuery 演示如何在路由层接入参数校验中间件。
router.get('/health', validateQuery(healthQuerySchema), getHealth)
import { Router } from 'express'
import { getHealth } from '../controller/healthController.js'

// 创建 Express 路由实例，集中维护当前模块下的接口。
export const router = Router()

// 健康检查接口：GET /api/health。
router.get('/health', getHealth)

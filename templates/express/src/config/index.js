// config 层集中管理运行时配置，避免在业务代码中到处读取 process.env。
export const config = {
  // 优先读取环境变量 PORT，没有配置时默认使用 3000。
  port: Number(process.env.PORT) || 3000,
  // 当前运行环境，常见值有 development、test、production。
  env: process.env.NODE_ENV || 'development'
}
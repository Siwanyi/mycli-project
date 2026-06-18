// 项目级配置：集中维护默认值和可选模板，避免散落在多个模块里。
export const config = {
  // 用户没有输入项目名时使用的默认名称。
  defaultProjectName: 'my-node-service',
  // 当前 CLI 支持生成的后端模板列表。
  templates: ['express', 'koa', 'egg']
}

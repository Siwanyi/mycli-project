'use strict'

/**
 * Egg.js 默认配置。
 * appInfo 包含应用名称、根目录等信息，可用于组合配置项。
 */
module.exports = appInfo => {
  const config = {}

  // keys 用于 Cookie 签名等安全场景，正式项目中应替换为更安全的私密值。
  config.keys = `${appInfo.name}_{{projectName}}_secret`

  return config
}

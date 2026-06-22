/**
 * 用户数据访问层示例。
 * repository 层负责隔离数据库读写，service 不直接依赖具体数据库实现。
 * 当前模板暂未接入数据库，所以这里保留函数形态作为后续扩展示例。
 */
export const userRepository = {
  async findById(id) {
    // TODO: 接入数据库后，在这里查询用户数据。
    return null
  },

  async create(userPayload) {
    // TODO: 接入数据库后，在这里创建用户数据。
    return {
      id: Date.now(),
      ...userPayload
    }
  }
}
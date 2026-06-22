/**
 * 用户模型示例。
 * 当前模板暂未接入数据库 ORM，这里先用普通对象描述数据结构。
 * 后续接入 Sequelize、Prisma、Mongoose 等工具时，可以把模型定义放在这一层。
 */
export const userModel = {
  tableName: 'users',
  fields: {
    id: 'number',
    name: 'string',
    email: 'string',
    createdAt: 'date'
  }
}
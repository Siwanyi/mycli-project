/**
 * 健康检查接口参数规则示例。
 * 当前模板暂未引入 Joi、Zod、Yup 等校验库，因此先用普通对象描述规则。
 * 后续接入校验库时，可以把 schema 替换成对应库的 schema 对象。
 */
export const healthQuerySchema = {
  verbose: {
    type: 'boolean-string',
    required: false,
    description: '是否返回更详细的健康检查信息，允许 true 或 false 字符串。'
  }
}

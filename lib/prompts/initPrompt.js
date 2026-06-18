import inquirer from 'inquirer'
import { config } from '../../config.js'

/**
 * 补全 init 命令所需参数。
 * 已经从命令行传入的值不会重复询问，缺少的值才通过 inquirer 交互获取。
 */
export const promptForInitOptions = async ({ projectName, template }) => {
  // questions 是 inquirer 的问题配置数组，按需动态添加问题。
  const questions = []

  if (!projectName) {
    // 未传项目名时，询问用户要生成的项目名称。
    questions.push({
      type: 'input',
      name: 'projectName',
      message: 'Project name:',
      default: config.defaultProjectName
    })
  }

  if (!template) {
    // 未传模板名时，展示可选后端模板列表。
    questions.push({
      type: 'list',
      name: 'template',
      message: 'Backend template:',
      choices: config.templates,
      default: config.templates[0]
    })
  }

  // 如果没有缺失信息，就不启动交互，便于脚本化和自动化执行。
  const answers = questions.length ? await inquirer.prompt(questions) : {}

  // 返回最终可用的参数对象，后续生成器只依赖这个统一结果。
  return {
    projectName: projectName || answers.projectName,
    template: template || answers.template
  }
}

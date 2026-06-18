import inquirer from 'inquirer'
import { config } from '../config.js'

/**
 * inquirer 学习示例。
 * 演示如何通过命令行交互收集项目名和模板类型。
 */
export const runInquirerDemo = async () => {
  // prompt 接收问题数组，并返回用户回答组成的对象。
  const answer = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Project name:',
      default: config.defaultProjectName
    },
    {
      type: 'list',
      name: 'template',
      message: 'Backend template:',
      choices: config.templates
    }
  ])

  // 打印用户输入结果，便于观察 inquirer 的返回结构。
  console.log(`Project name: ${answer.projectName}`)
  console.log(`Backend template: ${answer.template}`)
}

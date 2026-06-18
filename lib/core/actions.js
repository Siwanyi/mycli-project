// 命令执行模块：把“用户输入 -> 交互补全 -> 项目生成 -> 结果提示”串起来。

import ora from 'ora'
import { promptForInitOptions } from '../prompts/initPrompt.js'
import { createProject } from '../generator/createProject.js'

/**
 * init 命令的执行函数。
 * @param {string | undefined} projectName 命令行传入的项目名
 * @param {{ template?: string, force?: boolean }} options 命令行选项
 */
export const initProgram = async (projectName, options) => {
  try {
    // 先合并命令行参数和交互式问题，确保拿到完整的项目名和模板名。
    const answers = await promptForInitOptions({
      projectName,
      template: options.template
    })

    // 文件生成可能需要一点时间，用 loading 给用户明确反馈。
    const spinner = ora('Creating project...').start()
    // 调用生成器，把指定模板复制到目标目录，并完成占位符替换。
    const result = await createProject({
      projectName: answers.projectName,
      template: answers.template,
      force: Boolean(options.force)
    })

    // 生成成功后展示下一步命令，让用户知道如何进入并启动项目。
    spinner.succeed(`Project created at ${result.targetDir}`)
    console.log('\nNext steps:')
    console.log(`  cd ${result.projectName}`)
    console.log('  npm install')
    console.log('  npm run dev')
  } catch (error) {
    // 统一捕获错误，避免抛出一长串堆栈影响命令行体验。
    console.error(`\n${error.message}`)
    process.exitCode = 1
  }
}

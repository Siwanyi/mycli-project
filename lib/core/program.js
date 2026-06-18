import { Command } from 'commander'
import { registerCommands } from './commands.js'
import { registerGlobalOptions } from './help.js'

/**
 * 创建并配置 commander 程序实例。
 * 这里集中声明 CLI 的名称、描述、版本、全局选项和子命令。
 */
export const createProgram = () => {
  // Command 是 commander 提供的核心类，用来描述一个命令行程序。
  const program = new Command()

  // 设置 CLI 基础信息；version 会自动注册 -v / --version 选项。
  program
    .name('mycli')
    .description('A Node.js backend scaffold CLI')
    .version('1.0.0', '-v, --version', 'output the current version')

  // 注册全局选项，例如 --debug、--trace，这些选项对整个 CLI 生效。
  registerGlobalOptions(program)
  // 注册具体命令，例如 init。
  registerCommands(program)

  // 返回配置好的 program，入口文件负责调用 parse 解析命令行参数。
  return program
}

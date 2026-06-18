// 命令注册模块：只负责声明有哪些命令，以及命令参数和选项是什么。

import { initProgram } from './actions.js'

/**
 * 注册业务命令。
 * @param {import('commander').Command} program commander 程序实例
 */
export const registerCommands = (program) => {
  program
    // init [project-name] 表示 project-name 是可选参数；不传时会进入交互式询问。
    .command('init [project-name]')
    .description('create a Node.js backend project')
    // --template 用来选择模板，当前支持 express、koa、egg。
    .option('-t, --template <name>', 'template name: express, koa, egg')
    // --force 用来允许覆盖已存在目录，避免误删时默认直接失败。
    .option('-f, --force', 'overwrite target directory if it already exists')
    // action 绑定命令真正执行时的回调函数。
    .action(initProgram)
}

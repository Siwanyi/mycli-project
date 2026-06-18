#!/usr/bin/env node

import { createProgram } from '../lib/core/program.js'

// 创建 CLI 程序实例，所有命令、选项和版本信息都在 createProgram 中统一注册。
const program = createProgram()

// 解析终端传入的参数，例如：node bin/cli.js init demo --template express。
program.parse(process.argv)

// 如果用户没有输入任何命令，则主动展示帮助信息，避免命令行没有反馈。
if (!process.argv.slice(2).length) {
  program.outputHelp()
}

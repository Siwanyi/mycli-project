#!/usr/bin/env node
import('./cli-init.js')
console.log('-------------------------自定义命令-------------------------')

// console.log('---------------------原生命令行参数解析----------------------')

// // 打印命令行参数
// console.log('Raw Args:', process.argv)

// // 获取用户命令
// const userCommand = process.argv.slice(2)
// console.log('User args:', userCommand);

// // 处理指定用户命令
// userCommand.forEach(item => {
//     if (item === '--help') {
//         console.log('Usage: my-sci [options]')
//         console.log('Options:')
//         console.log('  --help     Show help information')
//     }
// })

console.log('------------------commander命令行参数解析--------------------')
// 小型程序使用commander导入方式：
// const program = require('commander') // CommonJS
// import { program } from 'commander' // ESM

// 导入commander，创建一个本地Command对象 --适用于大型程序
import { Command } from 'commander'
const program = new Command()
// console.log(program)
// 1.选项 option
// 自定义选项
// program
//     .option('-d, --debug', 'Enable debug mode')
//     .option('-p, --port <number>', 'server port number')
//     .option('--trace', 'add extra debugging output')
//     .option('--ws, --workspace <name>', 'use a custom workspace')
//     .option('-n, --number <number...>', 'a number') // 可变参数
//     .option('-l, --letter <letter...>', 'a letter') // 可变参数
//     .allowExcessArguments(true) // 允许根命令接收多余的参数

// 2.自定义命令 command
// 例如：自定义项目初始化命令
// program
//     .command('init <project-name>')
//     .description('init a project')
//     .option('-d, --debug', 'Enable debug mode')
//     .action((projectName) => {
//         // 执行init命令的回调
//         console.log(`Initializing project: ${projectName || 'my-app'}`)
//     })

// program
//     .command('serve')
//     .description('Start the server')
//     .option('-p, --port <number>', 'server port number', '8080')
//     .action((options) => {
//         console.log(`Server running on port ${options.port}`)
//     })

// 3.版本选项
// program.version('0.0.1')
// 通过将其他参数传递给 version 方法来更改标志和说明，使用与 option 方法相同的标志语法
program.version('0.0.1', '-v, --version', 'output the current version')

// 4.必需选项
// 选项在解析后必须有一个值，通常在命令行上指定，或者可能来自默认值（例如来自环境）
// program
    // .requiredOption('-u --user <name>', 'user name')

// 5.命令参数
program
  .command('login')
  .argument('<username>', 'user to login') // <> 表示必填参数：如果不提供，程序会报错
  .argument('[password]', 'password for user, if required', 'no password given') // [] 表示可选参数：如果不提供，使用默认值
  .action((username, password) => {
    console.log('username:', username)
    console.log('password:', password)
  })

// program.parse(arguments) 处理参数，将程序选项未使用的任何参数留在 program.args 数组中。参数是可选的，默认为 process.argv
program.parse()

// 可以通过在 Command 对象上调用 .opts() 来访问解析的选项，并将其传递给操作处理程序
// 多词选项（例如 "--template-engine"）采用驼峰式大小写，变为 program.opts().templateEngine 等
const options = program.opts() // 针对program.option有效
const args = program.args // 针对可变参数
console.log('Options:', options)
console.log('Remain args:', args)

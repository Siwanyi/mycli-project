// 全局选项模块：用于注册所有命令都可以共享的选项。

/**
 * 注册全局选项。
 * @param {import('commander').Command} program commander 程序实例
 */
export const registerGlobalOptions = (program) => {
  program
    // 调试开关：后续可以在 action 中读取 program.opts().debug 来控制日志。
    .option('-d, --debug', 'enable debug mode')
    // 更细粒度的追踪开关，适合排查命令执行链路。
    .option('--trace', 'add extra debugging output')
    // 工作区参数，后续可扩展为指定模板目录或项目生成目录。
    .option('--ws, --workspace <name>', 'use a custom workspace')
}

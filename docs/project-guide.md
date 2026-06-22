# mycli 项目说明

## 项目定位

`mycli` 是一个用于学习 Node.js 自定义 CLI 和后端项目脚手架的练习项目。它的核心目标是：通过命令行接收用户输入，选择后端模板，然后在当前目录生成一个可运行的 Node.js 后端项目。

当前项目不是一个业务后端服务本身，而是一个“生成后端服务项目”的命令行工具。

## 目录结构

```text
mycli-project
|-- bin
|   |-- cli.js              # CLI 正式入口
|   |-- cli-base.js         # commander 学习笔记和早期实验代码
|   `-- cli-init.js         # init 命令早期实验代码
|-- lib
|   |-- core
|   |   |-- actions.js      # 命令执行函数
|   |   |-- commands.js     # 子命令注册
|   |   |-- help.js         # 全局选项注册
|   |   `-- program.js      # commander 程序创建和组装
|   |-- generator
|   |   `-- createProject.js # 模板复制和渲染逻辑
|   `-- prompts
|       `-- initPrompt.js   # 交互式问题
|-- templates               # 后端项目模板
|   |-- express
|   |-- koa
|   `-- egg
|-- test                    # 学习示例脚本
|-- config.js               # 项目共享配置
|-- package.json            # 包信息、命令和依赖
`-- package-lock.json       # 依赖锁定文件
```

## 命令执行流程

执行：

```bash
node bin/cli.js init demo-service --template express
```

内部流程如下：

```text
bin/cli.js
  -> createProgram()
  -> registerGlobalOptions()
  -> registerCommands()
  -> initProgram()
  -> promptForInitOptions()
  -> createProject()
  -> copyTemplate()
  -> renderTemplate()
```

每一步的职责：

1. `bin/cli.js`：命令行入口，负责创建程序实例并解析命令行参数。
2. `createProgram()`：创建 commander 实例，注册名称、描述、版本、全局选项和子命令。
3. `registerGlobalOptions()`：注册 `--debug`、`--trace`、`--workspace` 等全局选项。
4. `registerCommands()`：注册 `init [project-name]` 子命令。
5. `initProgram()`：执行 init 命令，串联交互、生成和结果提示。
6. `promptForInitOptions()`：当命令行参数缺失时，通过 inquirer 向用户提问。
7. `createProject()`：校验参数，定位模板目录，创建目标项目。
8. `copyTemplate()`：递归复制模板目录。
9. `renderTemplate()`：把模板中的 `{{projectName}}`、`{{template}}` 替换成真实值。

## 使用方式

安装依赖：

```bash
npm install
```

查看帮助：

```bash
npm run help
```

生成 Express 项目：

```bash
node bin/cli.js init demo-service --template express
```

生成 Koa 项目：

```bash
node bin/cli.js init demo-service --template koa
```

生成 Egg.js 项目：

```bash
node bin/cli.js init demo-service --template egg
```

如果目标目录已经存在，可以显式使用 `--force` 覆盖：

```bash
node bin/cli.js init demo-service --template express --force
```

生成项目后进入目录并启动：

```bash
cd demo-service
npm install
npm run dev
```

健康检查接口：

```text
http://localhost:3000/api/health
```

## 核心知识点

### 1. bin 字段和 shebang

`package.json` 中的 `bin` 字段用于声明命令行工具：

```json
{
  "bin": {
    "mycli": "bin/cli.js"
  }
}
```

`bin/cli.js` 第一行：

```js
#!/usr/bin/env node
```

这行叫 shebang，表示这个文件应该使用 Node.js 执行。发布成 npm 包后，用户可以通过 `mycli` 命令调用它。

### 2. ESM 模块

项目在 `package.json` 中声明：

```json
{
  "type": "module"
}
```

因此代码使用：

```js
import xxx from 'xxx'
export const xxx = ...
```

而不是 CommonJS 的：

```js
const xxx = require('xxx')
module.exports = xxx
```

### 3. commander

`commander` 用来搭建命令行程序，主要负责：

- 设置命令名称和描述
- 注册版本号
- 注册全局选项
- 注册子命令
- 解析命令参数
- 将命令绑定到执行函数

当前核心命令是：

```bash
mycli init [project-name] --template express
```

其中：

- `init` 是子命令。
- `[project-name]` 是可选参数。
- `--template` 是命令选项。
- `--force` 表示允许覆盖已有目录。

### 4. inquirer

`inquirer` 用于命令行交互。

本项目中的设计是：如果用户已经在命令行里传入项目名和模板名，就不再询问；如果缺少某个值，才通过交互补全。

例如：

```bash
node bin/cli.js init
```

会询问项目名称和模板类型。

```bash
node bin/cli.js init demo-service --template express
```

信息已经完整，则不会再进入交互。

### 5. ora

`ora` 用来显示命令行 loading 状态。

在 `initProgram()` 中，项目生成前会调用：

```js
ora('Creating project...').start()
```

生成成功后调用：

```js
spinner.succeed(...)
```

这样用户可以清楚知道命令正在执行，而不是终端无响应。

### 6. 模板渲染

模板文件中可以写占位符：

```text
{{projectName}}
{{template}}
```

生成项目时，`renderTemplate()` 会把它们替换成真实值。

例如模板中：

```json
{
  "name": "{{projectName}}"
}
```

生成后会变成：

```json
{
  "name": "demo-service"
}
```

### 7. 递归复制目录

`copyTemplate()` 会读取模板目录下的所有文件和子目录：

- 如果是目录，就继续递归复制。
- 如果是文本文件，就读取内容并执行模板渲染。
- 如果是非文本文件，就直接复制。

这种方式适合脚手架项目，因为模板通常会包含多级目录结构。

### 8. 参数校验

`createProject()` 会先校验项目名和模板名：

- 项目名必须符合简化 npm 包名规则。
- 模板名必须存在于 `config.templates`。
- 目标目录存在时，默认不覆盖，除非用户传入 `--force`。

这样可以减少误操作，也能让错误提示更明确。

### 9. 职责分层

当前项目按职责拆分：

- `bin`：只做入口。
- `lib/core`：负责命令组装和命令执行。
- `lib/prompts`：负责用户交互。
- `lib/generator`：负责文件生成。
- `templates`：负责提供项目模板。
- `docs`：负责说明和知识沉淀。
- `test`：保留学习示例。

这种拆分方式可以让项目更容易维护，也方便后续继续扩展命令。

## 模板说明

### Express 模板

目录：

```text
templates/express
|-- package.json
`-- src
    |-- app.js                         # 组装 Express 应用和中间件
    |-- server.js                      # 服务启动入口，负责监听端口
    |-- config
    |   `-- index.js                   # 集中管理运行时配置
    |-- constant
    |   `-- httpStatus.js              # 常用 HTTP 状态码常量
    |-- controller
    |   `-- healthController.js        # HTTP 入参和响应处理
    |-- middleware
    |   |-- errorHandler.js            # 统一错误处理
    |   |-- notFoundHandler.js         # 404 兜底处理
    |   `-- requestLogger.js           # 请求日志中间件
    |-- router
    |   `-- index.js                   # 路由注册
    |-- service
    |   `-- healthService.js           # 业务逻辑层
    `-- utils
        `-- response.js                # 统一响应工具
```

特点：

- `app.js` 和 `server.js` 分离，便于后续测试和复用应用实例。
- 使用 `express.json()` 和 `express.urlencoded()` 解析常见请求体。
- 使用 `Router()` 集中维护接口路由。
- controller 层只处理 HTTP 语义，service 层承载业务逻辑。
- middleware 层提供请求日志、404 兜底和统一错误处理。
- utils 层提供统一响应结构，降低前后端联调成本。
- 健康检查接口为 `GET /api/health`。

### Koa 模板

目录：

```text
templates/koa
|-- package.json
`-- src
    |-- app.js
    |-- controller
    |   `-- healthController.js
    `-- router
        `-- index.js
```

特点：

- 使用 `new Koa()` 创建应用。
- 使用 `@koa/router` 管理路由。
- 通过 `ctx.body` 返回响应。

### Egg.js 模板

目录：

```text
templates/egg
|-- package.json
|-- app
|   |-- controller
|   |   `-- health.js
|   `-- router.js
`-- config
    |-- config.default.js
    `-- plugin.js
```

特点：

- 遵循 Egg.js 的目录约定。
- controller 继承 `egg.Controller`。
- 路由统一在 `app/router.js` 中声明。
- 默认健康检查接口为 `GET /api/health`。

## 乱码排查说明

本次补充中文说明前，已经检查过核心文件是否存在常见乱码残留，例如 UTF-8 被错误解码后出现的异常汉字片段，以及 `U+FFFD` 替换符。

当前源码和文档按 UTF-8 读取正常。如果后续在 Windows PowerShell 中看到中文显示异常，通常优先检查终端编码，而不是直接认为文件内容损坏。

可以尝试：

```powershell
chcp 65001
```

或者在编辑器中确认文件编码为 `UTF-8`。

## 后续建议

1. 给 `createProject()` 增加自动化测试。
2. 给模板增加 `README.md`，让生成后的项目也带说明。
3. 把 `test` 目录逐步改成真正的测试目录，学习示例可以迁移到 `examples`。
4. 增加远程模板能力，例如从 Git 仓库下载模板。
5. 增加更严格的 npm 包名校验，支持 scoped package，例如 `@scope/app`。

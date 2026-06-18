import { constants } from 'node:fs'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { config } from '../../config.js'

// ESM 中没有 CommonJS 的 __dirname，需要通过 import.meta.url 手动转换。
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
// projectRoot 指向当前 CLI 项目根目录，方便后续定位 templates 目录。
const projectRoot = path.resolve(__dirname, '../..')
const templatesRoot = path.resolve(projectRoot, 'templates')

// 没有扩展名但需要按文本处理的文件名。
const textFileNames = new Set(['.env', '.gitignore'])
// 这些扩展名的文件会读取为字符串，并执行占位符替换。
const textFileExtensions = new Set(['.js', '.json', '.md', '.txt', '.yml', '.yaml'])

/**
 * 根据模板创建项目。
 * @param {object} options 创建项目所需参数
 * @param {string} options.projectName 目标项目名称，同时会写入模板 package.json
 * @param {string} options.template 模板名称，必须存在于 config.templates
 * @param {boolean} [options.force=false] 是否允许覆盖已存在目录
 * @param {string} [options.cwd=process.cwd()] 生成项目的工作目录
 */
export const createProject = async ({ projectName, template, force = false, cwd = process.cwd() }) => {
  // 第一步：校验项目名，避免生成无效 npm 包名或危险路径。
  validateProjectName(projectName)
  // 第二步：校验模板名，避免访问不存在的模板目录。
  validateTemplate(template)

  // sourceDir 是模板来源目录，例如 templates/express。
  const sourceDir = path.resolve(templatesRoot, template)
  // targetDir 是最终生成目录，例如当前目录下的 demo-service。
  const targetDir = path.resolve(cwd, projectName)

  // 如果目标目录已经存在，默认中止；只有用户显式传入 --force 才覆盖。
  if (await pathExists(targetDir)) {
    if (!force) {
      throw new Error(`Target directory already exists: ${targetDir}. Use --force to overwrite it.`)
    }

    // force=true 时先删除旧目录，再重新生成，保证结果干净。
    await fs.rm(targetDir, { recursive: true, force: true })
  }

  // 递归复制模板目录，并在文本文件中替换 {{projectName}}、{{template}}。
  await copyTemplate(sourceDir, targetDir, {
    projectName,
    template
  })

  return {
    projectName,
    template,
    targetDir
  }
}

/**
 * 校验项目名。
 * 当前模板会把 projectName 写入 package.json 的 name 字段，所以这里按简化 npm 包名规则限制。
 */
const validateProjectName = (projectName) => {
  if (!projectName || !/^[a-z0-9][a-z0-9_-]*$/.test(projectName)) {
    throw new Error('Project name must start with a lowercase letter or number, and can only contain lowercase letters, numbers, underscore and hyphen.')
  }
}

/**
 * 校验模板名是否在配置列表中。
 */
const validateTemplate = (template) => {
  if (!config.templates.includes(template)) {
    throw new Error(`Unknown template "${template}". Available templates: ${config.templates.join(', ')}.`)
  }
}

/**
 * 判断路径是否存在。
 * fs.access 如果访问失败会抛错，所以这里用 try/catch 转成布尔值。
 */
const pathExists = async (targetPath) => {
  try {
    await fs.access(targetPath, constants.F_OK)
    return true
  } catch {
    return false
  }
}

/**
 * 递归复制模板目录。
 * 对目录继续递归，对文本文件做模板渲染，对其他文件直接复制。
 */
const copyTemplate = async (sourceDir, targetDir, context) => {
  // recursive=true 表示父目录不存在时也会一并创建。
  await fs.mkdir(targetDir, { recursive: true })
  // withFileTypes=true 可以拿到 Dirent，便于判断是文件还是目录。
  const entries = await fs.readdir(sourceDir, { withFileTypes: true })

  for (const entry of entries) {
    const sourcePath = path.resolve(sourceDir, entry.name)
    const targetPath = path.resolve(targetDir, entry.name)

    if (entry.isDirectory()) {
      // 子目录继续递归复制。
      await copyTemplate(sourcePath, targetPath, context)
      continue
    }

    if (isTextFile(entry.name)) {
      // 文本文件需要读取内容并替换模板变量。
      const content = await fs.readFile(sourcePath, 'utf8')
      await fs.writeFile(targetPath, renderTemplate(content, context))
      continue
    }

    // 非文本文件保持原样复制，避免破坏二进制内容。
    await fs.copyFile(sourcePath, targetPath)
  }
}

/**
 * 判断文件是否应该按文本处理。
 */
const isTextFile = (fileName) => {
  return textFileNames.has(fileName) || textFileExtensions.has(path.extname(fileName))
}

/**
 * 渲染模板内容。
 * 这里使用简单占位符替换，适合当前轻量脚手架。
 */
const renderTemplate = (content, context) => {
  return content
    .replaceAll('{{projectName}}', context.projectName)
    .replaceAll('{{template}}', context.template)
}

// 远程模板地址示例：后续如果扩展远程模板下载能力，可以从这里继续演进。
const templateSource = 'github:Siwanyi/download-test.git'

// 当前正式 CLI 使用本地 templates 目录，因此这里不再实际下载远程仓库。
console.log(`Remote template source example: ${templateSource}`)
console.log('The formal CLI currently generates projects from local templates.')

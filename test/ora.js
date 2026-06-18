import ora from 'ora'

// 创建并启动一个 loading，用于演示耗时任务的命令行反馈。
const spinner = ora('Downloading...').start()

// 2 秒后把 loading 状态切换为成功。
setTimeout(() => {
  spinner.succeed('Download completed')
}, 2000)

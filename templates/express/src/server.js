import { app } from './app.js'
import { config } from './config/index.js'

// server.js 是服务启动入口，专门负责监听端口。
app.listen(config.port, () => {
  console.log(`{{projectName}} is running at http://localhost:${config.port}`)
})
import http from 'node:http'

// 使用 Node.js 原生 http 模块创建一个最小 Web 服务。
const server = http.createServer((req, res) => {
  // 设置响应状态码和内容类型。
  res.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' })
  // 返回响应内容并结束本次请求。
  res.end('Hello from Node.js')
})

// 监听 3000 端口，服务启动后打印访问地址。
server.listen(3000, () => {
  console.log('Server running at: http://localhost:3000/')
})

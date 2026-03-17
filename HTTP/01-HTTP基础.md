# HTTP 基础

## HTTP 是什么

HTTP（HyperText Transfer Protocol，超文本传输协议）是用于在网络上传输超文本（HTML、图片、JSON...）的协议，浏览器和服务器之间通信用它。

## URL 结构

```
https://user:pass@example.com:80/path/to/page?name=zhangsan&age=18#fragment
|   |        |        |  |    |       |             |         |
|   |        |        |  端口  |    |       |             |         |
scheme://userinfo@host:port/path?query#fragment
```

- `scheme` - 协议：`http` / `https`
- `host` - 域名/IP
- `port` - 端口，http 默认 80，https 默认 443
- `path` - 路径
- `query` - 查询参数
- `fragment` - 锚点，跳转到页面某个位置

## HTTP 方法

常见方法：

| 方法 | 说明 |
|------|------|
| `GET` | 获取资源，读，请求参数放 URL |
| `POST` | 提交数据，请求参数放 body |
| `PUT` | 更新资源 |
| `DELETE` | 删除资源 |
| `HEAD` | 类似 GET，只返回响应头，不返回 body |
| `OPTIONS` | 获取跨域预检 |
| `PATCH` | 部分更新资源 |

### GET vs POST 区别

- GET 参数在 URL，长度有限制；POST 参数在 body，长度无限制
- GET 可以缓存，POST 默认不缓存
- GET 浏览器会退，POST 会重新提交
- GET 放 URL 容易泄露，POST 相对安全一点（抓包也能看到，不是加密）

## HTTP 状态码

分类：

| 分类 | 说明 |
|------|------|
| `1xx` | 信息，请求收到了，继续处理 |
| `2xx` | 成功 |
| `3xx` | 重定向，要跳转 |
| `4xx` | 客户端错误，请求语法错/找不到 |
| `5xx` | 服务器错误 |

常见状态码：

| 状态码 | 说明 |
|--------|------|
| `200 OK` | 请求成功 |
| `201 Created` | 创建成功，POST/PUT 返回 |
| `204 No Content` | 请求成功，没有内容返回 |
| `301 Moved Permanently` | 永久重定向 |
| `302 Found` | 临时重定向 |
| `304 Not Modified` | 资源没改，用缓存 |
| `400 Bad Request` | 请求参数错 |
| `401 Unauthorized` | 没登录需要认证 |
| `403 Forbidden` | 禁止访问 |
| `404 Not Found` | 找不到资源 |
| `405 Method Not Allowed` | 方法不允许 |
| `500 Internal Server Error` | 服务器错误 |
| `502 Bad Gateway` | 网关错误 |
| `503 Service Unavailable` | 服务不可用，服务器过载维护 |

## HTTP 报文结构

### 请求报文

```
请求行: GET /path HTTP/1.1
请求头:
Host: example.com
User-Agent: Mozilla/5.0
Content-Type: application/json
Cookie: xxx
(空行)
(body)
```

### 响应报文

```
状态行: HTTP/1.1 200 OK
响应头:
Content-Type: application/json
Content-Length: 123
Set-Cookie: xxx
Cache-Control: max-age=3600
(空行)
(body)
```

## GET/POST 报文区别：GET 没有 body，参数在 url，POST 一般参数放 body。

## HTTP 缓存

### 缓存分类

- **强制缓存**：直接用缓存不用发请求给服务器
- **协商缓存**：要发请求问服务器资源改了没，没改返回 304 用缓存

### 强制缓存响应头

```
Cache-Control: max-age=3600 # 缓存 1 小时
Cache-Control: no-cache # 不强制缓存，要协商缓存
Cache-Control: no-store # 不缓存
Expires: Wed, 16 Mar 2026 00:00:00 GMT # 旧写法，用 Cache-Control 代替
```

### 协商缓存响应头

```
Last-Modified: Wed, 08 Mar 2026 00:00:00 GMT
If-Modified-Since: Wed, 08 Mar 2026 00:00:00 GMT # 请求头带上

ETag: "abc123"
If-None-Match: "abc123" # 请求头带上
```

Etag 比 Last-Modified 好：
- Etag 可以验证更精确的修改
- Last-Modified 只能精确到秒

## HTTPS

HTTPS = HTTP + SSL/TLS，加密传输，更安全。

- 默认端口 443
- 握手过程：
  1. 浏览器发送客户端支持的加密套件
  2. 服务器返回证书，选中加密套件
  3. 浏览器验证证书，生成 premaster secret 发给服务器
  4  双方生成会话密钥，握手完成
  5. 之后用会话密钥加密通信

## HTTP/1.1 vs HTTP/2 vs HTTP/3

| HTTP/1.1 | 队头阻塞，一个连接同一时间只能处理一个请求 |
|------|------|
| HTTP/2 | 二进制分帧，多路复用，头部压缩，性能更好 |
| HTTP/3 | 基于 QUIC，UDP 实现，更快，队头阻塞解决更好 |

## Cookie / Session / Token

### Cookie

- 存储在浏览器，每次请求自动带上
- 有大小限制，4KB 左右
- 可以设置过期时间
- 缺点：跨域不能共享，CSRF 攻击

### Session

- 存在服务器，cookie 存 sessionId
- 服务器存用户数据，比 cookie 大
- 服务器集群需要共享 session

### JWT Token

- 存储在客户端，签名验证完整性
- 不用服务器存，扩展方便
- 可以跨域
- 缺点：token 长，每次请求都带，体积大

## 跨域 CORS

浏览器同源策略：协议+域名+端口都一样才同源，不同源就是跨域。

跨域解决：**CORS**

```
// 响应头
Access-Control-Allow-Origin: * // 允许所有
Access-Control-Allow-Origin: https://example.com // 允许指定域名
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type
Access-Control-Allow-Credentials: true // 允许带 cookie
```

预检请求：OPTIONS 方法先问服务器允许不允许，允许再发真实请求。

其他跨域方法：
- JSONP：只能 GET，不安全不推荐
- 代理：开发环境 webpack-dev-server / vite 配置代理，生产 Nginx 反向代理

## 缓存总结

1. 强制缓存：`Cache-Control: max-age=xxx` → 没过期直接用本地缓存
2. 过期了发请求给服务器 → 协商缓存
3. 服务器对比 Etag / Last-Modified → 没变返回 304 → 用缓存
4. 变了返回 200 带新资源 → 更新缓存

## 总结

- 请求方法 GET POST 区别
- 状态码常见要记住
- 缓存机制：强制缓存 + 协商缓存
- HTTPS 握手流程
- 跨域解决 CORS

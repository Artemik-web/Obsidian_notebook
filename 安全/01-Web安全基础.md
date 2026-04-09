x# Web 安全基础

## XSS 跨站脚本攻击 Cross-Site Scripting

### 什么是 XSS
攻击者往网页注入恶意脚本，用户访问页面时恶意脚本执行，偷取信息。

### XSS 分类

**1. 存储型 XSS**
- 恶意脚本存在服务器数据库（比如评论区、用户昵称）
- 其他用户访问就会执行
- 危害最大，持久化

**2. 反射型 XSS**
- 恶意脚本在 URL 参数里，后端把参数拼进页面返回
- 需要诱导用户点击链接才触发
- 非持久化

**3. DOM 型 XSS**
- 完全前端渲染，攻击不经过后端
- 通过修改页面 DOM 执行脚本

### 防御 XSS
- **输入过滤**：对用户输入进行转义，`<` 转成 `&lt;`，`>` 转成 `&gt;`
- **CSP 内容安全策略**：只允许加载指定域名脚本，禁止内联 JS，禁止 eval
- **HttpOnly Cookie**：Cookie 设置 HttpOnly，防止 JS 读取，偷取 Cookie
- 不要把用户输入直接放innerHTML，用 textContent
- 对于富文本输入，过滤危险标签（`<script>`、`onclick` 等）

## CSRF 跨站请求伪造 Cross-Site Request Forgery

### 什么是 CSRF
攻击者利用用户登录态，偷偷冒用用户身份发起请求。

例子：
- 用户登录了银行网站 `bank.com`
- 用户访问攻击者网站 `evil.com`
- evil.com 里面有个隐藏表单自动提交到 `bank.com/transfer`
- 浏览器会自动带上 bank.com 的 Cookie
- 请求成功执行，钱转走了

### 防御 CSRF

**1. Token 验证**
- 服务器生成随机 Token 存在 Session 或返回给前端
- 前端请求放在参数或 header 里
- 后端验证 Token 对不对，不对拒绝
- CSRF 拿不到 Token，所以无法攻击

**2. Referer 验证**
- 后端验证 Referer 请求头是不是本站域名
- 问题：Referer 可以被篡改，某些情况下不发送

**3. SameSite Cookie**
- Cookie 设置 `SameSite=Strict` / `Lax`
- 跨站请求不携带 Cookie
- 现在主流浏览器都支持

**4. 验证码**
- 重要操作（转账、改密码）要求输入验证码
- 防止自动请求

## SQL 注入

### 什么是 SQL 注入
攻击者把 SQL 代码拼接到用户输入，执行恶意 SQL。

例子：
```sql
-- 正常查询
SELECT * FROM users WHERE id = 1

-- 注入攻击
SELECT * FROM users WHERE id = ' OR 1=1 -- '
```
这样就能查出所有用户。

### 防御
- **参数化查询（预编译）**：用 prepared statement，不要拼接字符串
- ORM 框架一般默认参数化，不要自己拼 SQL
- 输入过滤，特殊字符转义
- 最小权限原则，数据库用户不要给太高权限

## 文件上传漏洞

### 原理
上传可执行脚本（php、jsp 等）到服务器，访问执行脚本获取权限。

### 防御
- 文件后缀校验，只允许图片后缀（jpg/png/gif）
- MIME 校验，检查 Content-Type
- 文件重命名，保存时改随机名字，不要用原名
- 存到非 web 可访问目录，或者存在 CDN
- 限制文件大小

## CSP 内容安全策略

通过响应头配置允许加载哪些资源，防止 XSS 和注入：

```
Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted-cdn.com; img-src *; style-src 'self' 'unsafe-inline';
```

常用指令：
- `default-src`：默认策略
- `script-src`：允许加载的脚本
- `style-src`：允许加载的样式
- `img-src`：允许加载的图片
- `connect-src`：允许 ajax/fetch 连接

## HTTPS 为什么安全
HTTPS = HTTP + SSL/TLS，传输加密，防窃听防篡改防冒充。
- 对称加密 + 非对称加密结合，握手交换对称密钥
- 数字证书验证服务器身份
- 传输内容加密，中间人拿到密文也解不开

## CORS 跨域会被 CSRF 攻击吗
会的，CORS 默认可以带 Cookie，后端没防御还是会被攻击。

## 点击劫持 Click Jacking
攻击者用透明 iframe 覆盖按钮，用户点击实际点了攻击者按钮。

防御：
```
X-Frame-Options: DENY  # 禁止被iframe嵌入
Content-Security-Policy: frame-ancestors 'none';
```

## 常见安全头
```
X-Frame-Options: DENY  # 禁止iframe嵌入
X-Content-Type-Options: nosniff  # 禁止MIME类型嗅探
X-XSS-Protection: 1; mode=block  # 旧浏览器开启XSS防护
Content-Security-Policy: ...  # CSP
Strict-Transport-Security: max-age=31536000; includeSubDomains  # HSTS 强制HTTPS
```

---

## 相关笔记

- ../HTTP/[[01-HTTP基础]]
- ../浏览器/[[01-浏览器原理]]

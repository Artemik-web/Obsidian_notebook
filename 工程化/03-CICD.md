# CI/CD 持续集成与部署

## 什么是 CI/CD

- **CI (Continuous Integration) 持续集成**：开发者每次推送代码都自动进行构建、测试，早点发现问题
- **CD (Continuous Delivery/Deployment) 持续交付/部署**：代码合并到主分支后，自动构建测试部署到生产环境

## 流程

```
开发 → 提交 → Push → CI (安装依赖 → 构建 → 测试) → 测试通过 → CD → 部署到服务器
```

## GitHub Actions

### 基本概念

- **Workflow**：工作流，一个 `.yml` 文件就是一个 workflow，放在 `.github/workflows/`
- **Event**：触发事件，比如 push、pull_request、定时任务
- **Job**：任务，一个或多个 job 并行/顺序执行
- **Step**：步骤，每个 job 分多个步骤执行
- **Action**：别人封装好的步骤，可以直接用

### 例子：部署 React/Vue 项目到 GitHub Pages

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install

      - name: Build
        run: pnpm build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### 例子：PR 自动测试

```yaml
name: Test

on: [pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm test
      - run: pnpm lint
```

### 环境变量与 Secrets

- GitHub Repository → Settings → Secrets and variables → Actions → New repository secret
- 代码里用 `${{ secrets.XXX }}` 访问，不会泄露

## GitLab CI

类似 GitHub Actions，配置文件 `.gitlab-ci.yml`

```yaml
image: node:20

cache:
  paths:
    - .pnpm-store/

stages:
  - lint
  - test
  - build
  - deploy

lint:
  stage: lint
  script:
    - pnpm install
    - pnpm lint

test:
  stage: test
  script:
    - pnpm test

build:
  stage: build
  script:
    - pnpm build
  artifacts:
    paths:
      - dist/

deploy_prod:
  stage: deploy
  script:
    - 部署脚本...
  only:
    - main
```

## Jenkins

老牌自托管 CI/CD，需要自己搭服务器，配置复杂但灵活。适合公司内部项目。

## 多环境部署

常见环境：

- **开发环境**：开发自测，用最新代码
- **测试环境**：测试同学测功能
- **预发布环境**：和生产配置一样，正式上线前再测一遍
- **生产环境**：用户用的

环境变量区分：
```bash
# .env.development
VITE_API_URL=http://dev-api.example.com

# .env.production
VITE_API_URL=https://api.example.com
```

构建命令：
```bash
# 开发环境
vite build --mode development

# 生产环境
vite build --mode production
```

## 灰度发布

先给一部分用户上新版本，没问题再全量推。方法：

- 按用户百分比分流量
- 按地域分
- 按用户分（内部先更）
- Kubernetes 滚动升级

## 回滚

新版本出问题，切回旧版本：

- 容器部署：切流量到上一个版本镜像
- 静态站点：CDN 切回上一个版本的产物

## 好处

- 减少人工操作出错
- 早点发现 bug（测试自动跑）
- 更快交付功能
- 开发者不用关心部署，专注写代码

## 相关链接
- [[01-ViteWebpack基础]]
- [[04-部署运维]]

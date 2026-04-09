# Monorepo 项目架构

## 什么是 Monorepo

**Monorepo** = 一个仓库放多个包/项目，这些包可以互相依赖。

对比 **Multirepo** = 每个包一个仓库。

## Monorepo 优点

- 代码共享方便，一个包改了另一个直接用
- 跨包重构方便，一次性改完
- 统一的工具配置，不用每个仓库配一遍
- 一次提交能改多个包，方便追踪

## 什么时候用

- 公司内部多个项目共享组件库/工具函数
- 大型项目拆成多个包解耦
- 开源库多个包一起维护

## 工具选择

| 工具 | 特点 |
|------|------|
| **pnpm Workspace** | 原生支持，简单够用 |
| **Nx** | 强大，支持缓存、任务依赖、受影响包构建测试，中大型项目推荐 |
| **Turborepo** | Vercel 出的，快，配置简单 |

## pnpm Workspace 基本配置

### `pnpm-workspace.yaml`

```yaml
packages:
  # packages 目录下所有包
  - 'packages/*'
  # apps 目录下所有应用
  - 'apps/*'
  # 排除
  - 'packages/**/test'
```

### 项目结构例子

```
project/
├── pnpm-workspace.yaml
├── package.json        # 根目录配置
├── packages/
│   ├── ui-components/  # 共享组件库
│   ├── utils/          # 工具函数
│   └── hooks/          # 自定义 Hooks
└── apps/
    ├── admin/          # 后台管理应用
    └── web/           # 官网应用
```

### 包之间互相依赖

给 app 加 ui-components 依赖：
```json
// apps/web/package.json
{
  "dependencies": {
    "@my-org/ui-components": "workspace:*"
  }
}
```

`workspace:*` 表示直接用 workspace 里的源码，不用发 npm。

## Nx

### 特点

- **计算缓存**：之前跑过的任务缓存下来，第二次跑超快
- **受影响范围检测**：只构建测试改了的包，不用全跑
- **插件生态**：对 React/Vue/Node 支持好
- **强大的 CLI**：生成代码，跑任务

### 初始化

```bash
npx create-nx-workspace@latest
```

### 常用命令

```bash
# 看项目依赖图
npx nx graph

# 只构建改了的
npx nx affected:build

# 只测试改了的
npx nx affected:test
```

## Turborepo

### 特点

- Vercel 出的，现代，快
- 配置简单
- 远程缓存
- 和 pnpm/yarn 一起用

### `turbo.json` 配置例子

```json
{
  "$schema": "https://turborepo.org/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "test": {
      "dependsOn": ["^build"],
      "outputs": []
    },
    "lint": {
      "outputs": []
    },
    "dev": {
      "cache": false
    }
  }
}
```

### 根目录 package.json scripts

```json
{
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev",
    "test": "turbo run test",
    "lint": "turbo run lint"
  }
}
```

## changesets 版本发布

多个包管理版本变更，生成变更日志，发 npm。

### 基本使用

```bash
# 安装
pnpm add -D @changesets/cli

# 初始化
npx changeset init

# 提了代码后，生成变更集
npx changeset

# 根据变更集更新版本号
npx changeset version

# 发包到 npm
npx changeset publish
```

### 流程

1. PR 合并前，作者跑 `changeset` 写变更说明
2. CI 版本发布时，自动更新版本号，生成 CHANGELOG
3. 自动发布新版本到 npm

## 常见问题

### Monorepo 仓库会不会越来越大
- 还好，现在硬盘大，git 优化也不错
- 真正不用的代码可以删掉，历史放 git 不影响

### 多个包版本怎么管理
- 独立版本：每个包版本自己更，changesets 做这个
- 统一版本：所有包一个版本号，适合整个一起发的组件库

## 优缺点总结

| 优点 | 缺点 |
|------|------|
| 代码共享方便 | 权限控制不如多仓库 |
| 跨包重构容易 | 对工具要求高一点 |
| 一次性提交多个包修改 | 仓库变大，克隆慢一点（可以浅克隆） |
| 统一配置一致 | |

## 相关链接
- [[02-依赖管理]]
- [[组件库建设]]

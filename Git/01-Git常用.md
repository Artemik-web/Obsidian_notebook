# Git 常用命令

## 基础配置

```bash
# 配置用户名
git config --global user.name "Your Name"
git config --global user.email "email@example.com"

# 查看配置
git config --list

# 生成 SSH key
ssh-keygen -t ed25519 -C "your_email@example.com"
# 然后把公钥放到 GitHub/GitLab
```

## 基础操作

```bash
# 克隆仓库
git clone git@github.com:username/repo.git

# 查看状态
git status

# 添加文件到暂存区
git add file.js
git add . # 所有文件

# 提交
git commit -m "commit message: 新增xxx功能"

# 提交所有已经tracked的文件
git commit -a -m "message"

# 查看提交历史
git log
git log --oneline # 简洁一行显示
git log --graph --oneline # 图形化显示分支

# 回退版本
git reset --hard commit-id # 回退到指定commit，清空工作区改动
git reset --soft commit-id # 保留改动，放进暂存区
```

## 分支操作

```bash
# 查看分支
git branch

# 创建分支
git branch feature/login

# 切换分支
git checkout feature/login

# 创建+切换
git checkout -b feature/login

# 合并分支 → 现在在master，合并feature/login
git merge feature/login

# 删除分支
git branch -d feature/login

# 远程分支删除
git push origin --delete feature/login

# 重命名分支
git branch -m old-name new-name
```

## 远程操作

```bash
# 查看远程
git remote -v

# 添加远程
git remote add origin git@github.com:username/repo.git

# 推送
git push origin branch-name

# 推远程并关联
git push -u origin branch-name

# 拉取最新
git pull origin branch-name

#  fetch + merge = pull
git fetch origin
git merge origin/branch-name

# 克隆之后拉取所有分支
git fetch --all
```

## 撤销操作

```bash
# 撤销工作区修改
git checkout -- file.js

# 撤销暂存区
git reset HEAD file.js

# 修改最后一次提交
git commit --amend -m "new message"
```

## 变基 rebase

```bash
# 把 feature/login 变基到 master
git checkout feature/login
git rebase master

# 解决冲突后
git add .
git rebase --continue

# 取消变基
git rebase --abort
```

**rebase vs merge**：
- merge 保留完整提交历史，不会改变原有提交
- rebase 把提交线性排列，历史更干净
- 原则：本地分支用 rebase，公共分支不要用 rebase

## 贮藏 stash

```bash
# 贮藏当前改动，工作区干净
git stash

# 查看贮藏
git stash list

# 恢复最近一个贮藏
git stash pop

# 删除贮藏
git stash drop stash@{0}

# 清空所有贮藏
git stash clear
```

场景：切分支前改了一半不想提交，先贮藏起来。

## 标签 tag

```bash
# 打标签
git tag v1.0.0
git tag -a v1.0.0 -m "version 1.0.0"

# 查看标签
git tag

# 推送标签到远程
git push origin v1.0.0
git push origin --tags # 推送所有标签

# 删除标签
git tag -d v1.0.0
git push origin :v1.0.0
```

## 协作流程

### 主分支规则推荐

- `main` / `master` → 主分支，存放生产代码
- `develop` → 开发分支，集成所有功能
- `feature/xxx` → 功能分支，开发新功能
- `hotfix/xxx` → 修复线上bug

### 开发流程

```bash
# 从 develop 拉功能分支
git checkout -b feature/xxx develop

# 开发提交...
# 开发完提 PR/MR
# 代码 review 没问题合并到 develop
```

### 修复线上 bug

```bash
git checkout main
git checkout -b hotfix/xxx
# 修复...提交...
# 合并到 main 和 develop 打标签
```

## .gitignore 示例

```
# .gitignore
node_modules
dist
*.log
.DS_Store
.env
.env.local
*.swp
*.sublime-project
*.sublime-workspace
.vscode
.idea
*.iml
```

## 常用规范

### 提交信息格式

```
<type>(<scope>): <subject>

<body>
```

type 类型：
- `feat` 新功能
- `fix` 修复bug
- `docs` 文档修改
- `style` 格式修改不影响代码
- `refactor` 重构
- `perf` 性能优化
- `test` 测试
- `chore` 构建/工具相关

例子：
```
feat(login): 增加手机验证码登录
```

## 实用技巧

### 查看文件修改历史

```bash
git blame file.js
```

### 找哪个commit引入了bug

```bash
git bisect bad
git bisect good commit-id
# 二分查找自动找
```

### 储藏部分文件

```bash
git stash push -m "message" path/to/file
```

## 总结

- 协作流程清晰：分支分工明确，PR code review 合并
- 提交信息规范，方便查找
- 善用 stash 保存临时改动
- rebase 保持历史干净

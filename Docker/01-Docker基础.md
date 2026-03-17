# Docker 基础

## Docker 是什么
- 容器化技术，把应用和依赖打包到一个可移植的容器里，一次打包到处运行
- 解决"我本地跑的好好的，你那怎么不行"的问题
- 比虚拟机轻量，启动快，资源占用少

**镜像 vs 容器：**
- 镜像：只读模板，相当于类，比如 nginx 镜像、node 镜像
- 容器：镜像运行出来的实例，每个容器互相隔离

## 基本概念

- **镜像 Image**：应用模板，只读，包含运行环境和代码
- **容器 Container**：镜像运行实例，可读写，每个容器隔离
- **仓库 Registry**：存放镜像的地方，Docker Hub 是公共仓库
- **Dockerfile**：文本文件，定义怎么构建镜像
- **Docker Compose**：多容器编排，一键启动多个容器

## 常用命令

### 镜像命令
```bash
# 拉取镜像
docker pull nginx:alpine

# 查看本地镜像
docker images

# 删除镜像
docker rmi nginx:alpine

# 构建镜像，注意最后有个点
docker build -t my-image:v1 .

# 查看镜像信息
docker inspect image-id
```

### 容器命令
```bash
# 运行容器
docker run -p 8080:80 --name my-nginx -d nginx

# 参数说明：
# -p 端口映射 宿主端口:容器端口
# --name 给容器起名字
# -d 后台运行
# -v 挂载数据卷 宿主目录:容器目录
# -e 设置环境变量

# 查看运行中容器
docker ps

# 查看所有容器（包括停止）
docker ps -a

# 启动停止容器
docker start container-id
docker stop container-id
docker restart container-id

# 删除容器
docker rm container-id

# 强制删除运行中容器
docker rm -f container-id

# 查看容器日志
docker logs container-id
docker logs -f container-id # 实时看日志

# 进入容器
docker exec -it container-id /bin/bash

# 查看容器端口映射
docker port container-id
```

### 数据卷命令
```bash
# 创建数据卷
docker volume create my-data

# 查看数据卷
docker volume ls

# 删除数据卷
docker volume rm my-data
```

## Dockerfile 编写

示例：Node.js 项目 Dockerfile
```dockerfile
# 基础镜像
FROM node:18-alpine

# 工作目录
WORKDIR /app

# 复制 package.json
COPY package*.json ./

# 安装依赖
RUN npm install --production

# 复制所有代码
COPY . .

# 暴露端口
EXPOSE 3000

# 启动命令
CMD ["node", "index.js"]
```

常用指令：
- `FROM`：基础镜像，必须第一个
- `WORKDIR`：工作目录，自动创建，后面指令都在这执行
- `COPY`：复制文件到镜像
- `ADD`：和COPY类似，还可以自动解压压缩包，一般用COPY就行
- `RUN`：构建镜像时执行命令（安装依赖之类）
- `CMD`：容器启动时执行命令，只能有一个
- `ENTRYPOINT`：容器入口，和CMD类似，一般配合用
- `EXPOSE`：声明暴露端口，文档作用，实际还要-p映射
- `ENV`：设置环境变量
- `ARG`：构建时参数

## Docker Compose

多个容器一起编排，比如项目需要 web + mysql + redis，用 compose 一键启动。

`docker-compose.yml` 示例：
```yaml
version: '3'

services:
  # web 服务
  web:
    build: . # 当前目录构建
    ports:
      - "3000:3000"
    environment:
      DB_HOST: db
      REDIS_HOST: redis
    depends_on:
      - db
      - redis

  # mysql 服务
  db:
    image: mysql:8.0
    ports:
      - "3306:3306"
    environment:
      MYSQL_ROOT_PASSWORD: 123456
      MYSQL_DATABASE: mydb
    volumes:
      - mysql-data:/var/lib/mysql # 数据持久化

  # redis 服务
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  mysql-data: # 声明数据卷
```

常用命令：
```bash
# 启动所有服务，-d 后台
docker-compose up -d

# 查看状态
docker-compose ps

# 查看日志
docker-compose logs -f

# 停止所有
docker-compose down

# 停止并删除数据卷（小心数据没了）
docker-compose down -v

# 重新构建
docker-compose build
```

## Docker 镜像仓库

- **Docker Hub**：官方公共仓库，国外速度慢
- **阿里云容器镜像服务**、**腾讯云容器镜像**：国内加速
- 私有仓库：自己建 `docker registry`

## 镜像瘦身技巧

- 用 alpine 版本基础镜像，体积小很多
- 多阶段构建：构建阶段装依赖打包，最后只复制产物到运行阶段
```dockerfile
# 构建阶段
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 运行阶段，只用 nginx，体积很小
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```
- 不要把不必要文件放进镜像，用 `.dockerignore` 排除 `node_modules`、`.git` 等

## Docker 和虚拟机区别

| | Docker | 虚拟机 |
|---|--------|--------|
| 内核 | 共享宿主机内核 | 自己完整内核 |
| 大小 | 镜像一般 MB 级 | 镜像 GB 级 |
| 启动速度 | 秒级甚至毫秒 | 分钟级 |
| 性能 | 几乎和原生一样 | 有性能损耗 |
| 隔离 | 进程级别隔离 | 完全硬件隔离 |

## 常见使用场景

- 本地开发：项目需要 mysql/redis，一句 `docker run` 就起来，不用自己装
- 持续集成 CI：构建镜像，测试，部署一致环境
- 部署：不管你是测试生产，容器一致，部署快
- 微服务：每个服务独立容器，扩缩容方便

## 常用镜像示例

### Nginx
```bash
docker run -p 80:80 -v /my/html:/usr/share/nginx/html -d nginx
```

### MySQL
```bash
docker run -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 -d mysql:8.0
```

### Redis
```bash
docker run -p 6379:6379 -d redis
```

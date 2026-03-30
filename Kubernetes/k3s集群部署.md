# k3s 集群部署教程

k3s 是 Rancher Labs 推出的轻量级 Kubernetes 发行版，非常适合边缘计算、物联网、开发测试环境等场景。本文记录如何从零搭建一个 k3s 集群。

## 环境准备

### 硬件要求

| 角色   | CPU | 内存  |
| ------ | --- | ----- |
| Master | 2核  | 2GB+  |
| Worker | 1核  | 1GB+  |

### 操作系统

推荐使用 Ubuntu 20.04+/CentOS 7+/Debian 9+，本文以 Ubuntu 22.04 为例。

### 节点规划

示例环境：

| 主机名    | IP 地址        | 角色       |
| --------- | -------------- | ---------- |
| k3s-master| 192.168.1.100 | Master 节点 |
| k3s-worker1| 192.168.1.101 | Worker 节点 |
| k3s-worker2| 192.168.1.102 | Worker 节点 |

### 前置配置（所有节点）

1. **设置主机名**（每个节点分别设置）

```bash
# 在 master 节点执行
sudo hostnamectl set-hostname k3s-master

# 在 worker1 节点执行
sudo hostnamectl set-hostname k3s-worker1

# 在 worker2 节点执行
sudo hostnamectl set-hostname k3s-worker2
```

2. **配置 hosts**（所有节点）

```bash
sudo cat >> /etc/hosts << EOF
192.168.1.100 k3s-master
192.168.1.101 k3s-worker1
192.168.1.102 k3s-worker2
EOF
```

3. **关闭防火墙**（测试环境，生产环境请按需开放端口）

```bash
# Ubuntu/Debian
sudo ufw disable

# CentOS
sudo systemctl stop firewalld
sudo systemctl disable firewalld
```

4. **关闭 swap**（Kubernetes 要求）

```bash
sudo swapoff -a
sudo sed -i '/ swap / s/^\(.*\)$/#\1/g' /etc/fstab
```

5. **加载内核模块**

```bash
sudo modprobe br_netfilter
sudo modprobe ip_tables

sudo cat >> /etc/modules-load.d/k8s.conf << EOF
br_netfilter
ip_tables
EOF
```

6. **配置 sysctl**

```bash
sudo cat >> /etc/sysctl.d/k8s.conf << EOF
net.bridge.bridge-nf-call-iptables  = 1
net.bridge.bridge-nf-call-ip6tables = 1
net.ipv4.ip_forward                 = 1
EOF

sudo sysctl -p /etc/sysctl.d/k8s.conf
```

7. **安装依赖**

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install -y curl wget

# CentOS/RHEL
sudo yum install -y curl wget
```

## 部署 Master 节点

在 **master 节点**执行以下命令：

### 一键安装

```bash
curl -sfL https://get.k3s.io | sh -
```

默认会安装：
- containerd 作为容器运行时
- 启用 traefik Ingress Controller
- 启用内置网络策略
- 安装本地存储 provisioner
- 安装 metrics-server

### 自定义安装（可选）

如果你想自定义配置，可以使用环境变量：

```bash
# 禁用 traefik（如果计划使用自己的 Ingress Controller）
curl -sfL https://get.k3s.io | INSTALL_K3S_EXEC="--disable traefik" sh -

# 指定镜像仓库（国内用户可使用国内镜像）
curl -sfL https://get.k3s.io | K3S_MIRROR=https://mirror.aliyun.com/k3s sh -

# 指定版本
curl -sfL https://get.k3s.io | INSTALL_K3S_VERSION=v1.28.2+k3s1 sh -

# 自定义 HTTP 代理
curl -sfL https://get.k3s.io | http_proxy=http://proxy:port https_proxy=http://proxy:port sh -
```

### 查看节点状态

安装完成后，查看节点状态：

```bash
sudo kubectl get nodes
```

预期输出：

```
NAME          STATUS   ROLES                  AGE     VERSION
k3s-master    Ready    control-plane,master   2m      v1.28.2+k3s1
```

### 获取节点 token

获取加入集群的 token，后面 worker 节点加入需要用到：

```bash
sudo cat /var/lib/rancher/k3s/server/node-token
```

复制输出的 token，保存备用。

## 部署 Worker 节点

在 **每个 worker 节点**执行以下命令：

```bash
# 替换为你的 master 节点 IP 和刚才获取的 token
curl -sfL https://get.k3s.io | K3S_URL=https://192.168.1.100:6443 K3S_TOKEN=你的token这里 sh -
```

参数说明：
- `K3S_URL`: master 节点的 URL，端口默认是 6443
- `K3S_TOKEN`: 从 master 节点获取的 node-token

### 验证集群状态

在 **master 节点**执行：

```bash
sudo kubectl get nodes
```

预期输出：

```
NAME           STATUS   ROLES                  AGE     VERSION
k3s-master     Ready    control-plane,master   10m     v1.28.2+k3s1
k3s-worker1    Ready    worker                 2m      v1.28.2+k3s1
k3s-worker2    Ready    worker                 1m      v1.28.2+k3s1
```

所有节点 STATUS 都是 `Ready` 说明加入成功。

查看所有 pods：

```bash
sudo kubectl get pods -A
```

所有 pods 都应该是 Running 状态。

## 配置 kubectl（本地访问）

如果你想在本地机器用 kubectl 管理集群，需要复制 kubeconfig 文件：

```bash
# 从服务器复制到本地
scp ubuntu@192.168.1.100:/etc/rancher/k3s/k3s.yaml ~/.kube/k3s-config

# 修改配置文件中的 server 地址
# 将 https://127.0.0.1:6443 改为 https://192.168.1.100:6443
vim ~/.kube/k3s-config

# 指定配置文件使用
export KUBECONFIG=~/.kube/k3s-config
kubectl get nodes
```

也可以合并到当前的 kubeconfig 中。

## 常用配置

### 配置 MetalLB 负载均衡器

k3s 默认没有提供 LoadBalancer 类型服务的实现，MetalLB 可以提供这个功能。

1. **安装 MetalLB**

```bash
kubectl apply -f https://raw.githubusercontent.com/metallb/metallb/v0.13.12/config/manifests/metallb-factory.yaml
```

2. **配置 IP 地址池**

创建 `metallb-config.yaml`:

```yaml
apiVersion: metallb.io/v1beta1
kind: IPAddressPool
metadata:
  name: first-pool
  namespace: metallb-system
spec:
  addresses:
  - 192.168.1.200-192.168.1.250 # 改成你的可用 IP 范围
---
apiVersion: metallb.io/v1beta1
kind: L2Advertisement
metadata:
  name: default
  namespace: metallb-system
```

应用配置：

```bash
kubectl apply -f metallb-config.yaml
```

### 配置 Ingress NGINX

如果你不想用默认的 traefik，可以安装 ingress-nginx：

先禁用 traefik（安装 master 时就需要禁用）：

```bash
# 重新安装 master 时加上
curl -sfL https://get.k3s.io | INSTALL_K3S_EXEC="--disable traefik" sh -
```

安装 ingress-nginx：

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.2/deploy/static/provider/cloud/deploy.yaml
```

### 安装 Rancher（可选）

Rancher 是一个可视化的集群管理工具：

```bash
helm repo add rancher-latest https://releases.rancher.com/server-charts/latest
helm repo update

kubectl create namespace cattle-system

helm install rancher rancher-latest/rancher \
  --namespace cattle-system \
  --set hostname=rancher.example.com \
  --set replicas=1
```

## 国内镜像加速

对于国内用户，建议配置镜像加速，提升拉取镜像速度。

### 配置 containerd 镜像加速器

在 master 和所有 worker 节点上：

创建 `/etc/rancher/k3s/registries.yaml`:

```yaml
mirrors:
  "docker.io":
    endpoint:
      - "https://你的加速器地址.mirror.aliyuncs.com"
      - "https://hub-mirror.c.163.com"
```

你可以使用阿里云、七牛云等提供的 docker 镜像加速服务。

重启 k3s 服务：

```bash
# master 节点
sudo systemctl restart k3s

# worker 节点
sudo systemctl restart k3s-agent
```

## 常用操作

### 重启服务

```bash
# master
sudo systemctl restart k3s

# worker
sudo systemctl restart k3s-agent
```

### 查看日志

```bash
# master
journalctl -u k3s -f

# worker
journalctl -u k3s-agent -f
```

### 卸载集群

```bash
# master
/usr/local/bin/k3s-uninstall.sh

# worker
/usr/local/bin/k3s-agent-uninstall.sh
```

## 常见问题

### 1. 节点加入失败

检查：
- master 节点 6443 端口是否开放
- token 是否正确
- 网络是否连通，能否 ping 通 master
- `/var/lib/rancher/k3s/` 目录是否干净，如果之前安装过需要先卸载干净

### 2. 镜像拉取失败

检查：
- 是否配置了镜像加速器
- 网络是否能访问 gcr.io 等镜像仓库
- 可以使用 `crictl images` 查看已有镜像

### 3. 节点 NotReady

检查：
- swap 是否关闭
- k3s-agent 服务是否运行
- 查看日志 `journalctl -u k3s-agent -f`

## 参考链接

- [k3s 官方文档](https://docs.k3s.io/)
- [k3s GitHub](https://github.com/k3s-io/k3s)
- [MetalLB 文档](https://metallb.universe.tf/)

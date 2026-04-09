---
title: "Windows下cmd快速到达指定文件位置(三种方法总结)_cmd怎么转到指定文件夹-CSDN博客"
source: "https://blog.csdn.net/qq_43827595/article/details/99713696"
author:
  - "[[成就一亿技术人!]]"
  - "[[hope_wisdom 发出的红包]]"
published:
created: 2026-04-09
description: "文章浏览阅读9.7w次，点赞80次，收藏226次。本文介绍三种快速定位至特定文件夹的方法，包括通过cmd命令行、powershell及直接在文件夹路径中调用cmd。适用于需要频繁切换文件夹的用户，提升工作效率。"
tags:
  - "clippings"
---
### 前言

其实不用cmd一步一步进行，是可以一秒钟快速到达指定文件位置的  
绝对的厉害，快速到达指定文件夹位置

---

### 三种方法如下：

**法一:传统方法**

使用Windows 命令提示符（cmd）进入指定位置

第一步： windows + R,调出运行,输入 CMD 或者 如图操作，找到 命令 提示符。如需管理员操作，右键管理员。

![](https://i-blog.csdnimg.cn/blog_migrate/903c0092c6a53915119e6311412b83f3.png)

第二步： 先进盘 比如d盘，输入 d: （注意英文 输入法 ），再进文件夹 cd /文件路径。如图所示：

![](https://i-blog.csdnimg.cn/blog_migrate/76ba7782074ff9626405d34a9007f5d5.png)

**附cmd常见命令操作：**  
例如想进入D盘 d:

- cd 进入到当前盘某个目录。
- cd \\ 进入当前盘根目录
- cd \\windows 进入到当前盘Windows目录
- cd… 退出到上一级目录
- 进入含有特殊字符目录时需要加引号 如 cd “c:\\program files”

**法二：快速方法**

在文件所在位置 使用快捷键 ctrl+shift+右键 选择 打开 powershell窗口

![](https://i-blog.csdnimg.cn/blog_migrate/009f8da94fc9b35f96cb8bd86719ab76.png)

**法三：超快方法，在所要去的文件夹(一秒到达,强烈推荐!!!)**

![](https://i-blog.csdnimg.cn/blog_migrate/b48469189097642fdcc22a365a9acdc8.png)

在文件夹内按Ctrl + L(选中路径),在路径上输入cmd,立刻出现命令窗口且为当前路径

![](https://i-blog.csdnimg.cn/blog_migrate/dae65506fe0a28f8382b47aefb757979.png)
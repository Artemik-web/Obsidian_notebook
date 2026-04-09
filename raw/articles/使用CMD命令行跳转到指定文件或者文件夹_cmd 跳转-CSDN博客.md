---
title: "使用CMD命令行跳转到指定文件或者文件夹_cmd 跳转-CSDN博客"
source: "https://blog.csdn.net/qq_44108083/article/details/106162610?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_baidulandingword~default-0-106162610-blog-99713696.235^v43^pc_blog_bottom_relevance_base2&spm=1001.2101.3001.4242.1&utm_relevant_index=2"
author:
  - "[[成就一亿技术人!]]"
  - "[[hope_wisdom 发出的红包]]"
published:
created: 2026-04-09
description: "文章浏览阅读4.4w次，点赞17次，收藏43次。使用CMD命令行跳转到指定文件或者文件夹如果是在C盘，则直接可以在命令行中输入cd 文件或者文件夹的位置。例如：我想要跳转到桌面上的某个文件或者文件夹，则进入命令行之后可以直接输入cd C:\Users\Administrator\Desktop\newFile  (跳转到桌面上的newFile文件夹) 【这是绝对路径】cd Desktop\newFile  (跳转到桌面上的newFile文件夹) 【这是相对路径】如果不是在c盘，1、可以先跳转到相应的盘符，在进行与C盘类似的操作。例如：我想要跳转_cmd 跳转"
tags:
  - "clippings"
---
### 使用CMD命令行跳转到指定文件或者文件夹

如果是在C盘，则直接可以在命令行中输入cd 文件或者文件夹的位置。例如：我想要跳转到桌面上的某个文件或者文件夹，则进入命令行之后可以直接输入

cd C:\\Users\\Administrator\\Desktop\\newFile (跳转到桌面上的newFile文件夹) 【这是绝对路径】

cd Desktop\\newFile (跳转到桌面上的newFile文件夹) 【这是相对路径】

如果不是在c盘，

1、可以先跳转到相应的盘符，在进行与C盘 类 似的操作。例如：我想要跳转到I盘下的Data文件夹下的app文件夹，

则应该进入命令行之后输入cd E:![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/e1a1565373eced8fadaa70cd482abaea.png) ，  
此时，会进入到E盘内，再继续输入cd C:\\Windows(跳转到I盘的Data文件夹)【这是绝对路径】  
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/befa5da33a0f520ea042685b82f7b1c9.png)  
或者cd Desktop (跳转到C盘的Desktop文件夹)【这是相对路径】  
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/2609906ee34db9881c2905cfb7ab3e48.png)

2、可以先进行与C盘类似的操作，再跳转到相应的盘符。例如：我想要跳转到F盘下的Data文件夹

先输入 cd F:\\Data (此时在命令行中显示还是在c盘中)

然后再输入F: (此时，就会跳转到I盘的Data文件夹)
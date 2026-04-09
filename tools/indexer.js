#!/usr/bin/env node
/**
 * 知识库索引生成器
 * 用于扫描 wiki/ 目录并更新索引
 */

const fs = require('fs');
const path = require('path');

const CONFIG = {
  wikiRoot: '.',
  indexFile: '.llm-kb/index.json',
  topics: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Vue', 'React', 'HTTP', '浏览器', '安全', '工程化', 'Git', 'Node.js', 'Docker', 'Linux', '算法', '设计模式', '移动端', '微前端'],
};

function readMarkdownFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (err) {
    console.error(`Error reading file ${filePath}:`, err);
    return '';
  }
}

function extractFrontmatter(content) {
  const frontmatterMatch = content.match(/^---\s*([\s\S]*?)\s*---/);
  if (!frontmatterMatch) {
    return null;
  }

  try {
    const frontmatter = frontmatterMatch[1];
    const data = {};
    frontmatter.split('\n').forEach(line => {
      const match = line.match(/^\s*(\w+)\s*:\s*(.*?)\s*$/);
      if (match) {
        data[match[1]] = match[2];
      }
    });
    return data;
  } catch (err) {
    console.error('Error parsing frontmatter:', err);
    return null;
  }
}

function extractWikiLinks(content) {
  const wikiLinks = [];
  const regex = /\[\[([^\]]+)\]\]/g;
  let match;

  while ((match = regex.exec(content)) !== null) {
    wikiLinks.push(match[1]);
  }

  return [...new Set(wikiLinks)]; // 去重
}

function extractTags(content) {
  const tags = [];
  const regex = /#([\w-]+)/g;
  let match;

  while ((match = regex.exec(content)) !== null) {
    tags.push(match[1]);
  }

  return [...new Set(tags)];
}

function generateDocumentId(title, topic) {
  return `${topic.toLowerCase().replace(/\s+/g, '-')}-${title.toLowerCase().replace(/\s+/g, '-').substring(0, 20)}`;
}

function indexWiki() {
  console.log('🔍 扫描知识库...');

  const documents = [];

  CONFIG.topics.forEach(topic => {
    const topicPath = path.join(CONFIG.wikiRoot, topic);

    if (!fs.existsSync(topicPath)) {
      console.warn(`⚠️  主题目录不存在: ${topic}`);
      return;
    }

    const files = fs.readdirSync(topicPath);

    files.forEach(file => {
      if (path.extname(file) === '.md') {
        const filePath = path.join(topicPath, file);
        const content = readMarkdownFile(filePath);
        const title = file.replace(/^\d+-/, '').replace('.md', '');

        const document = {
          id: generateDocumentId(title, topic),
          title,
          path: path.relative(CONFIG.wikiRoot, filePath),
          topic,
          wordCount: content.length,
          lastUpdated: fs.statSync(filePath).mtime.toISOString().split('T')[0],
          summary: extractSummary(content),
          tags: extractTags(content),
          backlinks: extractWikiLinks(content),
        };

        documents.push(document);
        console.log(`✅ 索引: ${filePath}`);
      }
    });
  });

  // 处理根目录的文件
  const rootFiles = fs.readdirSync(CONFIG.wikiRoot);
  rootFiles.forEach(file => {
    if (path.extname(file) === '.md' && !CONFIG.topics.includes(file.replace('.md', ''))) {
      const filePath = path.join(CONFIG.wikiRoot, file);
      const content = readMarkdownFile(filePath);
      const title = file.replace('.md', '');

      const document = {
        id: generateDocumentId(title, '其他'),
        title,
        path: file,
        topic: '其他',
        wordCount: content.length,
        lastUpdated: fs.statSync(filePath).mtime.toISOString().split('T')[0],
        summary: extractSummary(content),
        tags: extractTags(content),
        backlinks: extractWikiLinks(content),
      };

      documents.push(document);
      console.log(`✅ 索引: ${filePath}`);
    }
  });

  const index = {
    metadata: {
      title: '前端开发知识体系',
      version: '1.0.0',
      lastUpdated: new Date().toISOString().split('T')[0],
      totalDocuments: documents.length,
      totalWords: documents.reduce((sum, doc) => sum + doc.wordCount, 0),
    },
    documents,
  };

  try {
    fs.writeFileSync(CONFIG.indexFile, JSON.stringify(index, null, 2));
    console.log(`\n✅ 索引完成! 共 ${documents.length} 篇文档`);
  } catch (err) {
    console.error('❌ 写入索引文件失败:', err);
  }

  return index;
}

function extractSummary(content) {
  // 简单的摘要提取：取第一个段落
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('#')) continue; // 跳过标题
    if (lines[i].trim() && !lines[i].startsWith('---')) {
      return lines[i].trim().substring(0, 100) + '...';
    }
  }
  return '无摘要';
}

// 主程序
if (require.main === module) {
  console.log('🔧 启动索引生成器...');

  try {
    const index = indexWiki();

    // 更新配置
    const configFile = '.llm-kb/config.json';
    if (fs.existsSync(configFile)) {
      const config = JSON.parse(fs.readFileSync(configFile, 'utf8'));
      config.stats = {
        totalNotes: index.metadata.totalDocuments,
        totalWords: index.metadata.totalWords,
        lastIndexed: index.metadata.lastUpdated,
      };
      fs.writeFileSync(configFile, JSON.stringify(config, null, 2));
    }

  } catch (err) {
    console.error('❌ 索引过程出错:', err);
    process.exit(1);
  }
}

module.exports = { indexWiki };

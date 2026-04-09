#!/usr/bin/env node
/**
 * 文档摘要生成器
 * 用于生成文档的摘要和概览
 */

const fs = require('fs');
const path = require('path');
const { loadIndex } = require('./search');

const CONFIG = {
  outputDir: 'outputs/summaries',
  wikiRoot: '.',
};

function readMarkdownFile(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function extractHeaders(content) {
  const headers = [];
  const lines = content.split('\n');

  lines.forEach(line => {
    const match = line.match(/^(#+)\s*(.*)$/);
    if (match) {
      headers.push({
        level: match[1].length,
        text: match[2].trim(),
      });
    }
  });

  return headers;
}

function extractCodeBlocks(content) {
  const blocks = [];
  const codeRegex = /```([a-zA-Z]*)\s*([\s\S]*?)```/g;
  let match;

  while ((match = codeRegex.exec(content)) !== null) {
    blocks.push({
      language: match[1] || 'text',
      content: match[2].trim(),
    });
  }

  return blocks;
}

function extractKeyConcepts(content) {
  const lines = content.split('\n');
  const concepts = [];

  // 简单的关键词提取
  const keyPhrases = [
    '响应式', '组件', '状态', 'props', 'emit', 'v-model', 'computed',
    'watch', '生命周期', '路由', 'Pinia', 'Vuex', 'Composition API',
    'Options API', 'React', 'Hooks', 'Redux', 'Context', 'TypeScript',
    'DOM', '事件', '异步', 'Promise', 'async/await', 'Webpack', 'Vite',
    '模块', '包管理', 'npm', 'yarn', 'pnpm', 'Git', 'Docker', 'Kubernetes',
    '设计模式', '架构', '性能优化', '打包', '部署', 'CI/CD', 'CDN',
    'HTTP', '网络', '浏览器', '缓存', '安全', 'XSS', 'CSRF', '数据库',
    'API', 'REST', 'GraphQL', '服务器', 'Node.js', 'Express', 'Koa',
    'Nuxt.js', 'Next.js', '单页应用', 'SSR', 'SSG', 'JAMStack',
  ];

  // 统计出现次数
  const conceptCounts = {};
  keyPhrases.forEach(phrase => {
    const regex = new RegExp(`\\b${phrase}\\b`, 'g');
    const matches = content.match(regex);
    if (matches) {
      conceptCounts[phrase] = matches.length;
    }
  });

  // 排序并返回前 10 个
  return Object.keys(conceptCounts)
    .map(key => ({ concept: key, count: conceptCounts[key] }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
}

function generateDocumentSummary(doc) {
  const content = readMarkdownFile(path.join(CONFIG.wikiRoot, doc.path));

  const summary = {
    title: doc.title,
    topic: doc.topic,
    path: doc.path,
    wordCount: doc.wordCount,
    lastUpdated: doc.lastUpdated,
    tags: doc.tags,
    headers: extractHeaders(content),
    codeBlocks: extractCodeBlocks(content),
    keyConcepts: extractKeyConcepts(content),
    summary: doc.summary,
  };

  return summary;
}

function formatMarkdown(summary) {
  let md = `# ${summary.title}\n\n`;

  md += `## 主题\n${summary.topic}\n\n`;

  if (summary.summary) {
    md += `## 摘要\n${summary.summary}\n\n`;
  }

  if (summary.headers.length > 0) {
    md += '## 目录\n';
    summary.headers.forEach(header => {
      const indent = '  '.repeat(header.level - 1);
      md += `${indent}- ${header.text}\n`;
    });
    md += '\n';
  }

  if (summary.keyConcepts.length > 0) {
    md += '## 核心概念\n';
    summary.keyConcepts.forEach(item => {
      md += `- ${item.concept}（出现 ${item.count} 次）\n`;
    });
    md += '\n';
  }

  if (summary.codeBlocks.length > 0) {
    md += `## 代码示例（${summary.codeBlocks.length} 个）\n`;
    summary.codeBlocks.forEach(block => {
      const firstLines = block.content.split('\n').slice(0, 5).join('\n');
      const hasMore = block.content.split('\n').length > 5;
      md += `\`\`\`${block.language}\n${firstLines}${hasMore ? '\n...' : ''}\n\`\`\`\n\n`;
    });
  }

  md += `## 元信息\n`;
  md += `- 字数: ${summary.wordCount}\n`;
  md += `- 最后更新: ${summary.lastUpdated}\n`;
  if (summary.tags.length > 0) {
    md += `- 标签: ${summary.tags.map(t => '#' + t).join(' ')}\n`;
  }

  return md;
}

function generateSummaryForTopic(topic, documents) {
  const topicDocs = documents.filter(doc => doc.topic === topic);
  if (topicDocs.length === 0) {
    console.log(`❌ 没有找到主题 "${topic}" 的文档`);
    return null;
  }

  const summary = {
    topic,
    documentCount: topicDocs.length,
    totalWords: topicDocs.reduce((sum, doc) => sum + doc.wordCount, 0),
    documents: topicDocs.map(doc => ({
      id: doc.id,
      title: doc.title,
      path: doc.path,
      wordCount: doc.wordCount,
      tags: doc.tags,
    })),
    keyConcepts: extractKeyConceptsForTopic(topicDocs),
  };

  return summary;
}

function extractKeyConceptsForTopic(documents) {
  const allConcepts = {};
  const wikiRoot = CONFIG.wikiRoot;

  documents.forEach(doc => {
    const content = readMarkdownFile(path.join(wikiRoot, doc.path));
    const concepts = extractKeyConcepts(content);
    concepts.forEach(item => {
      if (!allConcepts[item.concept]) {
        allConcepts[item.concept] = 0;
      }
      allConcepts[item.concept] += item.count;
    });
  });

  return Object.keys(allConcepts)
    .map(key => ({ concept: key, count: allConcepts[key] }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 20);
}

function saveSummary(outputPath, content) {
  fs.writeFileSync(outputPath, content);
  console.log(`✅ 保存到: ${outputPath}`);
}

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
📚 文档摘要生成器

用法:
  node tools/summary-generator.js <文档路径>     # 生成单个文档的摘要
  node tools/summary-generator.js --topic <主题> # 生成整个主题的摘要
  node tools/summary-generator.js --all          # 生成所有文档的摘要

示例:
  node tools/summary-generator.js Vue\\01-Vue3基础.md
  node tools/summary-generator.js --topic Vue
  node tools/summary-generator.js --all
`);
    process.exit(0);
  }

  const index = loadIndex();

  if (args[0] === '--topic') {
    const topic = args[1];
    const summary = generateSummaryForTopic(topic, index.documents);
    if (summary) {
      const outputPath = path.join(CONFIG.outputDir, `topic-summary-${topic.toLowerCase().replace(/\s+/g, '-')}.md`);
      saveSummary(outputPath, formatTopicSummary(summary));
    }
  } else if (args[0] === '--all') {
    // 生成所有文档的摘要
    index.documents.forEach(doc => {
      const summary = generateDocumentSummary(doc);
      const outputPath = path.join(CONFIG.outputDir, `${doc.id}-summary.md`);
      saveSummary(outputPath, formatMarkdown(summary));
    });
  } else {
    const docPath = args[0];
    const doc = index.documents.find(d => d.path === docPath);
    if (!doc) {
      console.error(`❌ 找不到文档: ${docPath}`);
      process.exit(1);
    }

    const summary = generateDocumentSummary(doc);
    const outputPath = path.join(CONFIG.outputDir, `${doc.id}-summary.md`);
    saveSummary(outputPath, formatMarkdown(summary));
  }
}

function formatTopicSummary(summary) {
  let md = `# ${summary.topic} 主题摘要\n\n`;

  md += `## 统计信息\n`;
  md += `- 文档数量: ${summary.documentCount}\n`;
  md += `- 总字数: ${summary.totalWords.toLocaleString()}\n`;
  md += `- 平均字数: ${Math.round(summary.totalWords / summary.documentCount)}\n\n`;

  md += `## 文档列表\n`;
  summary.documents.forEach(doc => {
    md += `- [[${doc.path}]] (${doc.wordCount} 字)\n`;
  });
  md += '\n';

  md += `## 核心概念\n`;
  summary.keyConcepts.forEach(item => {
    md += `- ${item.concept} (${item.count} 次出现)\n`;
  });

  return md;
}

if (require.main === module) {
  main();
}

module.exports = {
  generateDocumentSummary,
  generateSummaryForTopic,
  extractHeaders,
  extractCodeBlocks,
  extractKeyConcepts,
};

#!/usr/bin/env node
/**
 * 知识库搜索工具
 * 用于在知识库中搜索内容
 */

const fs = require('fs');
const path = require('path');

const CONFIG = {
  indexFile: '.llm-kb/index.json',
  wikiRoot: '.',
};

function loadIndex() {
  if (!fs.existsSync(CONFIG.indexFile)) {
    console.error('❌ 索引文件不存在，请先运行 indexer.js');
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(CONFIG.indexFile, 'utf8'));
}

function searchDocuments(query, documents) {
  const searchTerms = query.toLowerCase().split(/\s+/);

  const results = documents.map(doc => {
    let score = 0;
    let matches = [];

    // 标题匹配
    if (searchTerms.some(term => doc.title.toLowerCase().includes(term))) {
      score += 10;
      matches.push('标题');
    }

    // 路径匹配
    if (searchTerms.some(term => doc.path.toLowerCase().includes(term))) {
      score += 5;
      matches.push('路径');
    }

    // 主题匹配
    if (searchTerms.some(term => doc.topic.toLowerCase().includes(term))) {
      score += 7;
      matches.push('主题');
    }

    // 摘要匹配
    if (doc.summary && searchTerms.some(term => doc.summary.toLowerCase().includes(term))) {
      score += 6;
      matches.push('摘要');
    }

    // 标签匹配
    if (doc.tags && doc.tags.some(tag => searchTerms.some(term => tag.toLowerCase().includes(term)))) {
      score += 8;
      matches.push('标签');
    }

    // 反向链接匹配
    if (doc.backlinks && doc.backlinks.some(link => searchTerms.some(term => link.toLowerCase().includes(term)))) {
      score += 3;
      matches.push('链接');
    }

    return {
      ...doc,
      score,
      matches,
    };
  });

  return results
    .filter(doc => doc.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
}

function readDocumentContent(docPath) {
  const fullPath = path.join(CONFIG.wikiRoot, docPath);
  if (fs.existsSync(fullPath)) {
    return fs.readFileSync(fullPath, 'utf8');
  }
  return '';
}

function formatResults(results) {
  if (results.length === 0) {
    return '没有找到匹配的结果';
  }

  let output = `\n📚 找到 ${results.length} 个匹配结果:\n\n`;

  results.forEach((result, index) => {
    const scoreStars = '⭐'.repeat(Math.min(result.score / 3, 5));
    output += `${index + 1}. **${result.title}** ${scoreStars}\n`;
    output += `   📁 主题: ${result.topic}\n`;
    output += `   📄 路径: ${result.path}\n`;
    if (result.summary) {
      output += `   💡 摘要: ${result.summary}\n`;
    }
    if (result.matches.length > 0) {
      output += `   🔍 匹配: ${result.matches.join(', ')}\n`;
    }
    if (result.tags && result.tags.length > 0) {
      output += `   🏷️ 标签: ${result.tags.map(t => '#' + t).join(' ')}\n`;
    }
    output += '\n';
  });

  return output;
}

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
🔍 知识库搜索工具

用法:
  node tools/search.js "搜索关键词"

示例:
  node tools/search.js "Vue3 响应式"
  node tools/search.js "JavaScript 异步编程"
  node tools/search.js "React Hooks"
`);
    process.exit(0);
  }

  const query = args.join(' ');
  console.log(`\n🔍 搜索: "${query}"`);

  try {
    const index = loadIndex();
    const results = searchDocuments(query, index.documents);
    console.log(formatResults(results));

    if (results.length > 0) {
      console.log('\n💡 提示: 使用索引查看完整内容');
    }

  } catch (err) {
    console.error('❌ 搜索失败:', err);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { searchDocuments, loadIndex };

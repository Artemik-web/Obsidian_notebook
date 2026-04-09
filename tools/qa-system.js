#!/usr/bin/env node
/**
 * 知识库问答系统
 * 使用 LLM 回答关于知识库的问题
 */

const fs = require('fs');
const path = require('path');
const { searchDocuments, loadIndex } = require('./search');

const CONFIG = {
  indexFile: '.llm-kb/index.json',
  outputDir: 'outputs/answers',
};

function saveAnswer(question, answer, references) {
  const date = new Date();
  const timestamp = date.toISOString().split('T')[0];
  const fileName = `answer-${timestamp}-${question.substring(0, 30).replace(/\W+/g, '-')}.md`;
  const outputPath = path.join(CONFIG.outputDir, fileName);

  const content = `# ${question}

## 回答

${answer}

## 引用的文档

${references.map(r => `- [[${r.path}]]`).join('\n')}

## 相关问题

${generateRelatedQuestions(question)}

---
生成时间: ${date.toLocaleString('zh-CN')}
`;

  fs.writeFileSync(outputPath, content);
  return outputPath;
}

function generateRelatedQuestions(question) {
  return [
    "这个主题有哪些最佳实践？",
    "如何实现这个功能？",
    "有哪些常见的问题和解决方案？",
    "与其他相关技术的对比？",
    "这个领域的最新发展是什么？",
  ].map(q => `- ${q}`).join('\n');
}

function generateAnswer(question, results) {
  let answer = `基于知识库内容，我找到以下关于 "${question}" 的信息：\n\n`;

  if (results.length === 0) {
    answer += "知识库中没有找到直接相关的信息。建议你：\n\n";
    answer += "- 使用搜索工具查找类似主题\n";
    answer += "- 在 raw/ 目录中添加相关的原始资料\n";
    answer += "- 考虑使用 LLM 补充这个主题的内容\n";
    return answer;
  }

  results.forEach((result, index) => {
    answer += `### ${index + 1}. ${result.title}\n\n`;
    answer += `${result.summary}\n\n`;
    answer += `**主题**: ${result.topic}\n`;
    answer += `**位置**: [[${result.path}]]\n\n`;

    if (result.tags && result.tags.length > 0) {
      answer += `**相关标签**: ${result.tags.map(t => `#${t}`).join(' ')}\n\n`;
    }

    if (index < results.length - 1) {
      answer += "\n---\n\n";
    }
  });

  answer += "\n## 总结\n\n";
  answer += `知识库包含 ${results.length} 篇关于 "${question}" 的文档。你可以根据需要进一步详细阅读这些文档。`;

  return answer;
}

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
🤖 知识库问答系统

用法:
  node tools/qa-system.js "你的问题"

示例:
  node tools/qa-system.js "Vue3 响应式系统原理"
  node tools/qa-system.js "JavaScript 异步编程方法"
  node tools/qa-system.js "CSS 布局最佳实践"
`);
    process.exit(0);
  }

  const question = args.join(' ');
  console.log(`🤔 问题: "${question}"`);

  try {
    const index = loadIndex();
    const searchResults = searchDocuments(question, index.documents);

    console.log(`🔍 找到 ${searchResults.length} 个相关文档`);

    const answer = generateAnswer(question, searchResults);
    const outputPath = saveAnswer(question, answer, searchResults);

    console.log(`✅ 答案已生成: ${outputPath}`);

  } catch (err) {
    console.error('❌ 问答失败:', err);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { generateAnswer, saveAnswer };

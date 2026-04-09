#!/usr/bin/env node
/**
 * 知识库健康检查工具
 * 用于检查知识库的完整性和一致性
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

function checkFilesExist(documents) {
  const missingFiles = [];

  documents.forEach(doc => {
    const fullPath = path.join(CONFIG.wikiRoot, doc.path);
    if (!fs.existsSync(fullPath)) {
      missingFiles.push(doc);
    }
  });

  return missingFiles;
}

function checkBacklinks(documents) {
  const issues = [];
  const allTitles = new Set(documents.map(d => d.title));
  const allPaths = new Set(documents.map(d => path.basename(d.path, '.md')));

  documents.forEach(doc => {
    if (doc.backlinks) {
      doc.backlinks.forEach(link => {
        // 检查链接的文档是否存在
        const linkExists = allTitles.has(link) || allPaths.has(link);
        if (!linkExists) {
          issues.push({
            document: doc.title,
            link,
            type: 'broken_link',
            message: `链接到不存在的文档: ${link}`,
          });
        }
      });
    }
  });

  return issues;
}

function checkWordCount(documents) {
  const shortDocs = documents.filter(d => d.wordCount < 500);
  const longDocs = documents.filter(d => d.wordCount > 5000);

  return {
    short: shortDocs,
    long: longDocs,
  };
}

function checkOrphanedDocuments(documents) {
  const allBacklinks = new Set();
  documents.forEach(doc => {
    if (doc.backlinks) {
      doc.backlinks.forEach(link => allBacklinks.add(link));
    }
  });

  const orphaned = documents.filter(doc => {
    const title = doc.title;
    const baseName = path.basename(doc.path, '.md');
    return !allBacklinks.has(title) && !allBacklinks.has(baseName);
  });

  return orphaned;
}

function analyzeTopics(documents) {
  const topicStats = {};
  documents.forEach(doc => {
    const topic = doc.topic || '未分类';
    if (!topicStats[topic]) {
      topicStats[topic] = {
        count: 0,
        totalWords: 0,
      };
    }
    topicStats[topic].count++;
    topicStats[topic].totalWords += doc.wordCount;
  });

  return topicStats;
}

function formatReport(report) {
  let output = `
🔍 知识库健康检查报告
═══════════════════════════════════
📅 检查时间: ${new Date().toLocaleString('zh-CN')}

`;

  // 总体统计
  output += `📊 总体统计
──────
- 文档总数: ${report.totalDocuments}
- 总字数: ${report.totalWords.toLocaleString()}

`;

  // 主题分布
  output += `🗂️ 主题分布
──────
`;
  Object.entries(report.topicStats).forEach(([topic, stats]) => {
    const avgWords = Math.round(stats.totalWords / stats.count);
    output += `  - ${topic}: ${stats.count} 篇, 平均 ${avgWords} 字\n`;
  });

  // 缺失文件
  output += `\n❌ 缺失文件
──────
`;
  if (report.missingFiles.length === 0) {
    output += '  ✅ 所有索引文件都存在\n';
  } else {
    report.missingFiles.forEach(doc => {
      output += `  ❌ ${doc.path}\n`;
    });
  }

  // 断开的链接
  output += `\n🔗 链接检查
──────
`;
  if (report.brokenLinks.length === 0) {
    output += '  ✅ 所有链接都是有效的\n';
  } else {
    report.brokenLinks.forEach(issue => {
      output += `  ❌ "${issue.document}" 中链接到不存在的文档: "${issue.link}"\n`;
    });
  }

  // 孤立项
  output += `\n🏝️ 孤立文档（无其他文档链接到它）
──────
`;
  if (report.orphaned.length === 0) {
    output += '  ✅ 无孤立文档\n';
  } else {
    report.orphaned.slice(0, 10).forEach(doc => {
      output += `  • ${doc.title} (${doc.topic})\n`;
    });
    if (report.orphaned.length > 10) {
      output += `  ... 还有 ${report.orphaned.length - 10} 篇\n`;
    }
  }

  // 简短文档
  output += `\n📝 简短文档 (< 500 字)
──────
`;
  if (report.wordCount.short.length === 0) {
    output += '  ✅ 无超短文档\n';
  } else {
    report.wordCount.short.slice(0, 10).forEach(doc => {
      output += `  • ${doc.title} (${doc.wordCount} 字)\n`;
    });
    if (report.wordCount.short.length > 10) {
      output += `  ... 还有 ${report.wordCount.short.length - 10} 篇\n`;
    }
  }

  // 改进建议
  output += `\n💡 改进建议
──────
`;
  const suggestions = [];
  if (report.brokenLinks.length > 0) {
    suggestions.push(`- 修复 ${report.brokenLinks.length} 个断开的链接`);
  }
  if (report.orphaned.length > 0) {
    suggestions.push(`- 考虑将 ${report.orphaned.length} 篇孤立文档与其他文档建立关联`);
  }
  if (report.missingFiles.length > 0) {
    suggestions.push(`- 恢复或移除 ${report.missingFiles.length} 个缺失文件的索引`);
  }
  if (suggestions.length === 0) {
    suggestions.push('✅ 知识库状态良好！');
  }
  suggestions.forEach(s => output += `  ${s}\n`);

  return output;
}

function main() {
  console.log('🔍 开始知识库健康检查...\n');

  try {
    const index = loadIndex();
    const documents = index.documents;

    const report = {
      totalDocuments: documents.length,
      totalWords: documents.reduce((sum, d) => sum + d.wordCount, 0),
      missingFiles: checkFilesExist(documents),
      brokenLinks: checkBacklinks(documents),
      wordCount: checkWordCount(documents),
      orphaned: checkOrphanedDocuments(documents),
      topicStats: analyzeTopics(documents),
    };

    console.log(formatReport(report));

  } catch (err) {
    console.error('❌ 健康检查失败:', err);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  checkFilesExist,
  checkBacklinks,
  checkWordCount,
  checkOrphanedDocuments,
  analyzeTopics,
};

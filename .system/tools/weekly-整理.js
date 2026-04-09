#!/usr/bin/env node
/**
 * 每周整理脚本
 * 用于自动化整理 raw/ 目录的内容
 */

const fs = require('fs');
const path = require('path');

const CONFIG = {
  rawDir: 'raw',
  articlesDir: 'raw/articles',
  archiveDir: 'raw/archive',
};

console.log('📋 每周整理脚本\n');

// 检查目录
if (!fs.existsSync(CONFIG.rawDir)) {
  console.log('❌ raw/ 目录不存在');
  process.exit(1);
}

if (!fs.existsSync(CONFIG.articlesDir)) {
  console.log('❌ raw/articles/ 目录不存在');
  process.exit(1);
}

// 确保 archive 目录存在
if (!fs.existsSync(CONFIG.archiveDir)) {
  fs.mkdirSync(CONFIG.archiveDir);
  console.log('📂 创建归档目录');
}

// 读取 raw/articles/ 中的内容
const files = fs.readdirSync(CONFIG.articlesDir);

console.log(`📊 发现 ${files.length} 个文件需要检查：`);

const stats = {
  newFiles: 0,
  movedToArchive: 0,
  keptInArticles: 0,
};

files.forEach(file => {
  if (file === '.gitkeep' || file === 'README.md') return;

  const filePath = path.join(CONFIG.articlesDir, file);
  const stat = fs.statSync(filePath);
  const size = stat.size;
  const modifyDate = stat.mtime;

  console.log(`  - ${file} (${size} 字, ${formatDate(modifyDate)})`);

  // 统计
  if (isNewFile(modifyDate)) {
    stats.newFiles++;
  }
});

// 建议的整理动作
console.log('\n📋 整理建议：');
console.log('  1. 浏览 raw/articles/ 中的内容');
console.log('  2. 决定哪些要整理');
console.log('  3. 运行 LLM 编译器');
console.log('  4. 更新索引');
console.log('  5. 运行健康检查');

// 打印统计
console.log(`\n📊 统计：`);
console.log(`  - 新文件：${stats.newFiles} 个`);
console.log(`  - 可整理：${files.length - 1} 个`);
console.log(`  - 上次整理：${getLastIndexDate()}`);

// 整理后的操作
console.log('\n🔧 下一步操作：');
console.log(`  npm run index          # 更新索引`);
console.log(`  npm run health-check   # 健康检查`);

// 辅助函数
function formatDate(date) {
  const days = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
  if (days === 0) return '今天';
  if (days === 1) return '昨天';
  if (days < 7) return `${days} 天前`;
  return date.toISOString().split('T')[0];
}

function isNewFile(modifyDate) {
  return (Date.now() - modifyDate.getTime()) < 7 * 24 * 60 * 60 * 1000;
}

function getLastIndexDate() {
  const indexFile = '.llm-kb/index.json';
  if (fs.existsSync(indexFile)) {
    const index = JSON.parse(fs.readFileSync(indexFile, 'utf8'));
    return index.metadata.lastUpdated || '未知';
  }
  return '无';
}

// 如果有命令行参数，执行相应操作
const args = process.argv.slice(2);

if (args.includes('--archive')) {
  console.log('\n📦 归档操作');
  const archiveFiles = files.filter(file => isNewFile(fs.statSync(path.join(CONFIG.articlesDir, file)).mtime));
  archiveFiles.forEach(file => {
    if (file === '.gitkeep' || file === 'README.md') return;
    const src = path.join(CONFIG.articlesDir, file);
    const dest = path.join(CONFIG.archiveDir, file);
    fs.renameSync(src, dest);
    console.log(`  ✅ 归档：${file}`);
    stats.movedToArchive++;
  });
}

if (args.includes('--update')) {
  console.log('\n🔄 更新索引');
  const { spawnSync } = require('child_process');
  const result = spawnSync('node', ['tools/indexer.js']);
  if (result.status === 0) {
    console.log('✅ 索引更新完成');
  } else {
    console.error('❌ 索引更新失败');
  }
}

if (args.includes('--check')) {
  console.log('\n🔍 健康检查');
  const { spawnSync } = require('child_process');
  const result = spawnSync('node', ['tools/health-check.js']);
  if (result.status === 0) {
    console.log('✅ 健康检查完成');
  } else {
    console.error('❌ 健康检查失败');
  }
}

if (args.length === 0) {
  console.log(`\n💡 使用说明：
  node tools/weekly-整理.js              # 显示报告
  node tools/weekly-整理.js --archive     # 归档旧文件
  node tools/weekly-整理.js --update      # 更新索引
  node tools/weekly-整理.js --check       # 健康检查
  node tools/weekly-整理.js --help        # 显示帮助`);
}

console.log('\n🎉 整理完成！');

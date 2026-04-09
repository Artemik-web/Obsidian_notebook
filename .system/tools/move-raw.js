#!/usr/bin/env node
/**
 * 把 .system/raw/ 复制到 root/raw/
 */

const fs = require('fs');
const path = require('path');

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const items = fs.readdirSync(src);

  items.forEach(item => {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);

    const stat = fs.statSync(srcPath);

    if (stat.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

console.log('📋 复制 raw 文件夹...');

try {
  copyDir('.system/raw', 'raw');
  console.log('✅ raw 文件夹已复制到根目录');
  console.log('   路径：raw/');
} catch (err) {
  console.error('❌ 复制失败:', err);
  process.exit(1);
}

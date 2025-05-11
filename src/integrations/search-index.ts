import fs from 'fs';
import path from 'path';
import type { AstroIntegration } from 'astro';

export default function createSearchIndexIntegration(): AstroIntegration {
  return {
    name: 'search-index-integration',
    hooks: {
      // 在构建完成后生成搜索数据
      'astro:build:done': async ({ dir }) => {
        try {
          // 确保我们有一个可用的dir对象
          const outDir = dir.pathname || dir.toString();
          
          // 创建一个空的搜索数据文件（因为我们只能在API端点中生成真实数据）
          const searchDataPath = path.join(outDir, 'search-data.json');
          fs.writeFileSync(searchDataPath, JSON.stringify([]));
          
          console.log('✅ 为生产环境创建了空的搜索数据文件');
        } catch (error) {
          console.error('❌ 生成搜索索引时出错:', error);
        }
      }
    }
  };
} 
import fs from 'fs';
import path from 'path';
import type { AstroIntegration } from 'astro';
import { getCollection } from 'astro:content';

export default function createSearchIndexIntegration(): AstroIntegration {
  return {
    name: 'search-index-integration',
    hooks: {
      // 在构建完成后生成搜索数据
      'astro:build:done': async ({ dir }) => {
        try {
          // 确保我们有一个可用的dir对象
          const outDir = dir.pathname || dir.toString();
          
          // 获取所有博客和笔记内容
          const blogEntries = await getCollection('blog');
          const notesEntries = await getCollection('notes');
          
          // 合并内容
          const allEntries = [...blogEntries, ...notesEntries];
          
          // 转换为搜索数据格式
          const searchData = allEntries.map(entry => {
            const { id, collection, data, body } = entry;
            const url = `/${collection}/${id.replace(/\.[^/.]+$/, '')}`;  // 移除扩展名
            
            return {
              id,
              title: data.title,
              description: data.description || '',
              url,
              category: data.category || '',
              tags: data.tags || [],
              content: body.substring(0, 5000), // 限制内容长度，避免索引过大
              date: data.date ? new Date(data.date).toISOString() : null
            };
          });
          
          // 创建搜索数据文件
          const searchDataPath = path.join(outDir, 'search-data.json');
          fs.writeFileSync(searchDataPath, JSON.stringify(searchData));
          
          console.log('✅ 成功生成搜索数据文件，包含', searchData.length, '条记录');
        } catch (error) {
          console.error('❌ 生成搜索索引时出错:', error);
        }
      }
    }
  };
} 
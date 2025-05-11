import fs from 'fs';
import path from 'path';
import { getCollection } from 'astro:content';

export async function generateSearchData() {
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
  
  return searchData;
}

// 用于构建时生成JSON数据文件
export async function generateSearchDataFile() {
  const searchData = await generateSearchData();
  const outputDir = path.join(process.cwd(), 'dist');
  
  // 确保输出目录存在
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // 写入JSON文件
  fs.writeFileSync(
    path.join(outputDir, 'search-data.json'),
    JSON.stringify(searchData)
  );
  
  console.log('搜索数据已生成到：', path.join(outputDir, 'search-data.json'));
} 
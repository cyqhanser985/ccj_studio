import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  try {
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
    
    return new Response(
      JSON.stringify(searchData),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=3600' // 缓存1小时
        }
      }
    );
  } catch (error) {
    console.error('生成搜索数据时出错:', error);
    return new Response(
      JSON.stringify({ error: '生成搜索数据失败' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
} 
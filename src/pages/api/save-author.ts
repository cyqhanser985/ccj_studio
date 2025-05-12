import type { APIRoute } from 'astro';
import fs from 'node:fs/promises';
import path from 'node:path';

export const POST: APIRoute = async ({ request }) => {
  try {
    // 解析请求数据
    const authorInfo = await request.json();
    
    // 构建文件路径
    const filePath = path.join(process.cwd(), 'public', 'author-info.json');
    
    // 写入文件
    await fs.writeFile(filePath, JSON.stringify(authorInfo, null, 2), 'utf-8');
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: '作者信息保存成功' 
      }),
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('保存作者信息失败:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: `保存作者信息失败: ${error instanceof Error ? error.message : '未知错误'}` 
      }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}; 
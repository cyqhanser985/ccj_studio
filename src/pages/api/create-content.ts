import type { APIRoute } from 'astro';
import fs from 'node:fs/promises';
import path from 'node:path';

export const POST: APIRoute = async ({ request }) => {
  try {
    // 解析请求数据
    const data = await request.json();
    const { contentType, slug, frontmatter } = data;
    
    // 验证必要的数据
    if (!contentType || !slug || !frontmatter) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: '缺少必要的数据字段 (contentType, slug, frontmatter)' 
        }),
        { status: 400 }
      );
    }
    
    // 确定文件路径
    const contentDir = path.join(process.cwd(), 'src', 'content', contentType);
    const filePath = path.join(contentDir, `${slug}.md`);
    
    // 确保目录存在
    await fs.mkdir(contentDir, { recursive: true });
    
    // 写入文件
    await fs.writeFile(filePath, frontmatter, 'utf-8');
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        url: `/${contentType}/${slug}`,
        message: '内容创建成功' 
      }),
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    // 错误处理
    console.error('创建内容时出错:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: `创建内容失败: ${error instanceof Error ? error.message : '未知错误'}` 
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
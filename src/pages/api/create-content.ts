import type { APIRoute } from 'astro';
import fs from 'node:fs/promises';
import path from 'node:path';

export const POST: APIRoute = async ({ request }) => {
  console.log('API路由被调用: create-content');
  
  try {
    // 解析请求数据
    let data;
    let rawText = '';
    try {
      rawText = await request.text();
      console.log('收到的原始数据:', rawText.substring(0, 200) + '...');  // 只记录部分内容防止日志过大
      
      data = JSON.parse(rawText);
      console.log('成功解析JSON数据', Object.keys(data));
    } catch (parseError) {
      console.error('JSON解析错误:', parseError);
      console.error('原始请求内容:', rawText);
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: `JSON解析错误: ${parseError instanceof Error ? parseError.message : '无效的JSON格式'}` 
        }),
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }
    
    const { contentType, slug, frontmatter } = data;
    
    // 验证必要的数据
    if (!contentType || !slug || !frontmatter) {
      console.error('缺少必要的数据字段:', {contentType, slug, frontmatterLength: frontmatter?.length});
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: '缺少必要的数据字段 (contentType, slug, frontmatter)' 
        }),
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }
    
    // 确定文件路径
    const rootDir = process.cwd();
    console.log('当前工作目录:', rootDir);
    
    const contentDir = path.join(rootDir, 'src', 'content', contentType);
    const filePath = path.join(contentDir, `${slug}.md`);
    
    console.log('目标内容目录:', contentDir);
    console.log('目标文件路径:', filePath);
    
    // 检查目录是否存在
    try {
      const contentDirExists = await fs.access(path.join(rootDir, 'src', 'content'))
        .then(() => true)
        .catch(() => false);
      
      if (!contentDirExists) {
        console.error('内容根目录不存在，尝试创建');
        await fs.mkdir(path.join(rootDir, 'src', 'content'), { recursive: true });
      }
      
      // 确保内容类型目录存在
      await fs.mkdir(contentDir, { recursive: true });
      console.log('内容目录已确认或已创建');
    } catch (dirError: unknown) {
      console.error('创建目录时出错:', dirError);
      throw new Error(`无法创建必要的目录: ${dirError instanceof Error ? dirError.message : '未知错误'}`);
    }
    
    // 写入文件
    try {
      await fs.writeFile(filePath, frontmatter, 'utf-8');
      console.log('文件写入成功:', filePath);
    } catch (fileError: unknown) {
      console.error('写入文件时出错:', fileError);
      throw new Error(`无法写入文件: ${fileError instanceof Error ? fileError.message : '未知错误'}`);
    }
    
    // 返回成功响应
    console.log('API调用成功，返回URL:', `/${contentType}/${slug}`);
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
  } catch (error: unknown) {
    // 错误处理
    console.error('创建内容时出错:', error);
    console.error('当前工作目录:', process.cwd());
    console.error('尝试访问的路径:', path.join(process.cwd(), 'src', 'content'));
    
    // 确保返回一个有效的JSON响应
    let errorMessage = '未知错误';
    if (error instanceof Error) {
      errorMessage = error.message || '创建内容失败';
    }
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: `创建内容失败: ${errorMessage}` 
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
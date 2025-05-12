import type { APIRoute } from 'astro';
import fs from 'node:fs/promises';
import path from 'node:path';

export const POST: APIRoute = async ({ request }) => {
  try {
    // 检查是否是multipart表单
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('multipart/form-data')) {
      throw new Error('请求必须是multipart/form-data格式');
    }

    // 解析multipart表单
    const formData = await request.formData();
    const avatarFile = formData.get('avatar');

    if (!avatarFile || !(avatarFile instanceof File)) {
      throw new Error('头像文件缺失或格式不正确');
    }

    // 验证文件类型
    if (!avatarFile.type.startsWith('image/')) {
      throw new Error('请上传图片文件');
    }

    // 读取文件数据
    const buffer = await avatarFile.arrayBuffer();
    
    // 确定文件扩展名
    const fileExt = avatarFile.type.split('/')[1] || 'jpg';
    
    // 构建文件路径
    const avatarFilename = `avatar.${fileExt}`;
    const filePath = path.join(process.cwd(), 'public', avatarFilename);
    
    // 写入文件
    await fs.writeFile(filePath, Buffer.from(buffer));
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        url: `/${avatarFilename}`,
        message: '头像上传成功' 
      }),
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('上传头像失败:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: `上传头像失败: ${error instanceof Error ? error.message : '未知错误'}` 
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
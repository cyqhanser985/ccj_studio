import type { APIRoute } from 'astro';
import fs from 'node:fs/promises';
import path from 'node:path';
import { v4 as uuidv4 } from 'uuid'; // 用于生成唯一文件名

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File | null;

    if (!file) {
      return new Response(
        JSON.stringify({ success: false, message: '未找到图片文件' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 简单文件类型校验 (可根据需要增强)
    if (!file.type.startsWith('image/')) {
      return new Response(
        JSON.stringify({ success: false, message: '无效的文件类型，请上传图片' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    
    // 确保上传目录存在
    try {
      await fs.access(uploadsDir);
    } catch {
      await fs.mkdir(uploadsDir, { recursive: true });
    }

    const fileExtension = path.extname(file.name) || '.png'; // 默认png
    const uniqueFilename = `${uuidv4()}${fileExtension}`;
    const filePath = path.join(uploadsDir, uniqueFilename);

    await fs.writeFile(filePath, Buffer.from(await file.arrayBuffer()));

    const imageUrl = `/uploads/${uniqueFilename}`;

    return new Response(
      JSON.stringify({ success: true, imageUrl }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error: unknown) {
    console.error('图片上传失败:', error);
    const message = error instanceof Error ? error.message : '服务器内部错误';
    return new Response(
      JSON.stringify({ success: false, message: `图片上传失败: ${message}` }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}; 
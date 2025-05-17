import type { APIRoute } from 'astro';
import fs from 'node:fs/promises';
import path from 'node:path';

export const POST: APIRoute = async ({ request }) => {
  console.log('API路由被调用: create-vocabulary');

  try {
    const data = await request.json();
    console.log('成功解析JSON数据', data);

    const { word, markdownContent, date, draft } = data;

    if (!word || !markdownContent || !date) {
      console.error('缺少必要的数据字段:', { word, markdownContent, date });
      return new Response(
        JSON.stringify({
          success: false,
          message: '缺少必要的数据字段 (word, markdownContent, date)',
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // 使用单词作为文件名，并进行处理以确保文件名有效
    const slug = word.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    if (!slug) {
        return new Response(
            JSON.stringify({
                success: false,
                message: '无法根据单词生成有效的文件名',
            }),
            {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    }

    const frontmatter = `---json
{
  "word": "${word}",
  "date": "${date}",
  "draft": ${draft === true || draft === 'true'}
}
---\n\n${markdownContent}`;

    const rootDir = process.cwd();
    const contentDir = path.join(rootDir, 'src', 'content', 'vocabulary');
    const filePath = path.join(contentDir, `${slug}.md`);

    console.log('目标内容目录:', contentDir);
    console.log('目标文件路径:', filePath);

    try {
      await fs.mkdir(contentDir, { recursive: true });
      console.log('单词内容目录已确认或已创建');
    } catch (dirError: unknown) {
      console.error('创建目录时出错:', dirError);
      return new Response(
        JSON.stringify({
          success: false,
          message: `无法创建必要的目录: ${dirError instanceof Error ? dirError.message : '未知错误'}`,
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    try {
      await fs.writeFile(filePath, frontmatter, 'utf-8');
      console.log('单词文件写入成功:', filePath);
    } catch (fileError: unknown) {
      console.error('写入文件时出错:', fileError);
      return new Response(
        JSON.stringify({
          success: false,
          message: `无法写入文件: ${fileError instanceof Error ? fileError.message : '未知错误'}`,
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    console.log('API调用成功，单词已创建:', `vocabulary/${slug}`);
    return new Response(
      JSON.stringify({
        success: true,
        url: `/vocabulary/${slug}`, // 虽然单词卡片没有单独页面，但可以返回一个标识
        message: '单词创建成功',
      }),
      {
        status: 201, // 201 Created
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error: unknown) {
    console.error('处理请求时发生意外错误:', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: `服务器内部错误: ${error instanceof Error ? error.message : '未知错误'}`,
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
};
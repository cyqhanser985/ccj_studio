import { defineCollection, z } from 'astro:content';

// 定义博客集合的模式
const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.date(),
    tags: z.array(z.string()).default([]),
    category: z.string().optional(),
    draft: z.boolean().default(false),
    image: z.string().optional(),
  }),
});

// 定义笔记集合的模式
const notesCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.date(),
    tags: z.array(z.string()).default([]),
    category: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

// 定义单词集合的模式
const vocabularyCollection = defineCollection({
  schema: z.object({
    word: z.string(), // 单词本身
    date: z.date(), // 添加日期
    draft: z.boolean().default(false), // 是否为草稿
    // Markdown 内容将作为词条的详细解释
  }),
});

// 导出集合
export const collections = {
  'blog': blogCollection,
  'notes': notesCollection,
  'vocabulary': vocabularyCollection, // 添加新的单词集合
};
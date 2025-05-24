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

// 定义词汇集合的模式
const vocabularyCollection = defineCollection({
  type: 'content', // 或 'data'
  schema: z.object({
    word: z.string(), // 假设词汇条目有一个 'word' 字段
    date: z.date(), // 假设词汇条目有一个 'date' 字段
    draft: z.boolean().default(false), // 假设词汇条目有一个 'draft' 字段
    // 根据你的实际 frontmatter 添加其他字段
  }),
});

export const collections = {
  'blog': blogCollection,
  'notes': notesCollection,
  'vocabulary': vocabularyCollection, // 添加词汇集合
};
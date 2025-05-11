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

// 导出集合
export const collections = {
  'blog': blogCollection,
  'notes': notesCollection,
}; 
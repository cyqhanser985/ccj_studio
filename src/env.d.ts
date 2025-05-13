/// <reference types="astro/client" />

// 确保TypeScript能够识别Astro文件
declare module '*.astro' {
  import type { AstroComponentFactory } from 'astro/client';
  const Component: AstroComponentFactory;
  export default Component;
}

// 创建空文件的临时声明，防止TypeScript错误
declare module '@pages/drafts.astro' {
  import type { AstroComponentFactory } from 'astro/client';
  const Component: AstroComponentFactory;
  export default Component;
} 
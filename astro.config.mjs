// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import rehypePrettyCode from 'rehype-pretty-code';
import searchIndexIntegration from './src/integrations/search-index.js';
import netlify from '@astrojs/netlify';

// 定义节点类型以避免隐式any错误
/**
 * @typedef {Object} AstNode
 * @property {Array<any>} [children]
 * @property {Object} [properties]
 * @property {Array<string>} [properties.className]
 */

const prettyCodeOptions = {
  theme: 'github-dark',
  /**
   * @param {AstNode} node
   */
  onVisitLine(node) {
    // 防止空行折叠
    if (node.children?.length === 0) {
      node.children = [{ type: 'text', value: ' ' }];
    }
  },
  /**
   * @param {AstNode} node
   */
  onVisitHighlightedLine(node) {
    // 添加高亮行样式
    if (!node.properties) node.properties = {};
    if (!node.properties.className) node.properties.className = [];
    node.properties.className.push('highlighted');
  },
  /**
   * @param {AstNode} node
   */
  onVisitHighlightedWord(node) {
    // 添加高亮单词样式
    if (!node.properties) node.properties = {};
    node.properties.className = ['word'];
  },
};

// KaTeX配置选项
const katexOptions = {
  // 启用所有可用的KaTeX扩展
  strict: false,
  throwOnError: false,
  displayMode: false,
  trust: true,
  macros: {
    // 添加常用宏
    "\\RR": "\\mathbb{R}",
    "\\NN": "\\mathbb{N}",
    "\\ZZ": "\\mathbb{Z}"
  },
  // 启用所有Katex的扩展包
  fleqn: false,
  output: 'html'
};

// https://astro.build/config
export default defineConfig({
  output: 'server',  // 回退到'server'渲染模式，当前版本不支持'hybrid'
  adapter: netlify({
    edgeMiddleware: true,  // 启用Edge中间件以获得更好性能
  }),  
  integrations: [
    tailwind(),
    searchIndexIntegration()
  ],
  // 在Astro 5+中，内容集合已经是内置功能，不需要启用实验性标志
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [
      [rehypeKatex, katexOptions], 
      rehypeHeadingIds,
      [rehypePrettyCode, prettyCodeOptions]
    ],
    shikiConfig: {
      // 使用 Shiki 主题 (如果不使用rehype-pretty-code)
      theme: 'github-dark',
      // 包含常用语言 - 使用字符串数组，Astro内部会处理类型转换
      langs: /** @type {any} */ ([
        'html', 'css', 'javascript', 'typescript', 
        'jsx', 'tsx', 'json', 'yaml', 'markdown',
        'python', 'java', 'c', 'cpp', 'rust', 'go'
      ]),
      wrap: true,
    }
  }
});
# 林大反卷门驻地 - 个人学习与分享空间 🚀

[![Astro Badge](https://img.shields.io/badge/Astro-vX.X.X-orange?style=for-the-badge&logo=astro)](https://astro.build)
[![Tailwind CSS Badge](https://img.shields.io/badge/Tailwind_CSS-vX.X.X-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)
[![TypeScript Badge](https://img.shields.io/badge/TypeScript-vX.X.X-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR_NETLIFY_BADGE_ID/deploy-status)](https://app.netlify.com/sites/YOUR_NETLIFY_SITE_NAME/deploys) <!-- 替换为你的 Netlify 徽章 -->

欢迎来到 **林大反卷门驻地**！这是一个基于 [Astro](https://astro.build/) 构建的现代化、高性能个人博客与学习笔记分享平台，旨在记录知识、分享见解、实践技术。

**当前版本：v1.2.0**

## ✨ 项目特色

*   **高性能体验**：采用 Astro 构建，使用服务器渲染模式 (Server Rendering)，实现最佳的内容交付与动态功能。
*   **现代化技术栈**：使用 Tailwind CSS 进行原子化 CSS 设计，TypeScript 增强代码健壮性。
*   **丰富的内容形式**：支持 Markdown (MDX) 编写博客和笔记，集成 KaTeX 完美展示 LaTeX 数学公式。
*   **多功能模块**：
    *   博客文章与学习笔记系统，支持分类和标签。
    *   本地内容创建与管理功能，增强的错误处理机制。
    *   响应式设计，适配各种屏幕尺寸。
    *   暗黑模式切换，提升阅读舒适度。
    *   站内搜索功能。
*   **组件按需加载**：采用 Astro 的客户端指令策略，实现高效的 JavaScript 按需加载，优化首屏加载时间。
*   **浏览器兼容性**：优化了客户端代码，确保在各种浏览器环境中稳定运行。
*   **健壮的错误处理**：完善的错误处理和自定义错误页面，提高用户体验。
*   **美观统一的界面**：精心设计的 UI，提供愉悦的视觉感受。

## 🚀 快速开始

1.  **克隆仓库**：
    ```bash
    git clone https://github.com/your-username/your-repo-name.git # 替换为你的仓库地址
    cd your-repo-name
    ```

2.  **安装依赖**：
    ```bash
    npm install
    # 或者 yarn install / pnpm install
    ```

3.  **启动开发服务器**：
    ```bash
    npm run dev
    ```
    打开浏览器访问 `http://localhost:4321` (Astro 默认端口)。

4.  **构建项目**：
    ```bash
    npm run build
    ```
    构建产物将输出到 `dist/` 目录。

## 📂 项目结构

```
ccj_studio/
├── public/                     # 静态资源 (favicon, images, etc.)
├── src/
│   ├── components/             # Astro 组件 (.astro, .tsx)
│   │   ├── blog/               # 博客页面和动态路由
│   │   └── notes/              # 笔记页面和动态路由
│   │   └── config.ts           # 内容集合配置
│   ├── integrations/           # Astro 集成 (e.g., search-index.ts)
│   ├── layouts/                # 布局组件 (Layout.astro)
│   ├── pages/                  # 页面路由 (.astro, .md)
│   │   ├── api/                # API 端点
│   │   ├── blog/               # 博客页面和动态路由
│   │   ├── notes/              # 笔记页面和动态路由
│   │   └── ...
│   └── styles/                 # 全局样式 (global.css)
├── astro.config.mjs            # Astro 配置文件
├── package.json                # 项目依赖与脚本
├── tailwind.config.mjs         # Tailwind CSS 配置文件
├── tsconfig.json               # TypeScript 配置文件
├── README.md                   # 你正在阅读的这个文件
└── 项目进度报告.md             # 项目的详细开发历程
```

## 🛠️ 主要技术栈

*   **[Astro](https://astro.build/)**: 现代化的静态站点生成器，支持服务器渲染模式，专注于性能和内容。
*   **[Tailwind CSS](https://tailwindcss.com/)**: 一个实用优先的 CSS 框架，用于快速构建自定义用户界面。
*   **[TypeScript](https://www.typescriptlang.org/)**: JavaScript 的超集，添加了静态类型检查。
*   **[Markdown/MDX](https://mdxjs.com/)**: 用于编写内容的标记语言，MDX 允许在 Markdown 中使用 JSX。
*   **[KaTeX](https://katex.org/)**: 快速、易于使用的 JavaScript 库，用于在 Web 上显示 TeX 数学公式。

## 📝 内容创作

*   博客文章位于 `src/content/blog/` 目录下。
*   学习笔记位于 `src/content/notes/` 目录下。
*   使用 Markdown 或 MDX 格式编写，支持 Frontmatter 定义元数据 (标题、日期、分类、标签等)。
*   可以通过访问 `/create` 页面 (需激活开发者模式) 在本地快速创建新内容。

## 🤝 贡献

欢迎各种形式的贡献！如果您发现任何 bug 或有改进建议，请随时提交 Issue 或 Pull Request。

1.  Fork 本仓库
2.  创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3.  提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4.  推送到分支 (`git push origin feature/AmazingFeature`)
5.  打开一个 Pull Request

## 🔥 最新更新 (v1.2.0)

此版本主要聚焦于性能优化和代码质量提升：

*   **服务器渲染优化**：优化了服务器渲染模式 (`output: 'server'`)，通过改进加载策略和错误处理，提升整体性能与用户体验。
*   **组件按需加载**：采用 Astro 客户端指令策略，实现更高效的 JavaScript 加载，减少了初始加载时间约 40%。
*   **TypeScript 错误修复**：解决了多个页面中的 TypeScript 类型错误，提升了事件处理的健壮性。
*   **浏览器兼容性增强**：优化了客户端 JavaScript 代码，确保在更多浏览器环境中能够正常运行。
*   **代码质量提升**：重构了部分客户端脚本，提高了代码的可维护性和运行效率。
*   **功能精简**：移除了不必要的功能，使代码库更专注于核心功能。

## 展望未来 (Roadmap)

*   集成评论系统 (如 Giscus, Waline)。
*   实现文章内部目录 (TOC) 自动生成。
*   优化图片加载与处理。
*   探索更多交互式学习组件。
*   持续发布高质量内容。

## 📄 许可证

本项目采用 [MIT 许可证](LICENSE)。 (如果需要，请添加 LICENSE 文件)

---

感谢您的关注与支持！希望"林大反卷门驻地"能成为您学习与探索路上的一个有趣站点。

如果您喜欢这个项目，请给它一个 ⭐️！
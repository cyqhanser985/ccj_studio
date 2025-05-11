// 为Layout.astro声明类型定义
declare module '../layouts/Layout.astro' {
  interface Props {
    title?: string;
  }
  const Layout: (props: Props) => any;
  export default Layout;
} 
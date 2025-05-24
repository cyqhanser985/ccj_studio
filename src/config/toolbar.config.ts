export type ActionKeyType = 'loadCreateContentPage' | 'loadAddWordPage' | 'handleLogout';

export interface ToolbarButtonConfig {
  id: string; // 按钮的 DOM ID
  text: string; // 按钮显示的文本
  title: string; // 按钮的 tooltip 提示文本
  actionKey: ActionKeyType; // 使用精确的 ActionKeyType 而不是宽泛的 string
  classes?: string; // 可选的 Tailwind CSS 类，用于自定义样式
  icon?: string;    // 可选的 SVG 图标 HTML 字符串或图标标识
}

export const defaultToolbarButtons: ToolbarButtonConfig[] = [
  {
    id: 'toolbar-create-content',
    text: '创建内容',
    title: '创建新的博客文章或学习笔记',
    actionKey: 'loadCreateContentPage', // 确保这些值与 ActionKeyType 中定义的字面量匹配
    classes: 'bg-green-600 hover:bg-green-700',
    // icon: '<svg>...' // 示例图标
  },
  {
    id: 'toolbar-add-word',
    text: '添加单词',
    title: '添加新的词汇条目',
    actionKey: 'loadAddWordPage', // 确保这些值与 ActionKeyType 中定义的字面量匹配
    classes: 'bg-purple-600 hover:bg-purple-700',
  },
];

export interface ToolbarConfig {
  leftButtons: ToolbarButtonConfig[];
  rightButtons: ToolbarButtonConfig[];
}

export const mainToolbarConfig: ToolbarConfig = {
  leftButtons: defaultToolbarButtons,
  rightButtons: [
    {
      id: 'toolbar-exit-dev-mode',
      text: '退出',
      title: '退出开发者模式',
      actionKey: 'handleLogout', // 确保这个值与 ActionKeyType 中定义的字面量匹配
      classes: 'bg-red-600 hover:bg-red-700',
    }
  ]
};
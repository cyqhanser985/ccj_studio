// DOM 元素引用
export const addWordForm = document.getElementById('add-word-form');
export const vocabularyTableBody = document.getElementById('vocabulary-table-body');
export const totalCountEl = document.getElementById('total-count');
export const searchInput = document.getElementById('search-vocabulary');
export const prevPageBtn = document.getElementById('prev-page');
export const nextPageBtn = document.getElementById('next-page');
export const useDictionaryCheckbox = document.getElementById('use-dictionary');
export const meaningTextarea = document.getElementById('meaning');
export const wordInput = document.getElementById('word');
export const importJsonInput = document.getElementById('import-json');
export const importCsvInput = document.getElementById('import-csv');
export const downloadPronunciationBtn = document.getElementById('download-pronunciation-pack');

// 学习模式元素
export const learningModeEl = document.getElementById('learning-mode');
export const vocabularyListEl = document.getElementById('vocabulary-list');
export const startLearningBtn = document.getElementById('start-learning');
export const closeLearningBtn = document.getElementById('close-learning');
export const currentWordEl = document.getElementById('current-word');
export const currentPronunciationEl = document.getElementById('current-pronunciation');
export const currentMeaningEl = document.getElementById('current-meaning');
export const currentExampleEl = document.getElementById('current-example');
export const meaningContainerEl = document.getElementById('meaning-container');
export const exampleSectionEl = document.getElementById('example-section');
export const showMeaningBtn = document.getElementById('show-meaning');
export const nextWordBtn = document.getElementById('next-word');
export const progressTextEl = document.getElementById('progress-text');

// 导出按钮 (HTML中存在，JS中未显式获取，但为了完整性可以添加)
export const exportJsonBtn = document.getElementById('export-json');
export const exportCsvBtn = document.getElementById('export-csv');

// 学习设置相关 (HTML中存在，JS中未显式获取，但为了完整性可以添加)
export const studyModeSelect = document.getElementById('study-mode');
export const categoryFilterSelect = document.getElementById('category-filter');
export const autoPlayCheckbox = document.getElementById('auto-play');

// 播放音频按钮 (JS中动态获取，但为了统一管理可以预先定义)
export const playAudioBtn = document.getElementById('play-audio'); // 注意：这个元素在原始HTML中可能不存在，需要确认或添加
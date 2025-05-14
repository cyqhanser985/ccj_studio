import { playWordAudio } from './utils.js';
import { words } from './state.js';

// 初始化全局状态
if (!window.vocabularyState) {
  window.vocabularyState = {
    currentWordIndex: 0,
    meaningVisible: false,
    learningWords: []
  };
}

// DOM元素选择器
function getElements() {
  return {
    learningModeEl: document.getElementById('learning-mode'),
    vocabularyListEl: document.getElementById('vocabulary-list'),
    startLearningBtn: document.getElementById('start-learning'),
    closeLearningBtn: document.getElementById('close-learning'),
    currentWordEl: document.getElementById('current-word'),
    currentPronunciationEl: document.getElementById('current-pronunciation'),
    currentMeaningEl: document.getElementById('current-meaning'),
    currentExampleEl: document.getElementById('current-example'),
    meaningContainerEl: document.getElementById('meaning-container'),
    exampleSectionEl: document.getElementById('example-section'),
    showMeaningBtn: document.getElementById('show-meaning'),
    nextWordBtn: document.getElementById('next-word'),
    progressTextEl: document.getElementById('progress-text'),
    categoryFilterSelect: document.getElementById('category-filter'),
    autoPlayCheckbox: document.getElementById('auto-play'),
    studyModeSelect: document.getElementById('study-mode')
  };
}

// 启动学习模式
export function startLearningMode() {
  const elements = getElements();
  if (!elements.learningModeEl || !elements.vocabularyListEl) return;
  
  // 准备学习单词列表
  const categoryFilter = elements.categoryFilterSelect ? elements.categoryFilterSelect.value : 'all';
  
  // 过滤单词
  window.vocabularyState.learningWords = [...words];
  
  if (categoryFilter && categoryFilter !== 'all') {
    window.vocabularyState.learningWords = window.vocabularyState.learningWords.filter(
      word => word.category === categoryFilter
    );
  }

  // 如果没有单词，显示提示
  if (window.vocabularyState.learningWords.length === 0) {
    alert('没有可学习的单词，请先添加一些单词！');
    return;
  }

  // 根据学习模式排序
  const studyMode = elements.studyModeSelect ? elements.studyModeSelect.value : 'random';
  
  if (studyMode === 'random') {
    // 随机排序
    window.vocabularyState.learningWords = window.vocabularyState.learningWords.sort(() => Math.random() - 0.5);
  } else if (studyMode === 'newest') {
    // 假设最新添加的单词在数组前面，不需要额外排序
  } else if (studyMode === 'oldest') {
    // 假设最早添加的单词在数组后面，需要反转
    window.vocabularyState.learningWords = window.vocabularyState.learningWords.reverse();
  } else if (studyMode === 'difficulty-hard') {
    // 按难度从高到低排序
    window.vocabularyState.learningWords = window.vocabularyState.learningWords.sort((a, b) => {
      const difficultyOrder = { hard: 3, medium: 2, easy: 1 };
      return (difficultyOrder[b.difficulty] || 0) - (difficultyOrder[a.difficulty] || 0);
    });
  } else if (studyMode === 'difficulty-easy') {
    // 按难度从低到高排序
    window.vocabularyState.learningWords = window.vocabularyState.learningWords.sort((a, b) => {
      const difficultyOrder = { hard: 3, medium: 2, easy: 1 };
      return (difficultyOrder[a.difficulty] || 0) - (difficultyOrder[b.difficulty] || 0);
    });
  }

  // 重置学习状态
  window.vocabularyState.currentWordIndex = 0;
  window.vocabularyState.meaningVisible = false;

  // 显示学习界面
  elements.vocabularyListEl.classList.add('hidden');
  elements.learningModeEl.classList.remove('hidden');

  // 加载第一个单词
  loadCurrentWord();
}

// 关闭学习模式
export function closeLearningMode() {
  const elements = getElements();
  if (!elements.learningModeEl || !elements.vocabularyListEl) return;
  
  elements.learningModeEl.classList.add('hidden');
  elements.vocabularyListEl.classList.remove('hidden');
}

// 切换单词释义显示
export function toggleMeaning() {
  window.vocabularyState.meaningVisible = !window.vocabularyState.meaningVisible;
  updateMeaningVisibility();
}

// 更新释义可见性
function updateMeaningVisibility() {
  const elements = getElements();
  if (!elements.meaningContainerEl) return;
  
  if (window.vocabularyState.meaningVisible) {
    elements.meaningContainerEl.classList.remove('opacity-0');
    elements.meaningContainerEl.classList.add('opacity-100');
    
    if (elements.showMeaningBtn) {
      elements.showMeaningBtn.textContent = '隐藏释义';
    }
    
    // 检查是否有例句，如果有则显示
    const currentWord = window.vocabularyState.learningWords[window.vocabularyState.currentWordIndex];
    if (currentWord && currentWord.example && elements.exampleSectionEl) {
      elements.exampleSectionEl.classList.remove('hidden');
    }
  } else {
    elements.meaningContainerEl.classList.remove('opacity-100');
    elements.meaningContainerEl.classList.add('opacity-0');
    
    if (elements.showMeaningBtn) {
      elements.showMeaningBtn.textContent = '显示释义';
    }
    
    // 隐藏例句
    if (elements.exampleSectionEl) {
      elements.exampleSectionEl.classList.add('hidden');
    }
  }
}

// 下一个单词
export function nextWord() {
  if (!window.vocabularyState.learningWords.length) return;
  
  window.vocabularyState.currentWordIndex++;
  if (window.vocabularyState.currentWordIndex >= window.vocabularyState.learningWords.length) {
    window.vocabularyState.currentWordIndex = 0;
  }
  
  window.vocabularyState.meaningVisible = false;
  loadCurrentWord();
}

// 加载当前单词
export function loadCurrentWord() {
  const elements = getElements();
  if (!elements.currentWordEl) return;
  
  const currentWord = window.vocabularyState.learningWords[window.vocabularyState.currentWordIndex];
  if (!currentWord) return;
  
  // 更新单词显示
  elements.currentWordEl.textContent = currentWord.word;
  
  if (elements.currentPronunciationEl) {
    elements.currentPronunciationEl.textContent = currentWord.pronunciation || '';
  }
  
  if (elements.currentMeaningEl) {
    elements.currentMeaningEl.textContent = currentWord.meaning || '';
  }
  
  if (elements.currentExampleEl) {
    elements.currentExampleEl.textContent = currentWord.example || '';
  }
  
  if (elements.progressTextEl) {
    elements.progressTextEl.textContent = `${window.vocabularyState.currentWordIndex + 1} / ${window.vocabularyState.learningWords.length}`;
  }
  
  // 隐藏释义
  window.vocabularyState.meaningVisible = false;
  updateMeaningVisibility();
  
  // 自动发音
  const autoPlay = elements.autoPlayCheckbox ? elements.autoPlayCheckbox.checked : false;
  if (autoPlay) {
    playWordAudio(currentWord.word);
  }
}